import { IconProps } from '@/interfaces/iconInterface';

export function StatIcon({ color,w,h  }: IconProps) {
  return (
    <svg
    width={w||"27"}
    height={h || "27"}
      viewBox='0 0 27 27'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.2619 13.4404V0.511856C20.1177 1.13097 25.5714 6.58468 26.1905 13.4404H13.262L13.2619 13.4404ZM24.1078 15.5275H12.2014C11.6008 15.5275 11.1139 15.0407 11.1139 14.4401V2.53289C5.01862 3.08307 0.239807 8.20051 0.239807 14.4393C0.239807 21.0457 5.59639 26.4009 12.2014 26.4009C18.4402 26.4009 23.5583 21.6235 24.1078 15.5275V15.5275Z'
        fill={color || '#45484E'}
      />
    </svg>
  );
}
