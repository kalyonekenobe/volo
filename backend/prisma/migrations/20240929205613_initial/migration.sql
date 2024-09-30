-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" TEXT,
    "firstName" VARCHAR(50),
    "lastName" VARCHAR(50),
    "birthDate" TIMESTAMPTZ(6),
    "phone" VARCHAR(20),
    "bio" TEXT,
    "image" TEXT,
    "userRegistrationMethodId" SMALLINT NOT NULL,
    "userRoleId" SMALLINT NOT NULL,
    "refreshToken" TEXT,
    "stripeCustomerId" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRegistrationMethod" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "UserRegistrationMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "permissions" BIGINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserRegistrationMethod_name_key" ON "UserRegistrationMethod"("name");

-- CreateIndex
CREATE INDEX "UserRegistrationMethod_name_idx" ON "UserRegistrationMethod"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_name_key" ON "UserRole"("name");

-- CreateIndex
CREATE INDEX "UserRole_name_idx" ON "UserRole"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userRegistrationMethodId_fkey" FOREIGN KEY ("userRegistrationMethodId") REFERENCES "UserRegistrationMethod"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES "UserRole"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
