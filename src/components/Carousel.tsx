'use client'

import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
// import { transformCloudinaryURL } from '@/utils/transformCloudinaryURL';
import "./Carousel.css";

const OPTIONS: EmblaOptionsType = {}

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
    <div className="embla">
    <div className="embla__viewport" ref={emblaMainRef}>
      <div className="embla__container">
        {slides.map((index) => (
          <div className="embla__slide" key={index}>
            <div className="embla__slide__number">
              <span>{index + 1}</span>
            </div>
            <img
              className="embla__slide__img"
              src={images.images[index].imageURL}
              alt="Your alt text"
            />
          </div>
        ))}
      </div>
    </div>

    <div className="embla-thumbs">
      <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
        <div className="embla-thumbs__container">
          {slides.map((index) => (
            <div
              className={'embla-thumbs__slide'.concat(
                index == selectedIndex ? ' embla-thumbs__slide--selected' : ''
              )}
            >
              <button
                onClick={() => onThumbClick(index)}
                className="embla-thumbs__slide__button"
                type="button"
              >
                <div className="embla-thumbs__slide__number">
                  <span>{index + 1}</span>
                </div>
                <img
                  className="embla-thumbs__slide__img"
                  src={images.images[index].imageURL}
                  // src={transformCloudinaryURL(images.images[index].imageURL, 500, 500, '031e2b')}
                  alt="Your alt text"
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
