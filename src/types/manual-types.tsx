export type Page = {
  name: string;
  imgURL: File;
  filename: string;
  stepFrom: number;
  stepTo: number;
};

export type Manual = {
  name: string;
  pages: Page[];
};