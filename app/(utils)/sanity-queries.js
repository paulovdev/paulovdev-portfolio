import client from "@/app/sanity/client";

export async function getAllWorks() {
  return client.fetch(
    `*[_type == "work"]{
      _id,
      title,
      year,
      site,
      stack,
      image,
      "slug": slug.current
    }`
  );
}
export async function getWork(slug) {
  return client.fetch(
    `*[_type == "work" && slug.current == $slug][0]{
      _id,
      title,
      year,
      site,
      stack,
      image,
      "slug": slug.current
    }`,
    { slug }
  );
}
