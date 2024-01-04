"use client";

import { useCallback, useRef, useState } from "react";

import { SlideImage } from "@/app/(contents)/item/[id]/_components/carousel/SlideImage";
import { SoldOutBadge } from "@/features/itemsList/SoldOutBadge";
import { useImageModal } from "@/ui/modal/useImageModal";
import Image from "next/image";

/**
 * 商品ページのカルーセル
 * @param images - 画像のURL一覧が含まれたオブジェクトの配列
 */
export const Carousel = ({
  images,
  isSoldOut,
}: {
  images: { imageURL: string }[];
  isSoldOut: boolean;
}) => {
  const slides = images.map((image) => image.imageURL);
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>, index: number) => {
      setSelectedIndex(index);

      const container = containerRef.current;
      const element = e.target as HTMLElement;
      const elementLeft = element.offsetLeft;
      const elementWidth = element.offsetWidth;
      const containerWidth = container?.offsetWidth;
      const scrollWidth = container?.scrollWidth;

      const image = imageRef.current;
      const imageWidth = image?.offsetWidth;

      if (imageWidth) {
        const imageScrollLeft = index * imageWidth;
        const style = image.getAttribute("style");
        image.setAttribute(
          "style",
          `${style} transform:translateX(${-imageScrollLeft}px)`,
        );
      }

      if (containerWidth && elementWidth && elementLeft && scrollWidth) {
        const lenOfSlides = slides.length;
        const gap =
          (scrollWidth % (elementWidth * lenOfSlides)) / (lenOfSlides + 1);
        const padding = elementLeft - index * (elementWidth + gap) - gap;
        const scrollLeft =
          elementLeft - padding - containerWidth / 2 + elementWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    },
    [slides.length],
  );

  const { handleOpen } = useImageModal(images[selectedIndex]?.imageURL || "");

  return (
    <div className="grid w-full select-none gap-4">
      <div className="relative overflow-hidden">
        <div className="flex touch-pan-y" ref={imageRef}>
          {slides.map((imageURL, index) => (
            <Image
              key={imageURL}
              className="mx-auto block min-w-0 flex-100"
              src={imageURL}
              alt={`商品画像-${index}`}
              width={500}
              height={500}
              onClick={handleOpen}
            />
          ))}
        </div>
        {isSoldOut && (
          <SoldOutBadge
            className="absolute top-0 h-28 w-28"
            spanClassName="text-lg py-3"
          />
        )}
      </div>
      <div
        className="flex flex-row gap-4 overflow-x-scroll bg-black/70 px-4 py-1"
        ref={containerRef}
      >
        {slides.map((imageURL, index) => (
          <SlideImage
            key={imageURL}
            index={index}
            selected={index == selectedIndex}
            src={imageURL}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};
