"use client";

import { Tag } from "@prisma/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

/**
 * タグを入力するコンポーネント
 * @param tags タグの配列
 * @returns タグ
 */
export function ProductTagInput({ tags }: { tags: Tag[] }) {
  const [enteredTags, setEnteredTags] = useState<Tag[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const hiddenInput = ref.current;
    if (hiddenInput) {
      hiddenInput.value = JSON.stringify(enteredTags);
    }
  }, [enteredTags]);

  const handleDelete = useCallback(
    (index: number) => {
      setEnteredTags(enteredTags.filter((_, i) => i !== index));
    },
    [enteredTags],
  );

  const handleAddition = useCallback(
    (tag: Tag) => {
      setEnteredTags([...enteredTags, tag]);
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
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        inputFieldPosition="bottom"
        autocomplete
        classNames={{
          tagInputField: "input input-bordered w-full",
          tag: "badge badge-primary p-2",
          tags: "",
          tagInput: "",
          remove: "tag-remove",
          suggestions: "tag-suggestions",
          activeSuggestion: "tag-activeSuggestion",
        }}
      />
      <input type="hidden" name="tags" />
    </div>
  );
}
