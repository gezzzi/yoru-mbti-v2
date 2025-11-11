import groq from "groq";

export const blogPostListQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    thumbnail,
    "author": author->{
      _id,
      name,
      role,
      bio,
      avatar
    },
    "tags": tags[]->{
      _id,
      title,
      "slug": slug.current,
    }
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    thumbnail,
    content,
    "author": author->{
      _id,
      name,
      role,
      bio,
      avatar
    },
    "tags": tags[]->{
      _id,
      title,
      "slug": slug.current,
    }
  }
`;

export const blogPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`;
