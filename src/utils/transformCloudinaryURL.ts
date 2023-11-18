import { env } from "@/utils/env";

/**
 *
 * @param url
 * @param width
 * @param height
 * @param backgroundColor
 */
export function transformCloudinaryURL(url: string, width: number, height: number, backgroundColor: string): string {
  const baseUrl = `https://res.cloudinary.com/${env.CLOUDINARY_CLOUDNAME}/image/upload/`;
  const transformation = `c_pad,b_rgb:${backgroundColor},w_${width},h_${height}`;
  const imagePath = url.split(baseUrl)[1];

  return `${baseUrl}${transformation}/${imagePath}`;
}