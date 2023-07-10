import { getAllPostData, getPostDirectories } from "@/lib/posts"
import { Content, FullPostData, PostData } from "@/lib/types";
import Link from 'next/link'
import utilStyles from '@/styles/utils.module.css'
import Layout from "@/components/layout";
import Head from "next/head";
import Date from "@/components/date";

export default function Page({ content }: { content: FullPostData[] }) {
    return (
        <Layout home>
            <Head>
                <title>CoRise Learning Articles</title>
            </Head>
            <section className={utilStyles.headingMd}>
                Welcome to CoRise Learning! Here are a list of sample articles to get you started.
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Posts</h2>
                <ul className={utilStyles.list}>
                {content.map(c => (
                    <li className={utilStyles.listItem} key={c.content.title}>
                        <Link href={`/posts/${c.id}`}>{c.content.title}</Link>
                        <br />
                        <small className={utilStyles.lightText}>
                            <Date dateString={c.content.date} />
                        </small>
                    </li>
                ))}
                </ul>
            </section>
        </Layout>
        
    )
}

export async function getStaticProps() {
    const content = await getAllPostData();
    return {
        props: {
            content: content
        }
    }
}


