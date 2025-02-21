"use client";

interface ImageFrameProps {
  src: string;
  top?: number;
  left?: number;
}

const ImageFrame = ({ src, top, left }: ImageFrameProps) => {
  return (
    <img
      src={src}
      alt="frame"
      style={{
        top: `${top ?? 0}px`,
        left: `${left ?? 0}px`,
      }}
      className={`absolute w-full h-full pointer-events-none`}
    />
  );
};

export default ImageFrame;
