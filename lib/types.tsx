import Post from "@/pages/posts/[id]"

export type Content = {
    title: string
    date: string
    contentHtml: PostData[]
}

export type PostData = {
    Type: PostType,
    Object: MCQ | Markdown | Sandbox
}

export enum PostType {
    MCQ = "MCQ",
    Markdown = "Markdown",
    Sandbox = "Sandbox",
}

export type MCQ = {
    Question: string;
    CorrectOption: string;
    IncorrectOptions: string[];
    FeedbackOnIncorrect: string;
}


export type Markdown = {
    Text: string
}

export type Sandbox = {
    url: string;
}

export type FullPostData = {
    id: string;
    content: Content;
}
