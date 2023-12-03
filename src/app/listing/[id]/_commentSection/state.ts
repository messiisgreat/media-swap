import { CommentWithPartialUser } from "@/repositories/listingComment";
import { atom } from "jotai";

export const commentsAtom = atom<CommentWithPartialUser[] | null>(null);
