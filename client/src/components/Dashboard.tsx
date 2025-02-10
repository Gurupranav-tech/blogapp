import { IoMdSearch } from "react-icons/io"

export default function Dashboard() {
  return (
    <section className="container w-4/5 mx-auto flex items-center justify-between py-3">
      <div className="flex items-center gap-2 text-xl border-2 border-black px-2 py-1 w-full rounded-lg">
        <IoMdSearch className="text-2xl" />
        <input type="text" placeholder="Search..." className="outline-none flex-1" />
      </div>

    </section>
  );
}
