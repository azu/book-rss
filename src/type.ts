export interface SearchKeywordResponse {
    kind: string;
    totalItems: number;
    items: Item[];
}

export interface Item {
    kind: Kind;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
    searchInfo: SearchInfo;
}

export interface AccessInfo {
    country: Country;
    viewability: Viewability;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: TextToSpeechPermission;
    epub: Epub;
    pdf: Epub;
    webReaderLink: string;
    accessViewStatus: AccessViewStatus;
    quoteSharingAllowed: boolean;
}

export enum AccessViewStatus {
    FullPublicDomain = "FULL_PUBLIC_DOMAIN",
    Sample = "SAMPLE"
}

export enum Country {
    Jp = "JP"
}

export interface Epub {
    isAvailable: boolean;
    acsTokenLink?: string;
    downloadLink?: string;
}

export enum TextToSpeechPermission {
    Allowed = "ALLOWED",
    AllowedForAccessibility = "ALLOWED_FOR_ACCESSIBILITY"
}

export enum Viewability {
    AllPages = "ALL_PAGES",
    Partial = "PARTIAL"
}

export enum Kind {
    BooksVolume = "books#volume"
}

export interface SaleInfo {
    country: Country;
    saleability: Saleability;
    isEbook: boolean;
    buyLink?: string;
    listPrice?: SaleInfoListPrice;
    retailPrice?: SaleInfoListPrice;
    offers?: Offer[];
}

export interface SaleInfoListPrice {
    amount: number;
    currencyCode: string;
}

export interface Offer {
    finskyOfferType: number;
    listPrice: OfferListPrice;
    retailPrice: OfferListPrice;
}

export interface OfferListPrice {
    amountInMicros: number;
    currencyCode: string;
}

export enum Saleability {
    ForSale = "FOR_SALE",
    Free = "FREE",
    NotForSale = "NOT_FOR_SALE"
}

export interface SearchInfo {
    textSnippet?: string;
}

export interface VolumeInfo {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description?: string;
    industryIdentifiers: IndustryIdentifier[];
    readingModes: ReadingModes;
    pageCount?: number;
    printType: PrintType;
    categories?: string[];
    maturityRating: MaturityRating;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary?: PanelizationSummary;
    imageLinks: ImageLinks;
    language: Language;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
    averageRating?: number;
    ratingsCount?: number;
    subtitle?: string;
}

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail: string;
}

export interface IndustryIdentifier {
    type: Type;
    identifier: string;
}

export enum Type {
    Isbn10 = "ISBN_10",
    Isbn13 = "ISBN_13",
    Other = "OTHER"
}

export enum Language {
    En = "en"
}

export enum MaturityRating {
    NotMature = "NOT_MATURE"
}

export interface PanelizationSummary {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
}

export enum PrintType {
    Book = "BOOK"
}

export interface ReadingModes {
    text: boolean;
    image: boolean;
}
