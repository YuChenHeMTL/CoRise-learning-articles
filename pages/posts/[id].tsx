import { parsePostData } from "@/lib/parser";
import { getPostDataById, getPostDirectories } from "@/lib/posts"
import { Content, PostData } from "@/lib/types";
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import utilStyles from '@/styles/utils.module.css'
import Layout from "@/components/layout";

import 'katex/dist/katex.min.css'

export default function Post({ postContent }: InferGetStaticPropsType<typeof getStaticProps> & { postContent: Content }) {
    return (
        <Layout>
            <article>
                <h1 className={utilStyles.headingXl}>{postContent.title}</h1>
                <div className={utilStyles.lightText}>
                    {postContent.date}
                </div>
                {parsePostData(postContent.contentHtml as PostData[])}
            </article>
        </Layout>
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
    postContent: Content
  }> = async (params: any) => {
    const postData = await getPostDataById(params["params"]["id"])
    return {
        props: {
            postContent: postData
        }
    }
}