import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const prisma = new PrismaClient();
const googleGenerativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const ai = googleGenerativeAI.getGenerativeModel({
  model: "gemini-pro",
})

async function getPost() {
  await prisma.$connect();
  const text = ((await ai.generateContent("Write a webdev post in 100 words. Make sure the post is technical and with proper title. Make sure the post is in one paragraph")).response.text());
  const heading = text.split("\n")[0].replace(/\*\*/g, "");
  const content = text.substring(text.indexOf("\n")+2);
  return ({ heading, content })
}

async function main() {
  let promises = []

  for (let i = 0; i < 10; i++) {
    promises.push(getPost());
  }

  const results = await Promise.all(promises);
  promises = []
  results.map(result => {
    promises.push(prisma.post.create({
      data: {
        title: result.heading,
        content: result.content,
        genres: "webdev",
        userid: "1845f0e6-bd2e-49b3-93dd-bd024c813cf7"
      }
    }))
  })
  await Promise.all(promises);
  console.log("done");
}

main().then(r => console.log('done', r)).catch(console.log)