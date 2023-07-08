import parseContent from "@/lib/parser";
import { getPostDataJson, getPostDirectories } from "@/lib/posts"
import { PostData } from "@/lib/types";
import { MCQ, getMultipleChoice } from "@/lib/types/mcq";
import type { InferGetStaticPropsType, GetStaticProps } from 'next'

type Param = {
    id: string;
}

export default function Post({ html }: InferGetStaticPropsType<typeof getStaticProps> & { html: Object }) {
    return (
        // <div
        //     dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        // />
        <div>{parseContent(html as PostData)}</div>
    )
}

export async function getStaticPaths() {
    const paths = getPostDirectories()
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<{
    html: Object
  }> = async (params: any) => {
    const postData = await getPostDataJson(params["params"]["id"])
    return {
        props: {
            html: postData.contentHtml[0]
        }
    }
}