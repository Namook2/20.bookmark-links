export type Folder = {
  id: string;
  name: string;
  count: number;
};

export type BookmarkLink = {
  id: string;
  title: string;
  url: string;
  folderId: string;
  description?: string;
};
