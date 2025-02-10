import { useAuth } from "@/contexts/Auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { username, logout, token } = useAuth();
  const [modal, showModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    document.addEventListener("click", () => {
      if (modal) showModal(false);
    }, { signal: abortController.signal });
    return () => abortController.abort();
  }, []);

  return (
    <header className="container relative w-4/5 mx-auto flex items-center justify-between py-3 border-b-2 border-black mb-2">
      <div className="text-sm md:text-xl font-semibold">
        {token && <h1>Hello, {username}!</h1>}
        {!token && <h1>Welcome to Blog!</h1>}
      </div>
      <div className="flex items-center gap-4">
        {token ? (
          <>
            <div
              onClick={() => navigate("/new")}
              className="text-sm md:text-xl text-black hover:text-gray-600 cursor-pointer font-semibold"
            >
              Create
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                showModal(m => !m)
              }}
              className="text-sm md:text-xl text-black hover:text-gray-600 cursor-pointer font-semibold"
            >
              Profile
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => navigate("/login")}
              className="text-sm md:text-xl text-black hover:text-gray-600 cursor-pointer font-semibold"
            >
              Login
            </div>
            <div
              onClick={() => navigate("/signin")}
              className="text-sm md:text-xl text-black hover:text-gray-600 cursor-pointer font-semibold"
            >
              Sign In
            </div>
          </>
        )}
      </div>
      {modal && <section style={{ left: "calc(100% - 150px)" }} className="absolute w-[150px] top-3/4 z-10 bg-white border-2 border-black rounded-lg px-4 py-1">
        <div className="text-2xl border-b-2 pb-1 border-black">
          <p className="text-center">{username.length >= 10 ? `${username.substring(0, 10)}...` : username}</p>
        </div>
        <ul className="text-center mt-2 border-b-2 border-black text-lg cursor-pointer">
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li onClick={() => navigate("/new")}>Create</li>
        </ul>
        <ul className="text-center mt-1 text-lg cursor-pointer">
          <li onClick={() => logout()}>Logout</li>
        </ul>
      </section>}
    </header>
  );
}
