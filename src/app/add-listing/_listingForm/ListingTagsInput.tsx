"use client";

import { Input } from "@/components/form";
import { useState } from "react";
import { IoClose, IoPricetagOutline } from "react-icons/io5";
import { Tag } from "react-tag-input";

type Props = {
  name: string;
  suggestedTags: Tag[];
};

type NewTag = Omit<Tag, "id" | "createdAt">;
export function ListingTagsInput({ name, suggestedTags }: Props) {
  const [newTags, setNewTags] = useState<Array<NewTag>>([]);

  const onKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // ブラウザでIME確定時のEnterキー入力をハンドリングしないようにするためにkeyCodeを確認する
    if (e.keyCode !== 13 || e.currentTarget.value === "") {
      return;
    }

    const isExist = newTags.find((tag) => tag.text === e.currentTarget.value);
    if (isExist) {
      e.currentTarget.value = "";
      return;
    }

    const newTag = {
      text: e.currentTarget.value,
    };
    setNewTags([...newTags, newTag]);
    e.currentTarget.value = "";
  };

  const onClickDelete = (tagName: string) => {
    setNewTags(newTags.filter((tag) => tag.text !== tagName));
  };

  return (
    <div className="flex flex-col gap-3">
      {newTags.length > 0 && (
        <div>
          <label className="text-sm text-neutral-400">Tags</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {newTags.map((tag) => (
              <span
                key={tag.text}
                className="w-full px-3 py-2 bg-white border border-primary shadow-md rounded-md flex justify-between items-center"
              >
                <span className="flex justify-start items-center gap-2">
                  <IoPricetagOutline />
                  <p className="text-sm">{tag.text}</p>
                </span>
                <span
                  data-testid="delete"
                  onClick={() => onClickDelete(tag.text)}
                >
                  <IoClose class="cursor-pointer" />
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
      <Input
        list="tags"
        name="showTag"
        type="text"
        placeholder="タグ名を入力してください"
        onKeyDown={(e) => {
          onKeyDownEnter(e);
        }}
      />
      <datalist id="tags">
        {suggestedTags.map((tag) => (
          <option
            key={tag.text}
            value={tag.text}
            data-testid={`test-${tag.text}`}
          />
        ))}
      </datalist>
      {/* Server Action用のinput */}
      <Input
        type="hidden"
        name={name}
        value={newTags.map((tag) => tag.text).join(",")}
      />
    </div>
  );
}
