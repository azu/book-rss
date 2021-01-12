/**
 * IT IS DEFINITION FOR RSS FEED
 * If you want to get more feed, please add it
 **/
import { BookRSSItem } from "./index";

const BASE_URL = "https://azu.github.io/book-rss";
export const BOOK_FEEDS: BookRSSItem[] = [
    {
        query: "JavaScript",
        lang: "en",
        link: `${BASE_URL}/JavaScript-en.json`,
        filter: (item) => {
            // Ignore searchInfo.textSnippet matching
            const hasJavaScript =
                item.volumeInfo.title?.toLocaleLowerCase().includes("javascript") ||
                item.volumeInfo.description?.toLocaleLowerCase().includes("javascript");
            return Boolean(hasJavaScript);
        }
    },
    {
        query: "JavaScript",
        lang: "ja",
        link: `${BASE_URL}/JavaScript-ja.json`,
        filter: (item) => {
            // Ignore searchInfo.textSnippet matching
            const hasJavaScript =
                item.volumeInfo.title?.toLocaleLowerCase().includes("javascript") ||
                item.volumeInfo.description?.toLocaleLowerCase().includes("javascript");
            return Boolean(hasJavaScript);
        }
    },
    {
        query: "TypeScript",
        lang: "en",
        link: `${BASE_URL}/TypeScript-en.json`
    },
    {
        query: "TypeScript",
        lang: "ja",
        link: `${BASE_URL}/TypeScript-ja.json`
    }
];
