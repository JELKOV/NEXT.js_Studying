"use server";

import sql from 'better-sqlite3';

// SQLite 데이터베이스 연결
const db = sql('data.db');

// 전체 뉴스 가져오기
export async function getAllNews() {
  const news = db.prepare('SELECT * FROM news').all();
  await new Promise(resolve => setTimeout(resolve, 2000)); // 데이터베이스 지연 시뮬레이션
  return news;
}

// 특정 뉴스 항목 가져오기
export async function getNewsItem(slug) {
  const newsItem = db.prepare('SELECT * FROM news WHERE slug = ?').get(slug);
  await new Promise(resolve => setTimeout(resolve, 2000));
  return newsItem;
}

// 최신 뉴스 가져오기
export async function getLatestNews() {
  const latestNews = db.prepare('SELECT * FROM news ORDER BY date DESC LIMIT 3').all();
  await new Promise(resolve => setTimeout(resolve, 2000));
  return latestNews;
}

// 사용 가능한 연도 목록 가져오기
export async function getAvailableNewsYears() {
  const years = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all()
    .map(row => row.year.toString()); // 문자열 변환

  console.log("DB에서 가져온 연도 목록:", years);
  await new Promise(resolve => setTimeout(resolve, 2000));
  return years;
}

// 특정 연도의 사용 가능한 월 목록 가져오기
export async function getAvailableNewsMonths(year) {
  if (!year) return []; 

  const months = db
    .prepare(
      "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?"
    )
    .all(year.toString()) 
    .map(row => row.month.toString());

  console.log(`DB에서 가져온 ${year}년의 월 목록:`, months);
  await new Promise(resolve => setTimeout(resolve, 2000));
  return months;
}

// 특정 연도의 뉴스 가져오기
export async function getNewsForYear(year) {
  if (!year) return [];

  const news = db.prepare("SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC").all(year.toString());

  console.log(`DB에서 가져온 ${year}년의 뉴스 개수:`, news.length);
  await new Promise(resolve => setTimeout(resolve, 2000));
  return news;
}

// 특정 연도 및 월의 뉴스 가져오기
export async function getNewsForYearAndMonth(year, month) {
  if (!year || !month) return [];

  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
    )
    .all(year.toString(), month.toString());

  console.log(`DB에서 가져온 ${year}년 ${month}월의 뉴스 개수:`, news.length);
  await new Promise(resolve => setTimeout(resolve, 2000));
  return news;
}
