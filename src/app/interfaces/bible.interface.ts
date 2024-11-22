export interface IBook {
  abbrev: {
    pt: string;
    en: string;
  };
  author: string;
  chapters: number;
  group: string;
  name: string;
  testament: string;
}

export interface IChapterDetail {
  book: IBook;
  chapter: IChapter;
  verses: IVerse[];
}

export interface IVerseDetail {
  book: IBook;
  chapter: number;
  number: number;
  text: string;
}

export interface ISearchWord {
  occurrence: number;
  version: string;
  verses: IVerse[];
}

interface IChapter {
  number: number;
  verses: number;
}

export interface IVerse {
  book: IBook;
  chapter: number;
  number: number;
  text: string;
}
