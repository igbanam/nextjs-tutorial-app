import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const name = "@igbanam"
export const siteTitle = "@igbanam's first Next.js"

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description"
              content="@igbanam venturing into JS with Next.js" />
        <meta property="og:image"
              content="" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        { home ? (
          <>
            <Image
              priority
              src="/images/next-profile.jpeg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/next-profile.jpeg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        ) }
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to Home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
