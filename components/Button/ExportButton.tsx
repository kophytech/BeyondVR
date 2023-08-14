import { ExportIcon } from '@/assets/icons';
import CustomButton from './Button';

interface Props {
  onClick: () => void;
}

export default function ExportButton({ onClick }: Props) {
  return (
    <CustomButton type='button' onClick={onClick}>
      <div className='flex items-center gap-2 px-2'>
        <ExportIcon color='white' />
        <span className='text-sm capitalize'>Export</span>
      </div>
    </CustomButton>
  );
}
