import Link from 'next/link' // NEXT.js 프레임워크에서 제공 단일페이지 어플리케이션
import Header from '@/components/header'

export default function Home() {
  console.log("Excuting...")
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p><Link href="/about">About Us</Link></p>
    </main>
  );
}
