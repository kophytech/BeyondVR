import { IconProps } from '@/interfaces/iconInterface';

export function ExportIcon({ color }: IconProps) {
  return (
    <svg
      width='21'
      height='18'
      viewBox='0 0 21 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.8564 0.568359V6.5909H20.8789V17.4315H7.62929V10.2044H2.73536L5.64667 13.1157L4.79388 13.9673L0.429932 9.6034L4.79388 5.23824L5.64667 6.08983L2.73536 8.99993H7.62929V0.568359H14.8564ZM14.8564 8.99993H8.83381V10.2044H14.8564V8.99994L14.8564 8.99993Z'
        fill={color || '#45484E'}
      />
    </svg>
  );
}
