import client from "@/app/sanity/client";

export async function getAllWorks() {
  return client.fetch(
    `*[_type == "work"]{
      _id,
      title,
      year,
      site,
      stack,
      image
    }`,
    {}
  );
}
