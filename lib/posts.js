import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostIDs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(file_name => {
    return {
      params: {
        id: file_name.replace(/.md$/, ''),
      },
    };
  });
}

export async function getPost(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const contents = fs.readFileSync(fullPath, 'utf8');
  const meta = matter(contents);
  const processed_contents = await remark()
    .use(gfm)
    .use(html)
    .process(meta.content)
  const content_html = processed_contents.toString();
  return {
    id,
    content_html,
    ...meta.data
  };
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames.map(filename => {
    const id = filename.replace(/.md$/, '')
    const fullPath = path.join(postsDirectory, filename);
    const content = fs.readFileSync(fullPath, 'utf8');
    const meta = matter(content);
    return {
      id,
      ...meta.data
    }
  });
  return posts.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
