import Date from '../../components/date'
import Head from 'next/head'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getPostIDs, getPost } from '../../lib/posts'

export default function Post({ post }) {
  return (
    <Layout>
      <Head>
        <title>{ post.title }</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
      </article>
      {/* post.id */}
      <div className={utilStyles.lightText}>
        <Date dateString={post.date} />
      </div>
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
