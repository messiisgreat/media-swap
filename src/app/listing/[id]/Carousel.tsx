'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'

const OPTIONS: EmblaOptionsType = {}

/**
 * 商品ページのカルーセル
 * @param images - Cloudinaryから取得した画像のURL
 */
export default function Carousel( images : { images: { imageURL: string; }[]; }
) {

  const SLIDE_COUNT = images.images.length
  const slides = Array.from(Array(SLIDE_COUNT).keys())
  const options = OPTIONS 
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className="w-full">
    <div className="overflow-hidden" ref={emblaMainRef}>
      <div className="flex touch-pan-y">
        {slides.map((index) => (
          <div className="relative min-w-0 flex-100" key={index}>
            <div className="opacity-0">
              <span>{index + 1}</span>
            </div>
            <Image
              className="mx-auto block"
              src={images.images[index].imageURL}
              alt="Your alt text"
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>

    <div className="mt-[8px]">
      <div className="overflow-hidden bg-[#333] py-1" ref={emblaThumbsRef}>
        <div className="flex flex-row">
          {slides.map((index) => (
            <div
              key={index}
              className={'relative min-w-0 flex-28 px-[12px]'}
            >
              <button
                onClick={() => onThumbClick(index)}
                className={`
                ${"block cursor-pointer touch-manipulation transition-opacity duration-200"}
                ${index == selectedIndex ? 'opacity-100' : 'opacity-20'}
                `}
                type="button"
              >
                <div className="absolute">
                  <span className=' opacity-0' >{index + 1}</span>
                </div>
                <Image
                  className="block object-cover"
                  src={images.images[index].imageURL}
                  alt="Your alt text"
                  width={50}
                  height={50}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}
