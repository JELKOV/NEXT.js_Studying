import NewsList from '@/components/news-list'
import { getAllNews } from '@/lib/news'

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <section>
      <h1>최신 뉴스</h1>
      <NewsList news={news} />
    </section>
  )
}
