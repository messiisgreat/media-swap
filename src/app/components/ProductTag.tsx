"use client";

import { WithContext as ReactTags } from "react-tag-input";
import "./productTag.css";
import { useState, useEffect } from "react";

type Tag = { id: string; text: string; };

type ProductTagProps = {
  fetchedTags: Tag[];
};

export default function ProductTag({ fetchedTags }: ProductTagProps) {

  const [tags, setTags] = useState<{ id: string; text: string; }[]>([]);
  useEffect(() => {
    setTags(fetchedTags);
  }, []);

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

    // re-render
    setTags(newTags);
  };

  return (
    <ReactTags
      tags={tags}
      // suggestions={suggestions}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      inputFieldPosition="bottom"
      autocomplete
    />
  );
}
