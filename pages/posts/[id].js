import Layout from '../../components/layout'
import { getPostIDs, getPost } from '../../lib/posts'

export default function Post({ post }) {
  return (
    <Layout>
      {post.title}
      <br />
      {post.id}
      <br />
      {post.date}
      <div dangerouslySetInnerHTML={{ __html: post.content_html }} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getPostIDs()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.id)
  return {
    props: {
      post
    }
  }
}
