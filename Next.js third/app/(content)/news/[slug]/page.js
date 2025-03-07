import Link from 'next/link'

import {DUMMY_NEWS} from '@/dummy-news'
import {notFound} from 'next/navigation'

export default async function NewsDetailPage({params}) {
  const {slug} = await params

  const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === slug)

  if (!newsItem) {
    notFound()
  }

  return (
    <article className="news-article">
      <header>
        <h1>{newsItem.title}</h1>
        <Link href={`/news/${newsItem.slug}/image`}>
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </Link>

        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>

      <p>{newsItem.content}</p>
    </article>
  )
}
