import { IconProps } from '@/interfaces/iconInterface';

export function SearchIcon({ color }: IconProps) {
  return (
    <svg
      width='27'
      height='26'
      viewBox='0 0 27 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.6366 22C17.4356 22 22.1366 17.299 22.1366 11.5C22.1366 5.70101 17.4356 1 11.6366 1C5.83761 1 1.1366 5.70101 1.1366 11.5C1.1366 17.299 5.83761 22 11.6366 22Z'
        stroke={color || '#2E303D'}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M19.0615 18.925L25.1365 25'
        stroke={color || '#2E303D'}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
