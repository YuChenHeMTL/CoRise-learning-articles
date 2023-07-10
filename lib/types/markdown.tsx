import BlockLayout from '@/components/blockLayout'
import { Markdown } from '../types'

export default function Markdown(data: Object) {
    let content = data as Markdown

    // only returning a div with the markdown content
    return (
        <BlockLayout>
            <div
                dangerouslySetInnerHTML={{ __html: content.Text }}
            />
        </BlockLayout>
    )
}
