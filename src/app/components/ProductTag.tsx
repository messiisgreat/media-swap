"use client";

import { Tag } from "@prisma/client";
import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

type ProductTagProps = {
  fetchedTags: Tag[];
};

export default function ProductTag({ fetchedTags }: ProductTagProps) {
  const [tags, setTags] = useState<Tag[]>([]);

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: { id: string; text: string }) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (
    tag: { id: string; text: string },
    currPos: number,
    newPos: number,
  ) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  return (
    <div>
      <ReactTags
        tags={tags}
        suggestions={fetchedTags}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        inputFieldPosition="bottom"
        autocomplete
        classNames={{
          tag: "badge badge-primary",
          tagInputField: "input input-bordered",
          selected: "flex flex-wrap gap-2 mb-2",
        }}
      />
      <input type="hidden" name="tags" value={JSON.stringify(tags)} />
    </div>
  );
}
