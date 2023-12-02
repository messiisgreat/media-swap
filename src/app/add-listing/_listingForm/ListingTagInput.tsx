"use client";

import { Tag } from "@prisma/client";
import {
  ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { WithContext } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

type Props = Omit<
  ComponentProps<typeof WithContext>,
  "handleAddition" | "handleDelete"
> & {
  tags: Tag[];
};

type NewTag = Omit<Tag, "createdAt">;

/**
 * タグを入力するコンポーネント「非推奨」
 * formから認識できるようにhidden inputに値を設定している
 * @param tags データベースから取得したタグの配列
 * @returns div
 * @see https://github.com/react-tags/react-tags
 * @todo 移行後に削除する
 */
export function ListingTagInput({ tags, name, ...props }: Props) {
  const [enteredTags, setEnteredTags] = useState<NewTag[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const hiddenInput = ref.current;
    if (hiddenInput) {
      hiddenInput.value = JSON.stringify(enteredTags);
    }
  }, [enteredTags]);

  const handleAddition = useCallback((tag: NewTag) => {
    setEnteredTags((enteredTags) => [...enteredTags, tag]);
  }, []);

  const handleDelete = useCallback((index: number) => {
    setEnteredTags((enteredTags) => enteredTags.filter((_, i) => i !== index));
  }, []);

  const handleDrag = useCallback(
    (tag: NewTag, currPos: number, newPos: number) => {
      setEnteredTags((enteredTags) => {
        const NewTags = enteredTags.slice();
        NewTags.splice(currPos, 1);
        NewTags.splice(newPos, 0, tag);
        return NewTags;
      });
    },
    [],
  );

  return (
    <div>
      <WithContext
        tags={enteredTags}
        suggestions={tags}
        delimiters={delimiters}
        handleAddition={handleAddition}
        handleDelete={handleDelete}
        handleDrag={handleDrag}
        inputFieldPosition="bottom"
        autocomplete
        classNames={{
          tagInputField: "input input-bordered w-full",
          tag: "badge badge-primary p-2",
          tagInput: "",
        }}
        {...props}
      />
      <input type="hidden" name={name} ref={ref} />
    </div>
  );
}
