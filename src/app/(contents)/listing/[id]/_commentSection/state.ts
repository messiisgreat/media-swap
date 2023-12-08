import { atom } from "jotai";

import { type CommentWithPartialUser } from "@/repositories/listingComment";

export const commentsAtom = atom<CommentWithPartialUser[] | null>(null);
