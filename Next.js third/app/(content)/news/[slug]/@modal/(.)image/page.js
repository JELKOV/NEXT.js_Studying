"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { DUMMY_NEWS } from "@/dummy-news";
import { notFound } from "next/navigation";

export default function InterceptedImagePage() {
  const router = useRouter();
  const params = useParams();
  const [slug, setSlug] = useState(null);
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    if (params?.slug) {
      setSlug(params.slug);
      const item = DUMMY_NEWS.find((newsItem) => newsItem.slug === params.slug);
      if (!item) {
        notFound();
      }
      setNewsItem(item);
    }
  }, [params]);

  if (!newsItem) return <p>Loading...</p>;

  return (
    <>
      <div className="modal-backdrop" onClick={() => router.back()} />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
