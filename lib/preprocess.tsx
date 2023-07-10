
import { PostData, PostType } from './types';
import { remark } from 'remark';
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'

/**
 * Function to shuffle an array, used for MCQ choices.
 * @param array an array of any type
 * @returns a shuffled copy of the same array
 */
function shuffle(array: any[]) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

/**
 * Preprocesses the block data to make it ready for rendering. Currently supports all block types.
 * @param data the block data
 * @returns the preprocessed block data
*/
export async function preprocessBlock(data: PostData) {
    switch (data.Type) {
        case PostType.MCQ:
            if ('IncorrectOptions' in data.Object){
                data.Object.IncorrectOptions = shuffle([...data.Object.IncorrectOptions, data.Object.CorrectOption] );
            }
            break;
        case PostType.Markdown:
            if ('Text' in data.Object){
                const processedContent = await remark()
                .use(remarkMath)
                .use(remarkRehype)
                .use(rehypeKatex)
                .use(rehypeStringify)
                .process(data.Object.Text)
                data.Object.Text = processedContent.toString();
            }
            break;
        default:
            break;
    }
    return data;
}
