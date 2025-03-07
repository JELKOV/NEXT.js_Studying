'use client'
import {useParams} from 'next/navigation'
import {getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth} from '@/lib/news'
import Link from 'next/link'
import NewsList from '@/components/news-list'

export default function FilteredNewsPage() {
  const params = useParams()
  const filter = params?.filter || []
  console.log('현재 필터 값', filter)
  const selectedYear = filter.length > 0 ? parseInt(filter[0], 10) : undefined
  const selectedMonth = filter.length > 1 ? parseInt(filter[1], 10) : undefined

  let news;
  let links = getAvailableNewsYears();

  if (selectedYear && !selectedMonth) {
    news = getNewsForYear(selectedYear);
    links = getAvailableNewsMonths(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    news = getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }

  let newsContent = <p>no news found for the selected period.</p>

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />
  }

  if (
    (selectedYear && !getAvailableNewsYears().includes(+selectedYear)) ||
    (selectedYear && selectedMonth && !getAvailableNewsMonths(selectedYear).includes(+selectedMonth)) ||
    filter.length > 2
  ) {
    throw new Error('Invalid filter')
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map(link => {
              const href = selectedYear ? `/archive/${selectedYear}/${link}` : `/archive/${link}`
              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  )
}
