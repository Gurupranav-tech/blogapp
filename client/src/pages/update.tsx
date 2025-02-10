import { usePosts } from "@/contexts/PostsContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import rehypeSanitize from "rehype-sanitize";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "react-toastify";
import Request from "@/lib/Requests";
import { useAuth } from "@/contexts/Auth";

export default function UpdatePost() {
  const { id } = useParams();
  const { posts, updatePost } = usePosts();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [title, setTitle] = useState(
    posts.find((post) => post.id === id)?.title || ""
  );
  const [content, setContent] = useState(
    posts.find((post) => post.id === id)?.content || ""
  );

  useEffect(() => {
    if (!token) return navigate("/");
    if (!posts.find((post) => post.id === id)) return navigate("/");
  }, [id]);

  const handleUpdate = async () => {
    if (!id) return;
    if (!content || !title)
      return toast.error("Post needs a valid title and post body");
    try {
      await Request.POST(
        `/post/update/${id}`,
        { authorization: `Bearer ${token}` },
        { title, content }
      );
      navigate("/");
      toast.success("Updated!");
      updatePost(title, content, id);
    } catch (err: any) {
      toast.error(err.toString());
    }
  };

  return (
    <div className="container w-4/5 mx-auto mt-4">
      <section className="border-b-2 border-black pb-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="New Post Title Goes Here..."
          className="outline-none w-full text-4xl text-center flex-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <IoClose
          onClick={() => navigate("/profile")}
          className="text-4xl cursor-pointer hover:scale-110 transition-transform ease-in"
        />
      </section>
      <section className="flex flex-col mt-5" data-color-mode="light">
        <MDEditor
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          value={content}
          onChange={(e) => setContent(e || "")}
          color="light"
        />
      </section>
      <motion.button
        className="mt-4 text-center py-2 w-full bg-black text-white text-xl font-bold rounded-lg"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleUpdate}
      >
        Update
      </motion.button>
    </div>
  );
}
