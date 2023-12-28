"use client";

import { atom, useAtomValue, useSetAtom } from "jotai";
import { memo, useCallback, useLayoutEffect, type ReactNode } from "react";

type ModalAtom = ReturnType<typeof atom<JSX.Element>>;

const modalAtomsAtom = atom<ModalAtom[]>([]);

const AtomModal = memo(({ atom }: { atom: ModalAtom }) => useAtomValue(atom));

AtomModal.displayName = "AtomModal";

/**
 * モーダルを表示するために必要なコンポーネントを返す
 */
const useModalContainer = () => {
  const modalsAtom = useAtomValue(modalAtomsAtom);
  const Modals = useCallback(
    () => (
      <>
        {modalsAtom.map((modalAtom, i) => (
          <AtomModal key={i} atom={modalAtom} />
        ))}
      </>
    ),
    [modalsAtom],
  );

  return Modals;
};

/**
 * モーダルの骨組みを提供するコンポーネント    \
 * レイアウト下部に固定する
 */
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const Modals = useModalContainer();
  return (
    <>
      {children}
      <Modals />
    </>
  );
};

/**
 * モーダル呼び出し用コンポーネントをグローバルステートに登録する    \
 * モーダルのクリックは初期描画終了後にしか行われないため、useLayoutEffectを利用して登録する
 * @param Modal モーダルのコンポーネント
 */
export const useSetModal = (Modal: JSX.Element): void => {
  const setModal = useSetAtom(modalAtomsAtom);
  useLayoutEffect(() => {
    setModal((prev) => [...prev, atom(Modal)]);
    return () => {
      setModal((prev) => prev.slice(0, -1));
    };
  }, [Modal, setModal]);
};
