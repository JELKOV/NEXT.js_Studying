import { verifyAuth } from "@/lib/auth";
import { getTrainings } from "@/lib/training";
import { redirect } from "next/navigation";

export default async function TrainingPage() {
  const result = await verifyAuth();
  console.log("🟢 verifyAuth() 결과:", result);

  if (!result.user) {
    console.log("🚨 인증되지 않은 사용자 → 리디렉션 실행");
    return redirect('/');
  }

  const trainingSessions = getTrainings();

  return (
    <main>
      <h1>Find your favorite activity</h1>
      <ul id="training-sessions">
        {trainingSessions.map((training) => (
          <li key={training.id}>
            <img src={`/trainings/${training.image}`} alt={training.title} />
            <div>
              <h2>{training.title}</h2>
              <p>{training.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
