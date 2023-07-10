import BlockLayout from '@/components/blockLayout'
import { Markdown } from '../types'

export default function getMarkdown(data: Object) {
    let content = data as Markdown

    return (
        <BlockLayout>
            <div
                dangerouslySetInnerHTML={{ __html: content.Text }}
            />
        </BlockLayout>
    )
}
