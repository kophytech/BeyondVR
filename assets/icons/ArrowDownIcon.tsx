import { IconProps } from '@/interfaces/iconInterface';

export function ArrowDownIcon({ color }: IconProps) {
  return (
    <svg
      width='12'
      height='6'
      viewBox='0 0 13 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M18.5645 0.0463562H2.92866C1.03348 0.0463562 -0.0289232 1.9491 1.142 3.24619L8.95989 11.907C9.86837 12.9138 11.6222 12.9138 12.5332 11.907L20.3511 3.24367C21.522 1.9491 20.4596 0.0463562 18.5645 0.0463562Z'
        fill={color || '#45484E'}
      />
    </svg>
  );
}
