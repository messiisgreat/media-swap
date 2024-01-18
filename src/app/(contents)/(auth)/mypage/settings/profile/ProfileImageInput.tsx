"use client";

import Image from "next/image";
import {
  useCallback,
  useId,
  useState,
  type ChangeEvent,
  type ComponentProps,
} from "react";

type Props = {
  initialSrc: string;
  labelText: string;
} & Omit<ComponentProps<"input">, "type" | "className">;

/**
 * プロフィール画像のinputコンポーネント
 * @returns inputとプレビュー画像を配置したコンポーネント
 */
export const ImageInput = ({ initialSrc, labelText, ...props }: Props) => {
  const imageInputId = useId();
  const [profileImage, setProfileImage] = useState("");

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    const image = files?.item(0);
    if (!image) return;

    setProfileImage(window.URL.createObjectURL(image));
  }, []);

  return (
    <div className="flex flex-col">
      <label>{labelText}</label>
      <label htmlFor={imageInputId} className="w-16 cursor-pointer">
        <Image
          src={profileImage || initialSrc}
          alt={labelText}
          width={64}
          height={64}
          className="size-16 rounded-full"
        />
      </label>
      <input
        id={imageInputId}
        type="file"
        className="hidden"
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};
