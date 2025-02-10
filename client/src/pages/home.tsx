import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";
import { AnimatePresence } from "framer-motion"

export default function Home() {
  return (
    <AnimatePresence>
      <Header />
      <Dashboard />
    </AnimatePresence>
  );
}
