import { getFullPostData, getPostDirectories } from "@/lib/posts"
import Link from 'next/link'

export default function Page({ids = []}) {
    return (
        <div>
            <h1>Next.js</h1>
            {ids.map(d => (
                <li key={d}>
                    <Link href={`/posts/${d}`}>
                        {d}
                    </Link>
                </li>
            ))}

        </div>
    )
}

export async function getStaticProps() {
    const ids = getPostDirectories().map(d => d.params.id)
    return {
        props: {
            ids: ids
        }
    }
}


