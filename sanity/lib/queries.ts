import { defineQuery } from "next-sanity";

const postFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage{
    ...,
    "alt": coalesce(alt, ""),
    "dimensions": asset->metadata.dimensions
  },
  "categories": categories[]->{ title, "slug": slug.current }
`;

export const postsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...9] {
    ${postFields}
  }
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body[]{
      ...,
      _type == "image" => {
        ...,
        "alt": coalesce(alt, ""),
        "dimensions": asset->metadata.dimensions
      }
    },
    "author": author->{
      name,
      role,
      bio,
      image{
        ...,
        "alt": coalesce(alt, "")
      }
    }
  }
`);

export const postSlugsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)][].slug.current
`);

export const categoriesQuery = defineQuery(`
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "postCount": count(*[
      _type == "post" &&
      references(^._id) &&
      defined(slug.current)
    ])
  }
`);

export const categoryBySlugQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    "posts": *[
      _type == "post" &&
      references(^._id) &&
      defined(slug.current)
    ] | order(publishedAt desc) {
      ${postFields}
    }
  }
`);

export const categorySlugsQuery = defineQuery(`
  *[_type == "category" && defined(slug.current)][].slug.current
`);
