import fs from 'fs'
import path from 'path'
import { MCQ, getMultipleChoice } from './types/mcq'
import { Content, PostData, PostType } from './types';
import { remark } from 'remark';
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getPostDirectories() {
    return fs.readdirSync(postsDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .map(name => {
        return {
            params: {
                id: name
            }
        }});
}

export function getFullPostData() {
    const directories = fs.readdirSync(postsDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    const settings = directories.map(directory => {
        const filePath = path.join(postsDirectory, directory, "settings.json")
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const settings = JSON.parse(fileContents)
        return {
            "id": directory,
            "contentHtml": settings
        }
    })
    return settings
}

export async function getPostDataJson(id: string) {
    // const filePath = path.join(postsDirectory, id, "settings.json")
    const filePath = postsDirectory + "/" + id + "/" + "settings.json"
    const settingsContent = fs.readFileSync(filePath, 'utf8')
    const settings = JSON.parse(settingsContent)
    const blocks: string[] = settings["Blocks"]

    const blockContents: Object = await Promise.all(blocks.map( async block => {
        // const filePath = path.join(postsDirectory, id, block)
        const filePath = postsDirectory + "/" + id + "/data/" + block
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const content = JSON.parse(fileContents)
        if (content.Type == PostType.Markdown) {
            const processedContent = await remark()
            .use(html)
            .process(content.Object.Text)
            content.Object.Text = processedContent.toString()
        }
        return content
        
    }))
    // const blockContents2 = await Promise.all(blockContents)

    return {
        title: settings["Title"],
        date: settings["Date"],
        contentHtml: blockContents
    }
}

