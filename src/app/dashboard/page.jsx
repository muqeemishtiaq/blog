"use client";

import { useSession } from "next-auth/react";
import style from "./page.module.css";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading, mutate } = useSWR(
    session?.data?.user?.name
      ? `/api/posts?username=${session.data.user.name}`
      : null,
    fetcher
  );

  if (session.status === "loading") {
    return <p>Loading session...</p>;
  }

  if (session.status === "unauthenticated") {
    router.push("/dashboard/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;
    if (!title || !desc || !img || !content) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data.user.name,
        }),
      });

      mutate();
      e.target.reset();
    } catch (err) {
      console.log("Error creating post:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      mutate();
    } catch (err) {
      console.log("Error deleting post:", err);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.posts}>
        {isLoading && <p>Loading posts...</p>}
        {error && <p>Error loading posts.</p>}
        {isLoading ? "loading" : data?.map((post) => (
          <div key={post._id} className={style.post}>
            <div className={style.imgContainer}>
              <Image
                src={post.img}
                alt="Post image"
                width={200}
                height={100}
                className={style.img}
              />
            </div>
            <h2 className={style.postTitle}>{post.title}</h2>
            <span
              className={style.delete}
              onClick={() => handleDelete(post._id)}
            >
              X
            </span>
          </div>
        ))}
      </div>

      <form className={style.new} onSubmit={handleSubmit}>
        <h1>Add New Post</h1>
        <input type="text" placeholder="Title" className={style.input} />
        <input type="text" placeholder="Description" className={style.input} />
        <input type="text" placeholder="Image URL" className={style.input} />
        <textarea
          placeholder="Content"
          className={style.textArea}
          cols="30"
          rows="10"
        ></textarea>
        <button type="submit" className={style.button}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Dashboard;