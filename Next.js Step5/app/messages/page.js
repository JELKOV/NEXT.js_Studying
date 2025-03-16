// import { unstable_noStore } from "next/cache";
import Messages from "@/components/messages";
import { getMessages } from "@/lib/messages";

// export const revalidate = 5; // 5초마다 데이터 갱신
// export const dynamic = 'force-dynamic'; // 항상 새로운 데이터를 가져옴

export default async function MessagesPage() {
  // unstable_noStore(); // 이 컴포넌트에서만 캐싱 비활성화
  // const response = await fetch("http://localhost:8080/messages", {
  //   next: { tags: ["msg"] },
  // });
  // const messages = await response.json();

  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
