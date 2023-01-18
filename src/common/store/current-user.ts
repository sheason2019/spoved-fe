import {atom} from "jotai";

export interface IUser {
  userId: number;
  username: string;
}

export const currentUserAtom = atom<IUser | undefined>(undefined);
