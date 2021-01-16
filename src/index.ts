import fetch from "node-fetch";
import { Item, SearchKeywordResponse } from "./type";
import { Feed } from "feed";
import dayjs from "dayjs";
import { BOOK_FEEDS } from "./rss";
import * as fs from "fs/promises";
import path from "path";

export const searchKeyword = (query: string, lang: string): Promise<SearchKeywordResponse> => {
    const API = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
    )}&langRestrict=${lang}&orderBy=newest`;
    return fetch(API).then((res) => res.json());
};

export type GenerateRSSOptions = {
    title: string;
    description: string;
    link: string;
    image?: string;
    favicon?: string;
    updated: Date;
    filter?: (item: Item) => boolean; // if return true, it is included in the result
};

export const generateRSS = (response: SearchKeywordResponse, options: GenerateRSSOptions) => {
    const feed = new Feed({
        title: options.title,
        description: options.description,
        id: options.link,
        link: options.link,
        image: options.image,
        favicon: options.favicon,
        copyright: "book-rss",
        updated: options.updated,
        generator: "book-rss"
    });
    const filter = options.filter;
    const filteredItems = filter ? response.items.filter((item) => filter(item)) : response.items;
    filteredItems.forEach((item) => {
        const textSnippet = item?.searchInfo?.textSnippet;
        feed.addItem({
            title: item.volumeInfo.title,
            description: item.volumeInfo.description,
            content: item.volumeInfo.description + (textSnippet ? `<br><blockquote>${textSnippet}</blockquote>` : ""),
            link: item.volumeInfo.previewLink,
            image: item.volumeInfo.imageLinks.thumbnail,
            date: dayjs(item.volumeInfo.publishedDate, "YYYY-MM-DD").toDate()
        });
    });
    if (path.extname(options.link) === ".json") {
        return feed.json1();
    } else {
        return feed.atom1();
    }
};

export type BookRSSItem = {
    query: string;
    lang: string;
} & Omit<GenerateRSSOptions, "updated" | "title" | "description">;
if (require.main === module) {
    const distDir = path.join(__dirname, "../dist");
    (async function () {
        await fs.mkdir(distDir, {
            recursive: true
        });
        for (const item of BOOK_FEEDS) {
            const { query, lang, ...options } = item;
            const json = await searchKeyword(query, lang);
            if (!json) {
                throw new Error("Can not search:" + query);
            }
            const rss = generateRSS(json, {
                title: `${query}(${lang}) on Google Book`,
                description: `${query}(${lang}) on Google Book`,
                ...options,
                updated: new Date()
            });
            const fileName = path.basename(item.link);
            await fs.writeFile(path.join(distDir, fileName), rss, "utf-8");
        }
        const links = BOOK_FEEDS.map((feed) => {
            return `<li>${feed.query}(${feed.lang}): <a href="${feed.link}">${feed.link}</a></li>`;
        }).join("\n");
        const index = {
            html: `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Book-RSS</title>
</head>
<body>
<p>These RSS Feed is search result of Google Books. Your RSS reader need to support JSON RSS.</p>
<ul>
${links}
</ul>
<footer>
<a href="https://github.com/azu/book-rss">Source Code</a>
</footer>
</body>
</html>
`
        };
        await fs.writeFile(path.join(distDir, "index.html"), index.html, "utf-8");
    })().catch((error) => {
        console.error(error);
        process.exit(1);
    });
}
