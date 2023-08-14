import { Button } from '@material-tailwind/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  gray?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export default function CustomButton({
  children,
  type,
  gray,
  onClick,
  disabled,
}: Props) {
  return (
    <Button
      type={type}
      fullWidth
      className={`${
        gray ? 'bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded' : 'bg-gray-700'
      } p-3 font-normal`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
