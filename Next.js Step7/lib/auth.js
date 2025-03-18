import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import db from "./db";
import { cookies } from "next/headers";

const adapter = new BetterSqlite3Adapter(db, {
  user: "users",
  session: "sessions",
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  const cookieStore = await cookies();
  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  console.log("✅ 세션 쿠키 설정 완료:", sessionCookie);
}

export async function verifyAuth() {
  const cookieStore = await cookies();

  // 🚨 `lucia.sessionCookieName`이 `auth_session`인지 확인 후 직접 가져오기
  const sessionCookie = cookieStore.get("auth_session");

  if (!sessionCookie) {
    console.log("🚨 인증 실패: 세션 쿠키 없음");
    return { user: null, session: null };
  }

  const sessionId = sessionCookie.value;
  if (!sessionId) {
    console.log("🚨 인증 실패: 세션 ID 없음");
    return { user: null, session: null };
  }

  // Lucia로 세션 검증
  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookieStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookieStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}

  console.log("✅ 인증 결과:", result);
  return result;
}

export async function destorySession() {
  // 현재 사용자의 인증 세션 확인
  const { session } = await verifyAuth();
  const cookieStore = await cookies();
  
  // 세션이 존재하지 않으면 인증되지 않은 사용자이므로 에러 반환
  if (!session) {
    return {
      error: 'Unauthorized'
    };
  }

  // 현재 세션을 무효화 (로그아웃 처리)
  await lucia.invalidateSession(session.id);

  // 기존 세션 쿠키를 무효화하기 위해 빈 세션 쿠키 생성
  const sessionCookie = lucia.createBlankSessionCookie();
  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
