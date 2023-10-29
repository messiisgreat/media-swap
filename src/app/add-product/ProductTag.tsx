"use client";

import { Tag } from "@prisma/client";
import {
  ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

type Props = Omit<
  ComponentProps<typeof ReactTags>,
  "handleAddition" | "handleDelete"
> & {
  tags: Tag[];
};

/**
 * タグを入力するコンポーネント
 * formから認識できるようにhidden inputに値を設定している
 * @param tags データベースから取得したタグの配列
 * @returns div
 */
export function ProductTagInput({ tags, name, ...props }: Props) {
  const [enteredTags, setEnteredTags] = useState<Tag[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const hiddenInput = ref.current;
    if (hiddenInput) {
      hiddenInput.value = JSON.stringify(enteredTags);
    }
  }, [enteredTags]);

  const handleAddition = useCallback(
    (tag: Tag) => {
      setEnteredTags([...enteredTags, tag]);
    },
    [enteredTags],
  );

  const handleDelete = useCallback(
    (index: number) => {
      setEnteredTags(enteredTags.filter((_, i) => i !== index));
    },
    [enteredTags],
  );

  const handleDrag = useCallback(
    (tag: Tag, currPos: number, newPos: number) => {
      const newTags = enteredTags.slice();
      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);
      setEnteredTags(newTags);
    },
    [enteredTags],
  );

  return (
    <div>
      <ReactTags
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
