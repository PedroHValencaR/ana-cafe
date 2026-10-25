import type { PortableTextBlock } from "@portabletext/react";

export type ImageDimensions = {
  width: number;
  height: number;
  aspectRatio: number;
};

export type SanityImage = {
  _type: "image";
  _key?: string;
  asset: {
    _ref: string;
    metadata?: {
      dimensions?: ImageDimensions;
    };
  };
  dimensions?: ImageDimensions;
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
};

export type Author = {
  name: string;
  role?: string;
  bio?: string;
  image?: SanityImage;
};

/** The lightweight shape of a category attached to a post. */
export type CategoryRef = {
  title: string;
  slug: string;
};

/** A full category document, used on the category index. */
export type Category = CategoryRef & {
  _id?: string;
  description?: string;
  postCount?: number;
};

export type CategoryDetail = Category & {
  posts: Post[];
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  mainImage?: SanityImage;
  categories?: CategoryRef[];
};

export type PostDetail = Post & {
  body: PortableTextBlock[];
  author?: Author;
};
