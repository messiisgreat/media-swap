"use client";

import { TagCard } from "@/features/itemsFormContents/detailsContents/itemTags/TagCard";
import { Button } from "@/ui";
import { Input } from "@/ui/form";
import { type Tag } from "@prisma/client";
import { useCallback, useMemo, useState } from "react";

type Props = {
  /** formのname属性 */
  name: string;
  /** データベースから取得したタグの配列 */
  suggestedTags: Tag[];
  /** 選択済みのタグの配列 */
  selectedTags?: Tag[];
  /** タグの最大数 */
  maxTags?: number;
};

type NewTag = Omit<Tag, "id" | "createdAt">;

const ENTER_KEY_CODE = 13;

/**
 * タグを入力するコンポーネント
 * 入力されたタグは確定された時点でカンマ区切りで結合されてhidden inputに設定される
 */
export const ItemTagsInput = ({
  name,
  suggestedTags,
  selectedTags,
  maxTags = 16,
}: Props) => {
  const initialTagNames = useMemo(
    () => selectedTags?.map((tag) => ({ text: tag.text })) ?? [],
    [selectedTags],
  );
  const [newTags, setNewTags] = useState<NewTag[]>(initialTagNames);
  const [inputValue, setInputValue] = useState("");
  const hasReachedMaxTags = newTags.length >= maxTags;

  const handleKeyDownEnter: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        // ブラウザでIME確定時のEnterキー入力をハンドリングしないようにするためにkeyCodeを確認する
        if (e.keyCode !== ENTER_KEY_CODE || e.currentTarget.value === "") {
          return;
        }
        e.preventDefault();
        const isExist = newTags.find(
          (tag) => tag.text === e.currentTarget.value,
        );
        if (isExist) {
          setInputValue("");
          return;
        }
        const newTag = {
          text: e.currentTarget.value,
        };
        setNewTags([...newTags, newTag]);
        setInputValue("");
      },
      [newTags],
    );

  const handleDelete = useCallback((tagName: string) => {
    setNewTags((prevTags) => prevTags.filter((tag) => tag.text !== tagName));
  }, []);

  const handleAdd = useCallback(() => {
    if (!inputValue || newTags.some((tag) => tag.text === inputValue)) {
      setInputValue("");
      return;
    }
    const newTag = { text: inputValue };
    setNewTags((prevTags) => [...prevTags, newTag]);
    setInputValue("");
  }, [newTags, inputValue]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      if (e.target.value.includes(",")) return;
      setInputValue(e.target.value);
    }, []);

  return (
    <div className="flex flex-col gap-3">
      <label className="">商品関連キーワード</label>
      {newTags.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {newTags.map((tag) => (
            <TagCard
              key={tag.text}
              tagText={tag.text}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      <Input
        list="tags"
        type="text"
        value={inputValue}
        placeholder="タグ名を入力してください"
        onKeyDown={handleKeyDownEnter}
        onChange={handleInputChange}
        disabled={hasReachedMaxTags}
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
      <Button onClick={handleAdd} disabled={hasReachedMaxTags}>
        タグを追加
      </Button>
      {/* Server Action用のinput */}
      <input
        type="hidden"
        name={name}
        value={newTags.map((tag) => tag.text).join(",")}
      />
    </div>
  );
};
