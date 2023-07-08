import { remark } from 'remark'
import html from 'remark-html'

export type Markdown = {
    Text: string
}

export default function getMarkdown(data: Object) {
    let content = data as Markdown

    return (
        <div
            dangerouslySetInnerHTML={{ __html: content.Text }}
        />
    )
}
