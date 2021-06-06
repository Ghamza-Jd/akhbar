export interface News {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  viewedAt?: number;
}

export interface Source {
  id: string;
  name: string;
}

export type { RootStateType } from './app/store/rootReducer';
