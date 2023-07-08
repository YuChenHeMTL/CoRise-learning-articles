export type Content = {
    title: string
    date: string
    contentHtml: Object
}

export type PostData = {
    Type: PostType,
    Object: Object
}

export enum PostType {
    MCQ = "MCQ",
    Markdown = "Markdown"
}