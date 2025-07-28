import Image from "next/image";
import React from "react";

type StackedImageProps = {
  images: string[]; // Array of image URLs
  topIndex?: number; // Index of image to show on top
  offsetX?: number; // Horizontal offset between images
  offsetY?: number; // Vertical offset between images
  imageWidth?: number; // Width of each image
  imageHeight?: number; // Height of each image
};

const StackedImage: React.FC<StackedImageProps> = React.memo(function StackedImage({
  images,
  topIndex = 0,
  offsetX = 16,
  offsetY = 16,
  imageWidth = 1000,
  imageHeight = 800,
}) {
  const balancerX = -offsetX * images.length / 2;
  const balancerY = -offsetY * images.length / 2;

  const reorderedImages = React.useMemo(() => {
    if (typeof topIndex === "number" && topIndex >= 0 && topIndex < images.length) {
      const topImage = images[topIndex];
      const restImages = images.filter((_, idx) => idx !== topIndex);
      return [topImage, ...restImages];
    }
    return images;
  }, [images, topIndex]);
  
  return (
    <div
      className="flex relative justify-center items-center w-full h-full"
    >
      <div className="flex" 
      style={{
        position: "relative",
        width: imageWidth,
      }}>
        {reorderedImages.map((img, i) => (
          <Image
            key={i}
            
            src={img}
            alt={`stacked-img-${i}`}
            width={imageWidth} // Default width, can be adjusted
            height={imageHeight} // Default height, can be adjusted
            priority
            style={{
              position: "relative",
              left: (-imageWidth * i + 1) + balancerX + offsetX * i,
              top: balancerY + offsetY * i,
              zIndex: images.length - i,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
            }}
          />
        ))}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (nextProps.images.length === prevProps.images.length &&
          nextProps.topIndex === prevProps.topIndex);
});

export default StackedImage;