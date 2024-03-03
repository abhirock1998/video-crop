import { PropsWithChildren, forwardRef } from "react";
import { SpringValue, animated } from "@react-spring/web";
import UploadFile from "./UploadFile";

type Props = PropsWithChildren<{
  isOverlayVisible?: boolean;
  className: string;
  imageFile: File | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cropAreaDimensions: CropAreaDimensions;
  dragProps: any;
  resizeRef: React.MutableRefObject<HTMLDivElement | null>;
}>;

type CropAreaDimensions = {
  x: SpringValue<number>;
  y: SpringValue<number>;
  width: SpringValue<number>;
  height: SpringValue<number>;
};

const GestureVideo = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const shouldDisplayUpload = props.imageFile === null;
  return (
    <div ref={ref} className={`relative ${props.className}`}>
      {props.isOverlayVisible && (
        <div className="absolute top-0 left-0 w-full h-full bottom-0 right-0 bg-overlay">
          {shouldDisplayUpload ? (
            <div className="flex justify-center items-center h-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center md:w-64 md:h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-700"
              >
                <UploadFile />
                <input
                  onChange={props.onImageUpload}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          ) : (
            <animated.div
              className="border border-white cursor-move relative"
              style={props.cropAreaDimensions}
              {...props.dragProps()}
            >
              {props.imageFile && (
                <img
                  src={URL.createObjectURL(props.imageFile)}
                  alt="selected-profile"
                  className="w-full h-full object-cover pointer-events-none"
                />
              )}
              <div
                ref={props.resizeRef}
                className="absolute -right-1 -bottom-1 p-2 bg-white block rounded-full cursor-se-resize shadow-2xl"
              />
            </animated.div>
          )}
        </div>
      )}
      {props.children}
    </div>
  );
});

export default GestureVideo;
