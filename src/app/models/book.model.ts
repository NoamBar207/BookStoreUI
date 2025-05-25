export interface ITitle {
  lang: string;
  text: string;
}

export interface IBook {
  isbn: string;
  title: ITitle;
  authors: string[];
  category: string;
  cover?: string;
  price: number;
  year: number;
}
