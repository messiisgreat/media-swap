"use client";

import { addProduct } from "@/app/add-product/server"
import FormSubmitButton from "@/components/FormSubmitButton"
import ProductTag from "@/components/ProductTag"
import { BiSolidCamera } from "react-icons/bi"
import ReCAPTCHA from "react-google-recaptcha"
import z from "zod";
import { Tag } from "@prisma/client";
import { useCallback, useRef } from "react";
import { toast } from "react-hot-toast";

/**
 * 商品を登録するためのフォーム
 * @param param0.tags タグ
 * @returns form
 */
export const ProductForm = ({ tags }: { tags: Tag[] }) => {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const action = useCallback(async (f: FormData) => {
    const e = await addProduct(f, captchaRef.current?.getValue());
    if (typeof e === "string") {
      // クライアントサイドに公開しても問題ないのでそのまま流す
      toast.error(e);
    } else {
      throw e;
    }
  }, [captchaRef]);
    return (
        <form action={action} className="flex flex-col gap-3">
        <input
          required
          name="name"
          placeholder="Name"
          className="input input-bordered w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
        ></textarea>
        <label className="mb-3 flex cursor-pointer items-center justify-center rounded-md border border-red-500 bg-white text-red-500 hover:border-rose-400 hover:bg-red-50 hover:text-rose-400" htmlFor="imageInput">
          <div className="flex flex-row items-center justify-center gap-1 px-3 py-3.5" >
            <BiSolidCamera size={20} /><p className="font-bold" >画像を選択する</p>
          </div>
        </label>
        <input
          required
          type="file"
          name="imageFile"
          accept="image/*"
          id="imageInput"
          className="hidden"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input input-bordered w-full"
        />
        <ProductTag fetchedTags={tags} />
        {/* パブリックキーなのでsrc/lib/env.tsでやらないほうがいいかも */}
        <ReCAPTCHA sitekey={z.string().nonempty().parse(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY)} ref={captchaRef} />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    )
}