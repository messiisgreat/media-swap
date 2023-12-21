"use client";

import Image from "next/image";
import { useId, useState, type ChangeEvent } from "react";

type Props = {
  src: string;
};

/**
 * プロフィール画像のinputコンポーネント
 * @param param0.src 画像のsrc
 * @returns inputとプレビュー画像を配置したコンポーネント
 */
export const ProfileImageInput = ({ src }: Props) => {
  const imageInputId = useId();
  const [profileImage, setProfileImage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    setProfileImage(window.URL.createObjectURL(files[0]));
  };

  return (
    <label htmlFor={imageInputId}>
      プロフィール画像
      <Image
        src={profileImage || src}
        alt="Profile picture"
        width={40}
        height={40}
        className="w-10 rounded-full"
      />
      <input
        id={imageInputId}
        type="file"
        name="image"
        className="hidden"
        onChange={handleChange}
      />
    </label>
  );
};
