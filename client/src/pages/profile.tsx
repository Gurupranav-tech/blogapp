import Header from "@/components/Header";
import { useAuth } from "@/contexts/Auth";
import { usePosts } from "@/contexts/PostsContext";
import Request from "@/lib/Requests";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { token } = useAuth();
  const { myPosts, deletePost } = usePosts();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/");
  }, [token]);

  const removePost = (id: string) => async () => {
    deletePost(id);
    await Request.GET(`/post/delete/${id}`, {
      authorization: `Bearer ${token}`,
    });
  };

  const handleUpdateNavigation = (id: string) => () => {
    navigate(`/update/${id}`);
  };

  return (
    <AnimatePresence>
      <Header />
      <section className="w-4/5 mx-auto mt-4 mb-4 grid gap-4">
        {myPosts.map((post, idx) => (
          <article
            key={idx}
            className="flex cursor-pointer items-center justify-between border-2 border-black px-4 py-2 rounded-lg shadow-lg"
            onClick={handleUpdateNavigation(post.id)}
          >
            <span>{idx + 1}</span>
            <p>
              {post.title.length >= 80
                ? `${post.title.substring(0, 80)}...`
                : post.title}
            </p>
            <MdDelete
              onClick={removePost(post.id)}
              className="text-red-600 text-xl cursor-pointer hover:scale-110"
            />
          </article>
        ))}
      </section>
    </AnimatePresence>
  );
}
