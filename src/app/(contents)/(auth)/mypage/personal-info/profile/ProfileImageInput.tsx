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
    if (!files) return;
    setProfileImage(window.URL.createObjectURL(files[0]));
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
          className="h-16 w-16 rounded-full"
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
