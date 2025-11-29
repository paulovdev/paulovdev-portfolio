import { getWork } from "@/app/(utils)/sanity-queries";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanityImage";

export default async function Page({ params }) {
  const { slug } = await params;
  const data = await getWork(slug);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-10">
      <figure className="absolute inset-0 w-screen h-screen -z-10">
        <Image
          src={urlFor(data.image).width(1920).height(1080).quality(85).url()}
          width={1920}
          height={1080}
          alt={data.title}
          className="w-full h-auto object-cover brightness-75 scale-110"
        />
      </figure>

      <div className="mt-10 text-center ">
        <h1 className="text-s text-[.8em] uppercase ">{data.title}</h1>
        <p className="text-s text-[.8em] uppercase ">{data.year}</p>
        <p className="text-s text-[.8em] uppercase ">{data.stack}</p>
      </div>
    </div>
  );
}
