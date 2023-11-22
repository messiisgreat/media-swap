"use client";

import { useImageModal } from "@/components/dialog";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

/**
 * 商品ページのカルーセル
 * @param images - 画像のURL一覧が含まれたオブジェクトの配列
 */
export default function Carousel({
  images,
}: {
  images: { imageURL: string }[];
}) {
  const slides = images.map((image) => image.imageURL);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const { open, ImageModal } = useImageModal(images[selectedIndex].imageURL);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
    return () => {
      emblaMainApi.off("select", onSelect);
      emblaMainApi.off("reInit", onSelect);
    };
  }, [emblaMainApi, onSelect]);

  return (
    <div className="grid w-full select-none gap-4">
      <div className="overflow-hidden" ref={emblaMainRef}>
        <div className="flex touch-pan-y">
          {slides.map((imageURL, index) => (
            <Image
              key={imageURL}
              className="mx-auto block min-w-0 flex-100"
              src={imageURL}
              alt={`商品画像-${index}`}
              width={500}
              height={500}
              onClick={open}
            />
          ))}
        </div>
        <ImageModal />
      </div>
      <div
        className="flex flex-row gap-4 overflow-x-scroll bg-black/70 py-1"
        ref={emblaThumbsRef}
      >
        {slides.map((imageURL, index) => (
          <Image
            key={imageURL}
            role="button"
            aria-label="表示画像選択"
            onClick={() => onThumbClick(index)}
            className={`block cursor-pointer touch-manipulation transition-opacity duration-200
                                ${
                                  index == selectedIndex
                                    ? "opacity-100"
                                    : "opacity-20"
                                }
                                `}
            src={imageURL}
            alt={`サムネイル-${index}`}
            width={100}
            height={100}
          />
        ))}
      </div>
    </div>
  );
}
