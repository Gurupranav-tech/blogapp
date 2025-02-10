import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import MdEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/Auth";
import Request from "@/lib/Requests";
import { usePosts } from "@/contexts/PostsContext";

export default function New() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const { token } = useAuth();
  const { addPost } = usePosts();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/");
  }, [token]);

  const handlePublish = async () => {
    if (!content || !title)
      return toast.error("Post needs a valid title and post body");
    try {
      const res = await Request.POST(
        "/post/create",
        { authorization: `Bearer ${token}` },
        { title, content }
      );
      navigate("/");
      toast.success("Posted!");
      addPost(res.data);
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
          onClick={() => navigate("/")}
          className="text-4xl cursor-pointer hover:scale-110 transition-transform ease-in"
        />
      </section>
      <section className="flex flex-col mt-5" data-color-mode="light">
        <MdEditor
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
        onClick={handlePublish}
      >
        Publish
      </motion.button>
    </div>
  );
}
