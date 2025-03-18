"use client"; // 클라이언트 컴포넌트로 설정

import { useSearchParams } from "next/navigation";
import AuthForm from "@/components/auth-form";

export default function Home() {
  const searchParams = useSearchParams();
  const formMode = searchParams.get("mode") || "login"; // 기본값 "login"

  return <AuthForm mode={formMode} />;
}