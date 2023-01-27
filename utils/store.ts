import create from "zustand";
import { DomainOne } from "./persona";

export enum ChatType {
  BOT = "bot",
  USER = "user",
  LOADING = "loading",
}

export type ChatInputType = {
  text: string | string[];
  type?: ChatType;
  questionKey?: string;
  saved?: any;
  query?: string; // input of user, only exist when bot.
  job: DomainOne;
  id?: number | string | undefined;
};

export type UserType = {
  displayName: string;
  photoURL: string;
  email: string;
  uid: string;
};

export type UserState = {
  darkMode: boolean;
  chats: ChatInputType[];
  job: DomainOne | undefined;
  user: UserType | undefined;
  setChats: (by: ChatInputType[]) => void;
  setDarkMode: (by: boolean) => void;
  setJob: (by: DomainOne) => void;
  setUser: (by: UserType) => void;
};

export const useChatStore = create<UserState>((set) => ({
  darkMode: false,
  chats: [],
  job: undefined,
  user: undefined,
  setChats: (by) => {
    set((state) => ({ ...state, chats: by }));
  },
  setDarkMode: (by) => {
    set((state) => ({ ...state, darkMode: by }));
  },
  setJob: (by) => {
    set((state) => ({ ...state, job: by }));
  },
  setUser: (by) => {
    set((state) => ({ ...state, user: by }));
  },
}));
