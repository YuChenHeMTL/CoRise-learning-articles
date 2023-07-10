import { getMultipleChoice } from "./types/mcq";
import getMarkdown from "./types/markdown";
import { PostData, PostType } from "./types";
import getSandbox from "./types/sandbox";

export function parseContent(data: PostData) {
    switch (data.Type) {
        case PostType.MCQ:
            return getMultipleChoice(data.Object)
        case PostType.Markdown:
            return getMarkdown(data.Object)
        case PostType.Sandbox:
            return getSandbox(data.Object)
        default:
            return "test"
    }
}

export function parsePostData(data: PostData[]) {
    return (
        <div className="post-wrapper">
            {data.map((content, index) => (
                <div key={index}>
                    {parseContent(content)}
                </div>
            ))}
        </div>
    )
}