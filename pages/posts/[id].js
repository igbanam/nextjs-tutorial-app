import Layout from '../../components/layout'
import { getPostIDs } from '../../lib/posts'

export default function Post() {
  return (
    <Layout>
      ...
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
