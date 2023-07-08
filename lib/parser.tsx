import { getMultipleChoice } from "./types/mcq";
import getMarkdown from "./types/markdown";
import { PostData, PostType } from "./types";

export default function parseContent(data: PostData) {
    switch (data.Type) {
        case PostType.MCQ:
            return getMultipleChoice(data.Object)
        case PostType.Markdown:
            return getMarkdown(data.Object)
        default:
            return "test"
    }
}