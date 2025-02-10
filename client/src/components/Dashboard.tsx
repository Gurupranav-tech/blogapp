import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { IoMdSearch } from "react-icons/io";
import { usePosts } from "@/contexts/PostsContext";
import { Card, CardBody, CardHeader } from "./Card";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [search] = useDebounce(searchTerm, 500);
  const { posts } = usePosts();

  const sortedPosts = useMemo(() => {
    if (!search) return posts;
    return posts.filter(
      (post) => post.content.includes(search) || post.title.includes(search)
    );
  }, [search, posts]);

  return (
    <section className="container w-4/5 mx-auto py-3">
      <div className="flex items-center gap-2 text-xl border-2 border-black px-2 py-1 w-full rounded-lg">
        <IoMdSearch className="text-2xl" />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search..."
          className="outline-none flex-1"
        />
      </div>
      <div>
        <div className="mt-4 grid gap-4">
          {sortedPosts.map((post, idx) => (
            <Card key={idx}>
              <CardHeader>{post.title}</CardHeader>
              <CardBody content={post.content}>
                <div className="mt-1 border-t-2 border-black">
                  <p className="text-gray-600 text-end">{post.user.name}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
