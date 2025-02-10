import Request from "@/lib/Requests";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useAuth } from "./Auth";

type Post = {
  id: string;
  title: string;
  content: string;
  genres: string;
  user: {
    name: string;
    email: string;
  };
};

type Context = {
  posts: Post[];
  myPosts: Post[];
  addPost: (post: Post) => void;
  deletePost: (id: string) => void;
  updatePost: (title: string, content: string, id: string) => void;
};

const context = createContext<Context>({} as Context);

export function usePosts() {
  return useContext(context);
}

export default function PostsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { email } = useAuth();
  const myPosts = useMemo(
    () => posts.filter((post) => post.user.email === email),
    [posts]
  );

  const addPost = (post: Post) => {
    setPosts((p) => [...p, post]);
  };

  const deletePost = (id: string) => {
    setPosts((post) => post.filter((p) => p.id !== id));
  };

  const updatePost = (title: string, content: string, id: string) => {
    setPosts((post) => {
      return post.map((p) => {
        if (p.id !== id) return p;
        return { ...p, title, content };
      });
    });
  };

  useEffect(() => {
    Request.GET("/post/posts", {}).then((res) => {
      setPosts(res.data);
    });
  }, []);

  const values = {
    posts,
    myPosts,
    addPost,
    deletePost,
    updatePost,
  };

  return <context.Provider value={values}>{children}</context.Provider>;
}
