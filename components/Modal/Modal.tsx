import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import BackButton from '../Button/BackButton';

interface Props {
  title?: string;
  open: boolean;
  handler: () => void;
  children: React.ReactNode;
}

export default function Modal({ title, open, handler, children }: Props) {
  return (
    <Dialog open={open} handler={handler} size={'xl'} className='p-5' >
      <DialogHeader className='pb-0'>
        <BackButton onClick={handler} />
        <h3 className='text-2xl font-light text-bw-black-200 ps-2'>{title}</h3>
      </DialogHeader>
      <DialogBody>{children}</DialogBody>
      <Toaster />
    </Dialog>
    // *323*4#
  );
}
