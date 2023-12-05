import { atom } from "jotai";

import { CommentWithPartialUser } from "@/repositories/listingComment";

export const commentsAtom = atom<CommentWithPartialUser[] | null>(null);
