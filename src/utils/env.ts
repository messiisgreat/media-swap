import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string().min(1),
  GOOGLE_CLIENT_ID: zod.string().min(1),
  GOOGLE_CLIENT_SECRET: zod.string().min(1),
  NEXTAUTH_URL: zod.string().min(1),
  NEXTAUTH_SECRET: zod.string().min(1),
  GOOGLE_RECAPTCHA_SECRET_KEY: zod.string().min(1),
  CLOUDINARY_CLOUDNAME: zod.string().min(1),
  CLOUDINARY_API_KEY: zod.string().min(1),
  CLOUDINARY_API_SECRET: zod.string().min(1),
  CLOUDINARY_UPLOAD_URL: zod.string().min(1),
});

export const env = envSchema.parse(process.env);
