export interface Track {
  id: string;
  uri: string;

  name: string;

  album: any;
  external_ids: { isrc: string };
}

export interface Playlist {
  href: string;
  id: string;

  name: string;
  description: string;

  images: Array<{
    height: number;
    width: number;
    url: string;
  }>;

  tracks: {
    total: number;
    href: string;
    items: { track: Track }[];
  };
}
