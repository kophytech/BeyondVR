import { Input } from '@material-tailwind/react';
import React from 'react';

interface Props {
  name: string;
  type: React.HTMLInputTypeAttribute | undefined;
  value: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomInput({ name, type, value, onchange }: Props) {
  return (
    <Input
      label={name}
      variant={'outlined'}
      value={value}
      onChange={onchange}
      type={type}
      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    />
  );
}
