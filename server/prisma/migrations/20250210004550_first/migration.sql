-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "genres" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    CONSTRAINT "Post_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "postid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    CONSTRAINT "Likes_postid_fkey" FOREIGN KEY ("postid") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Likes_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
