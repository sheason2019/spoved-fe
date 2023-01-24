import { atom } from "jotai";

export interface IUser {
  username: string;
}

export const currentUserAtom = atom<IUser | null>(null);

export const currentToken = atom<string | null>(null);
