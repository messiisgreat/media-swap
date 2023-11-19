import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
  GOOGLE_RECAPTCHA_SECRET_KEY: z.string().min(1),
  CLOUDINARY_CLOUDNAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  CLOUDINARY_UPLOAD_URL: z.string().min(1),
  CLOUDINARY_UPLOAD_PRESET: z.string().min(1),
});

export const env = envSchema.parse(process.env);
