import {getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth} from '@/lib/news'
import Link from 'next/link'
import { Suspense } from 'react'
import NewsList from '@/components/news-list'

async function FilterHeader({ year, month }) {
  const availableYears = await getAvailableNewsYears();
  console.log('가능한 연도 목록:', availableYears);

  // 선택한 연도/월이 유효한지 검사
  if (year && !availableYears.includes(year.toString())) {
    throw new Error(`Invalid year: ${year}`);
  }

  // 기본적으로 모든 연도를 링크로 표시
  let links = availableYears; 

  if (year) {
    const availableMonths = await getAvailableNewsMonths(year);
    console.log(`${year}년의 가능한 월 목록:`, availableMonths);

    // selectedMonth를 두 자리 문자열로 변환 후 비교
    const formattedMonth = month ? month.toString().padStart(2, "0") : null;
    console.log(`${year}년의 가능한 월 목록:`, availableMonths);

    if (formattedMonth && !availableMonths.includes(formattedMonth)) {
      throw new Error(`Invalid month: ${month}`);
    }

    links = month ? [] : availableMonths;
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map(link => {
            const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

async function FilteredNews({year, month}) {
  let news = []

  if (year && !month) {
    news = await getNewsForYear(year)
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month)
  }

  // 뉴스가 없을 경우 기본 메시지 표시
  let newsContent = <p>No news found for the selected period.</p>
  if (news.length > 0) {
    newsContent = <NewsList news={news} />
  }

  return newsContent
}

export default async function FilteredNewsPage({params}) {
  // params 비동기 객체 처리 및 기본값 할당
  const {filter = []} = (await params) || {}

  // 선택한 연도 및 월 설정 (문자열 → 숫자로 변환 후 유효성 검사)
  const [rawYear, rawMonth] = filter
  const selectedYear = rawYear ? parseInt(rawYear, 10) : undefined
  const selectedMonth = rawMonth ? parseInt(rawMonth, 10) : undefined

  // 잘못된 숫자인 경우 필터링
  if (selectedYear && isNaN(selectedYear)) {
    throw new Error(`Invalid year: ${rawYear}`)
  }
  if (selectedMonth && isNaN(selectedMonth)) {
    throw new Error(`Invalid month: ${rawMonth}`)
  }

  console.log('현재 필터 값:', filter)
  console.log('선택한 연도:', selectedYear)
  console.log('선택한 월:', selectedMonth)


  return (
    <>
      <Suspense fallback={<p>Loading Filter...</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <Suspense fallback={<p>Loading news...</p>}>
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  )
}
