export type Folder = {
  id: string;
  name: string;
};

export type BookmarkLink = {
  id: string;
  title: string;
  url: string;
  folderId: string;
  description?: string;
  thumbnail?: string;
};

export type OgInfo = {
  url: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
};
