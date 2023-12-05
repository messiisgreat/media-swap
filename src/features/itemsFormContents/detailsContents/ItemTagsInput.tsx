import { useCallback, useEffect, useMemo, useState } from "react";

import { Tag } from "@prisma/client";
import { IoClose, IoPricetagOutline } from "react-icons/io5";

import { Button } from "@/ui";
import { Input } from "@/ui/form";

type Props = {
  name: string;
  suggestedTags: Tag[];
  selectedTags?: Tag[];
};

type NewTag = Omit<Tag, "id" | "createdAt">;

/**
 * タグを入力するコンポーネント
 * formから認識できるようにhidden inputに値を設定している
 * @param Props.name  formのname属性
 * @param {Tag[]} Props.suggestedTags データベースから取得したタグの配列
 * @returns JSX.Element
 */
export function ItemTagsInput({ name, suggestedTags, selectedTags }: Props) {
  const selectedTagNames = useMemo(() => {
    return (
      selectedTags?.map((tag) => {
        return {
          text: tag.text,
        };
      }) ?? []
    );
  }, [selectedTags]);
  const [newTags, setNewTags] = useState<Array<NewTag>>([]);
  const [inputValue, setInputValue] = useState("");

  const onKeyDownEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // ブラウザでIME確定時のEnterキー入力をハンドリングしないようにするためにkeyCodeを確認する
      if (e.keyCode !== 13 || e.currentTarget.value === "") {
        return;
      }

      const isExist = newTags.find((tag) => tag.text === e.currentTarget.value);
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
    [newTags, setNewTags],
  );

  const onClickDelete = useCallback(
    (tagName: string) => {
      setNewTags(newTags.filter((tag) => tag.text !== tagName));
    },
    [newTags, setNewTags],
  );

  const onClickAdd = useCallback(() => {
    if (!inputValue) {
      return;
    }

    const isExist = newTags.find((tag) => tag.text === inputValue);
    if (isExist) {
      setInputValue("");
      return;
    }

    const newTag = {
      text: inputValue,
    };
    setNewTags([...newTags, newTag]);
    setInputValue("");
  }, [setNewTags, newTags, inputValue, setInputValue]);

  useEffect(() => {
    setNewTags(selectedTagNames);
  }, [selectedTagNames, setNewTags]);
  return (
    <div className="flex flex-col gap-3">
      {newTags.length > 0 && (
        <div>
          <label className="text-sm text-neutral-400">Tags</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {newTags.map((tag) => (
              <span
                key={tag.text}
                className="flex w-full items-center justify-between rounded-md border border-primary bg-white px-3 py-2 shadow-md"
              >
                <span className="flex items-center justify-start gap-2">
                  <IoPricetagOutline />
                  <p className="text-sm">{tag.text}</p>
                </span>
                <span
                  data-testid="delete"
                  onClick={() => onClickDelete(tag.text)}
                  className="cursor-pointer"
                >
                  <IoClose />
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
        value={inputValue}
        placeholder="タグ名を入力してください"
        onKeyDown={(e) => {
          onKeyDownEnter(e);
        }}
        onChange={(e) => {
          setInputValue(e.target.value);
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
      <Button onClick={() => onClickAdd()}>タグを追加</Button>
      {/* Server Action用のinput */}
      <Input
        type="hidden"
        name={name}
        value={newTags.map((tag) => tag.text).join(",")}
      />
    </div>
  );
}
