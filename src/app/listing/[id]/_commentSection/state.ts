import { CommentWithPartialUser } from "@/services/listingComment";
import { atom } from "jotai";

export const commentsAtom = atom<CommentWithPartialUser[] | null>(null);
