-- CreateTable
CREATE TABLE "Post" (
    "id" UUID NOT NULL,
    "authorId" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "fundsToBeRaised" MONEY NOT NULL,
    "deadline" TIMESTAMPTZ(6),
    "image" TEXT,
    "isDraft" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "removedAt" TIMESTAMPTZ(6),

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostDonation" (
    "id" UUID NOT NULL,
    "postId" UUID NOT NULL,
    "donation" MONEY NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "removedAt" TIMESTAMPTZ(6),

    CONSTRAINT "PostDonation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostCategory" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "PostCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryToPost" (
    "categoryId" SMALLINT NOT NULL,
    "postId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "CategoryToPost_pkey" PRIMARY KEY ("categoryId","postId")
);

-- CreateIndex
CREATE INDEX "Post_title_idx" ON "Post"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Post_title_authorId_key" ON "Post"("title", "authorId");

-- CreateIndex
CREATE INDEX "PostDonation_donation_idx" ON "PostDonation"("donation");

-- CreateIndex
CREATE UNIQUE INDEX "PostCategory_name_key" ON "PostCategory"("name");

-- CreateIndex
CREATE INDEX "PostCategory_name_idx" ON "PostCategory"("name");

-- CreateIndex
CREATE INDEX "CategoryToPost_updatedAt_idx" ON "CategoryToPost"("updatedAt");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostDonation" ADD CONSTRAINT "PostDonation_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryToPost" ADD CONSTRAINT "CategoryToPost_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "PostCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryToPost" ADD CONSTRAINT "CategoryToPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
