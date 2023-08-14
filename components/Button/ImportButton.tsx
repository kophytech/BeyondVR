import { ImportIcon } from '@/assets/icons';
import Button from './Button';

interface Props {
  onClick: () => void;
}

export default function ImportButton({ onClick }: Props) {
  return (
    <Button type='button' onClick={onClick}>
      <div className='flex items-center gap-2 px-2'>
        <ImportIcon color='white' />
        <span className='text-sm capitalize'>Import</span>
      </div>
    </Button>
  );
}
