import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0,
      }}
      className="bg-white border-2 border-black px-4 py-2 rounded-lg shadow-md card-width"
    >
      {children}
    </motion.article>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center border-b-2 border-b-black pb-1">
      <h2 className="text-xl font-bold ">{children}</h2>
    </div>
  );
}

export function CardBody({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) {
  return (
    <div className="mt-2 break-words">
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      {children}
    </div>
  );
}
