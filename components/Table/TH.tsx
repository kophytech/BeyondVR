import { ArrowDownIcon } from '@/assets/icons';

interface Props {
  text: string;
}

export default function TH({ text }: Props) {
  return (
    <th className='font-light py-7 text-left first:ps-4'>
      <div className='inline-flex items-center mr-2 md:mr-0'>
        {text} <ArrowDownIcon color='white' />
      </div>
    </th>
  );
}
