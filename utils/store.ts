import create from "zustand";
import { DomainOne } from "./persona";

export enum ChatType {
  BOT = "bot",
  USER = "user",
  LOADING = "loading",
}

export type UserChatType = {
  createdAt: number;
  text: string | string[];
  type: ChatType;
  job: DomainOne;
  id: number | string | undefined;
};

export type WebLink = {
  link: string;
  title: string;
  snippet: string;
};

export type SavedChatType = {
  questionKey?: string;
  saved?: any;
  asked?: "no" | "finding" | "found";
  query?: string; // input of user, only exist when bot.
  webLinks?: WebLink[];
  displayName?: string;
  email?: string;
  photoURL?: string;
  uid?: string;
  option?: number;
} & UserChatType;

export type UserType = {
  displayName: string;
  photoURL: string;
  email: string;
  uid: string;
};

export type QueryType = {
  query: string;
  domain: DomainOne;
};

export type UserState = {
  darkMode: boolean;
  chats: SavedChatType[];
  job: DomainOne | undefined;
  user: UserType | undefined;
  queries: QueryType[];
  isLoggedIn: boolean;
  setChats: (by: SavedChatType[]) => void;
  setDarkMode: (by: boolean) => void;
  setJob: (by: DomainOne) => void;
  setUser: (by: UserType) => void;
  setQueries: (by: QueryType[]) => void;
  setIsLoggedIn: (by: boolean) => void;
};

export const useChatStore = create<UserState>((set) => ({
  darkMode: false,
  chats: [],
  job: DomainOne.SCIENCE,
  user: undefined,
  queries: [],
  isLoggedIn: false,
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
  setQueries: (by) => {
    set((state) => ({ ...state, queries: by }));
  },
  setIsLoggedIn: (by) => {
    set((state) => ({ ...state, isLoggedIn: by }));
  },
}));
