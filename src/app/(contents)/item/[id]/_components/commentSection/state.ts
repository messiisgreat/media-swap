import { atom } from "jotai";

import { type CommentWithPartialUser } from "@/repositories/itemComment";

export const commentsAtom = atom<CommentWithPartialUser[] | null>(null);
