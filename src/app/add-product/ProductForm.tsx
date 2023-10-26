import { addProduct, fetchTags } from "@/app/add-product/server"
import FormSubmitButton from "@/components/FormSubmitButton"
import ProductTag from "@/components/ProductTag"
import { UploadImages } from "@/app/add-product/UploadImages"
import { BiSolidCamera } from "react-icons/bi"
import { useDropzone } from "react-dropzone"

/**
 * 商品を登録するためのフォーム
 * @returns form
 */
export const ProductForm = async () => {

    const tags = await fetchTags();
    return (
      <>
      <form action={addProduct} className="flex flex-col gap-3">
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
        {/* <label className="flex items-center justify-center bg-white text-red-500 border border-red-500 rounded-md hover:bg-red-50 hover:text-rose-400 hover:border-rose-400 cursor-pointer mb-3" htmlFor="imageInput">
          <div className="px-3 py-3.5 flex flex-row items-center justify-center gap-1" >
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
        /> */}
        <UploadImages />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input input-bordered w-full"
        />
        <ProductTag fetchedTags={tags} />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
      </>
    )
}