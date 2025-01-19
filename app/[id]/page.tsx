import Image from 'next/image'

export default async function Work({ params } : { params: { id: string } }) {
  const id = (await params).id
  const data = await fetch(`https://api.smk.dk/api/v1/art/search/?keys=${id}&fields=object_number,titles,colors,image_thumbnail,production,production_date&filters=[has_image:true],[object_names:maleri],[public_domain:true]&offset=0&rows=1`)
  const object = await data.json()
  const items = object.items[0]
  console.log(object)

  return (
    <div className="h-dvh flex flex-col justify-center items-center gap-[1rem]">
      <div className="relative w-[30rem] max-w-[90vw] aspect-square">
        <Image src={object.items[0].image_thumbnail} fill className="object-contain" sizes="50vw" alt="" />
      </div>

      <div className="text-center">
        <h1 className="text-white text-[2rem] ">{items.titles[0].title}</h1>
        <h1 className="text-white">{items.production[0].creator}</h1>
        <h1 className="text-white">{items.production_date[0].period}</h1>
      </div>

      <div className="flex justify-center gap-[1rem] flex-wrap">
        {items.colors.map((color: string) => (
          <div key={color} style={{backgroundColor: color}} className="flex justify-center items-center w-[6rem] h-[6rem] rounded-[1rem] transition-all text-transparent hover:text-white">
            <div className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-bold">{color}</div>
          </div>
        ))}
      </div>

    </div>
  )
}