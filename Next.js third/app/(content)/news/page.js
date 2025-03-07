import Link from 'next/link'
import {DUMMY_NEWS} from '@/dummy-news'
import NewsList from '@/components/news-list'

export default function NewsPage() {
  return (
    <section>
      <h1>최신 뉴스</h1>
      <NewsList news={DUMMY_NEWS} />
    </section>
  )
}
