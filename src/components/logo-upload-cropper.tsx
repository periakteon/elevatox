/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createRef, useEffect, useState } from "react";

import b64toBlob from "b64-to-blob";
import Cropper, { type ReactCropperElement } from "react-cropper";

import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/refined/alert-dialog-for-cropper";

export default function LogoUploadCrop({
  value,
  isOpen,
  setImageFile,
  setValue,
  setIsOpen,
}: {
  value: string;
  isOpen: boolean;
  setImageFile: (v: File) => void;
  setIsOpen: (v: boolean) => void;
  setValue: (v: string) => void;
}) {
  const [image, setImage] = useState("");

  const [cropData, setCropData] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const cropperRef = createRef<ReactCropperElement>();

  const contentType = "image/png";

  const onChange = (
    e: React.DragEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    let files;

    if (e instanceof DragEvent && e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target instanceof HTMLInputElement && e.target.files) {
      files = e.target.files;
    }

    if (files && files.length > 0 && files[0]) {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setImage(result);
        }
      };

      reader.readAsDataURL(files[0]);
    } else {
      console.error("No valid file selected.");
    }
  };

  function isDefined<T>(value: T | undefined | null): value is T {
    return value !== undefined && value !== null;
  }

  const getCropData = () => {
    if (cropperRef?.current?.cropper) {
      const croppedCanvasData = cropperRef?.current?.cropper
        .getCroppedCanvas()
        .toDataURL()
        .split(",")[1];

      if (isDefined(croppedCanvasData)) {
        const blob = b64toBlob(croppedCanvasData, contentType);

        const cropBoxData = cropperRef.current?.cropper.getCropBoxData();
        const canvasData = cropperRef.current?.cropper.getCanvasData();

        const cropData = {
          x: cropBoxData.left - canvasData.left,
          y: cropBoxData.top - canvasData.top,
          width: cropBoxData.width,
          height: cropBoxData.height,
        };

        const blobUrl = URL.createObjectURL(blob);

        const file = new File([blob], "logo.png", { type: contentType });

        setImageFile(file);

        setCropData(cropData);
        setValue(blobUrl);
      } else {
        console.error("Cropped canvas data is undefined.");
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        if (image.length === 0) {
          setImage("");
          setValue(value);
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [image.length, isOpen, setIsOpen, setValue, value]);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle>Şirket Logosu Yükle</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col items-center">
            <Input
              className="my-4 hover:cursor-pointer"
              type="file"
              accept="image/*"
              onChange={onChange}
            />
            <div className="flex w-[300px] items-center justify-center">
              <Cropper
                ref={cropperRef}
                // aspectRatio={1 / 1}
                src={image}
                viewMode={2}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                autoCropArea={0.75}
                cropBoxResizable={true}
                guides={true}
                ready={() => {
                  if (cropData.x !== 0) {
                    cropperRef.current?.cropper.setCropBoxData({
                      height: cropData.height,
                      width: cropData.width,
                      left: cropData.x,
                      top: cropData.y,
                    });
                  }
                }}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setImage("");
              setValue(value);
              setIsOpen(false);
            }}
            disabled={image.length !== 0}
            // disabled={value.length !== 0}
          >
            İptal
          </AlertDialogCancel>
          {image.length !== 0 && (
            <AlertDialogCancel
              onClick={() => {
                setImage("");
                setValue(value);
                // setIsOpen(false);
              }}
              disabled={image.length === 0}
              // disabled={value.length === 0}
            >
              Sil
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            disabled={image.length === 0}
            // disabled={image.length === 0}
            onClick={() => {
              getCropData();
              setIsOpen(false);
            }}
          >
            Kaydet
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
