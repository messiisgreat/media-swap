// pages/api/convert.ts
import formidable from "formidable";
import fs from "fs";
import convert from "heic-convert";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * HEIC/HEIF画像をJPEGに変換する
 * @param req リクエスト
 * @param res レスポンス
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // POSTリクエストのみを許可
  if (req.method !== "POST") {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }

    // ファイルの取得
    const file = files.file; // ファイルフィールド名 'file' を使用
    if (!file) {
      res.status(400).send("No file uploaded");
      return;
    }

    // formidable.File 型のチェックを行う
    if (!("filepath" in file) || typeof file.filepath !== "string") {
      res.status(400).send("Uploaded file is not valid");
      return;
    }

    // HEIC/HEIF画像をJPEGに変換
    try {
      const inputBuffer = fs.readFileSync(file.filepath);
      const outputBuffer = await convert({
        buffer: inputBuffer,
        format: "JPEG",
        quality: 1,
      });

      // 変換した画像をレスポンスとして返す
      res.setHeader("Content-Type", "image/jpeg");
      res.send(outputBuffer);
    } catch (conversionError) {
      res.status(500).send("Failed to convert image");
    }
  });
}
