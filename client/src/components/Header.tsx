import { useAuth } from "@/contexts/Auth";

export default function Header() {
  const { username, logout } = useAuth();

  return (
    <header className="container w-4/5 mx-auto flex items-center justify-between py-3 border-b-2 border-black mb-2">
      <div className="text-3xl font-semibold">
        <h1>Hello, {username}!</h1>
      </div>
      <div
        onClick={logout}
        className="text-xl text-black hover:text-gray-600 cursor-pointer font-semibold"
      >
        Logout
      </div>
    </header>
  );
}
