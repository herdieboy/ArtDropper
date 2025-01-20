"use client"

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface items {
  titles: string[],
  object_number: string,
  image_thumbnail: string,
  colors: string,
}

async function getArtworks( query: string ) {
  const search = query === "" ? "*" : query
  console.log(search)
  const data = await fetch(`https://api.smk.dk/api/v1/art/search/?keys=${search}&fields=object_number,titles,colors,image_thumbnail&filters=[has_image:true],[object_names:maleri],[public_domain:true]&offset=0&rows=30`, { cache: 'force-cache',})
  const object = await data.json()
  console.log(search)

  return object
}

export default function Page() {
  const [query, setQuery] = useState('')
  const [artworks, setArtworks] = useState<{ items: items[] } | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getArtworks(query)
      setArtworks(result)
    }
    fetchData()
  }, [query])

  return (
    <div className="mt-[1rem] text-white text-center">
      <div>
        <input 
          type="text" 
          className="bg-black border rounded-full px-[1rem] py-[0.5rem] w-[20rem] max-w-full mx-[1rem]" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Søg..."
        />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1rem] p-[1rem] text-white">
        {artworks && artworks.items.map((item: items) => (
          <li key={item.object_number}>
            <a href={`/${item.object_number}`} className="relative flex w-full aspect-square rounded-[1rem] overflow-hidden group bg-slate-800">
              <Image className="object-cover group-hover:scale-110 transition-all" placeholder="empty" src={item.image_thumbnail} fill sizes="(max-width: 640px) 100vw, (max-width: 770px) 50vw, (max-width: 1024px) 30vw, 20vw" alt={item.titles[0]} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}