import Image from 'next/image'
import { GetServerSideProps } from 'next'

interface Params {
  id: string;
}

interface WorkProps {
  item: {
    titles: { title: string }[];
    colors: string[];
    image_thumbnail: string;
    production: { creator: string }[];
    production_date: { period: string }[];
  };
}

const Work = ({ item }: WorkProps) => {
  return (
    <div className="h-dvh flex flex-col justify-center items-center gap-[1rem]">
      <div className="relative w-[30rem] max-w-[90vw] aspect-square">
        <Image
          src={item.image_thumbnail}
          fill
          className="object-contain"
          sizes="50vw"
          alt=""
        />
      </div>

      <div className="text-center">
        <h1 className="text-white text-[2rem]">{item.titles[0].title}</h1>
        <h1 className="text-white">{item.production[0].creator}</h1>
        <h1 className="text-white">{item.production_date[0].period}</h1>
      </div>

      <div className="flex justify-center gap-[1rem] flex-wrap">
        {item.colors.map((color: string) => (
          <div
            key={color}
            style={{ backgroundColor: color }}
            className="flex justify-center items-center w-[6rem] h-[6rem] rounded-[1rem] transition-all text-transparent hover:text-white"
          >
            <div className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-bold">
              {color}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as Params; // Accessing params directly
  const response = await fetch(
    `https://api.smk.dk/api/v1/art/search/?keys=${id}&fields=object_number,titles,colors,image_thumbnail,production,production_date&filters=[has_image:true],[object_names:maleri],[public_domain:true]&offset=0&rows=1`
  );
  const object = await response.json();
  const item = object.items[0];

  return {
    props: {
      item,
    },
  };
};

export default Work;
