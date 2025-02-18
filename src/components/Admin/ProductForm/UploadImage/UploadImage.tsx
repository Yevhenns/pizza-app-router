import { UseFormSetValue } from 'react-hook-form';
import { toast } from 'react-toastify';

import { CldUploadWidget } from 'next-cloudinary';

import { Button } from '@/components/shared/Button/Button';

type UploadImageProps = {
  setValue: UseFormSetValue<ProductCreateDto>;
};
export function UploadImage({ setValue }: UploadImageProps) {
  return (
    <CldUploadWidget
      uploadPreset="nostra"
      options={{
        cropping: true,
        croppingCoordinatesMode: 'custom',
        showSkipCropButton: false,
        croppingAspectRatio: 1,
        multiple: false,
      }}
      onError={() => {
        toast.error('Сталася помилка');
      }}
      onSuccess={result => {
        typeof result.info === 'object' &&
          setValue('photo', result.info.secure_url);
      }}
    >
      {({ open }) => {
        return <Button onClick={() => open()}>Завантажити фото</Button>;
      }}
    </CldUploadWidget>
  );
}
