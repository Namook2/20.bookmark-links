export type Folder = {
  id: string;
  name: string;
};

export type BookmarkLink = {
  id: string;
  title: string;
  url: string;
  folderId: string | null;
  description?: string;
  thumbnail?: string;
};

export type OgInfo = {
  url: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
};

export type FolderRow = {
  id: number;
  name: string;
};

export type LinkRow = {
  id: string;
  title: string;
  url: string;
  folder_id: number | null;
  description: string | null;
  thumbnail: string | null;
};
