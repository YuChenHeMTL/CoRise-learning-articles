import MultipleChoice from "./types/mcq";
import Markdown from "./types/markdown";
import { PostData, PostType } from "./types";
import Sandbox from "./types/sandbox";

export function parseContent(data: PostData) {
    switch (data.Type) {
        case PostType.MCQ:
            return MultipleChoice(data.Object)
        case PostType.Markdown:
            return Markdown(data.Object)
        case PostType.Sandbox:
            return Sandbox(data.Object)
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