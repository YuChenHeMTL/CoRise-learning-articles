import fs from 'fs'
import path from 'path'
import { preprocessBlock } from './preprocess';

const postsDirectory = path.join(process.cwd(), 'posts')

export function getPostDirectoryIds() {
    return fs.readdirSync(postsDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

/**
 * Returns all post IDs
 * @returns an array of objects with the format {params: {id: string}}
 */
export function getPostDirectories() {
    return getPostDirectoryIds()
    .map(name => {
        return {
            params: {
                id: name
            }
        }});
}

/**
 * Return all actual post data
 * @returns an array of objects with the format {id: string, content: Content}
 */
export async function getAllPostData() {
    const allPostData =  await Promise.all(getPostDirectoryIds().map(async id => {
        const content =  await getPostDataById(id)
        return {
            id: id,
            content: content
        }
    }));
    return allPostData.sort((a, b) => {
        if (a.content.date < b.content.date) {
            return 1
        } else {
            return -1
        }
    })
}

/**
 * 
 * @param id the id of the post
 * @returns the corresponding post data as a Content object
 */
export async function getPostDataById(id: string) {
    const filePath = postsDirectory + "/" + id + "/" + "settings.json"
    const settingsContent = fs.readFileSync(filePath, 'utf8')
    const settings = JSON.parse(settingsContent)
    const blocks: string[] = settings["Blocks"]

    const blockContents = await getBlockContent(id, blocks)

    return {
        title: settings["Title"],
        date: settings["Date"],
        contentHtml: blockContents
    }
}

/**
 * 
 * @param id the id of the post
 * @param blockPaths paths to the blocks
 * @returns an array of PostData objects, which contains the preprocessed block data
 */
export async function getBlockContent(id: string, blockPaths: string[]) {
    return await Promise.all(blockPaths.map( async block => {
        const filePath = postsDirectory + "/" + id + "/data/" + block
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const content = JSON.parse(fileContents)
        return await preprocessBlock(content);
    }
    ));
}
