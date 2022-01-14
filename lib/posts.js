import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts');

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
