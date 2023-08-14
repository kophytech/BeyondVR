import ImagePlaceholder from '@/assets/images/ImagePlaceholder.png';
import Image from 'next/image';
import React from 'react';

interface Props {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: File | null;
}

export default function ImageInput({ label, onChange, value }: Props) {
  console.log(value)
  return (
    <div className='flex items-center justify-center w-full'>
      <label htmlFor='dropzone-file'>
        <Image
          src={value ? URL.createObjectURL(value) : ImagePlaceholder}
          alt={label}
          width={100}
          height={100}
          className='rounded-xl w-[100px] h-[100px] object-contain'
        />
        <input
          id='dropzone-file'
          type='file'
          className='hidden'
          accept='image/*'
          onChange={onChange}
        />
      </label>
    </div>
  );
}
