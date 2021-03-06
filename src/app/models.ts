export interface Track {
  id: string;
  uri: string;

  name: string;

  album: any;
  external_ids: { isrc: string };
  external_urls: { spotify: string };
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
    next: string | null;
  };

  external_urls: {
    spotify: string;
  };
}

export interface Profile {
  display_name: string;
  email: string;
  id: string;
}
