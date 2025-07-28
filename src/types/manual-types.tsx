export type Page = {
  name: string;
  imgURL: string;
  filename: string;
  stepFrom: number;
  stepTo: number;
};

export type Manual = {
  name: string;
  pages: Page[];
};