"use client";

import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import Image from "next/image";
import { togglePostLikeStatus } from "@/app/actions/posts";
import { useOptimistic } from "react";

function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        {post.image ? (
          <Image src={post.image} alt={post.title} width={500} height={300} />
        ) : (
          <p>No Image Available</p>
        )}
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  // 💡 낙관적 UI 구현
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, updatedPostId) => {
      // 1️⃣ 변경할 게시물 찾기
      const updatedPostIndex = prevPosts.findIndex(
        (post) => post.id === updatedPostId
      );
      
      if (updatedPostIndex === -1) {
        return prevPosts;
      }

      // 2️⃣ 기존 게시물 복사하여 업데이트
      const updatedPost = { ...prevPosts[updatedPostIndex] };
      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : +1); // 좋아요 개수 변경
      updatedPost.isLiked = !updatedPost.isLiked; // 좋아요 상태 반전

      // 3️⃣ 새로운 게시물 배열 생성 (불변성 유지)
      const newPosts = [...prevPosts];
      newPosts[updatedPostIndex] = updatedPost;
      return newPosts;
    }
  );

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  // 💡 UI 즉시 업데이트 + 서버 요청
  async function updatePost(postId) {
    updateOptimisticPosts(postId); // 💨 UI 즉시 변경
    await togglePostLikeStatus(postId); // 📡 서버 요청
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
