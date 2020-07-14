import React, { ChangeEvent, PropsWithChildren, RefObject } from "react";

type useImageLoadT = {
  image: string;
  onLoad: (state: boolean) => void;
  onRemove: () => void;
  id: string;
  imageLoadLabelRef: any;
};
type LabelT = { className?: string };
type LoadedImageT = { className?: string };

export default function useLoadImage({
  image,
  onLoad,
  onRemove,
  id,
  imageLoadLabelRef,
}: useImageLoadT) {
  const loadImage = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onload = () => {
        onLoad(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };
  const deleteImage = () => {
    onRemove();
  };

  const ImageInput = ({ className }: { className: string }) => (
    <input
      type="file"
      accept="image/*"
      id={id}
      className={className}
      onChange={loadImage}
    />
  );

  const Label = ({
    children,
    className,
  }: PropsWithChildren<LabelT>): JSX.Element => (
    <label ref={imageLoadLabelRef} htmlFor={id} className={className}>
      {children}
    </label>
  );

  const LoadedImage = ({ className }: LoadedImageT): JSX.Element => (
    <img src={image} alt={id} className={className} />
  );

  return { deleteImage, ImageInput, Label, LoadedImage };
}
