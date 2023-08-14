import { IconProps } from '@/interfaces/iconInterface';

export function CourseIcon({ color,w,h  }: IconProps) {
  return (
    <svg
    width={w||"26"}
    height={h || "29"}
      viewBox='0 0 26 29'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M25.25 23.0602V2.06018C25.25 1.09287 24.4673 0.310181 23.5 0.310181H5.125V22.6227V23.9352H23.5V27.4352H3.375C2.40856 27.4352 1.625 26.6516 1.625 25.6852C1.625 24.7187 2.40856 23.9352 3.375 23.9352H4.25V22.6227V0.310181H2.5C1.53269 0.310181 0.75 1.09287 0.75 2.06018V25.6852C0.75 27.1346 1.92556 28.3102 3.375 28.3102H24.8125C25.0544 28.3102 25.25 28.1146 25.25 27.8727C25.25 27.6307 25.0544 27.4352 24.8125 27.4352H24.375V23.9352C24.858 23.9352 25.25 23.5432 25.25 23.0602ZM9.0625 6.43518H14.3125C14.5544 6.43518 14.75 6.63074 14.75 6.87268C14.75 7.11462 14.5544 7.31018 14.3125 7.31018H9.0625C8.82056 7.31018 8.625 7.11462 8.625 6.87268C8.625 6.63074 8.82056 6.43518 9.0625 6.43518ZM17.375 12.5602H9.0625C8.82056 12.5602 8.625 12.3646 8.625 12.1227C8.625 11.8807 8.82056 11.6852 9.0625 11.6852H17.375C17.6169 11.6852 17.8125 11.8807 17.8125 12.1227C17.8125 12.3646 17.6169 12.5602 17.375 12.5602ZM20.4375 9.93518H9.0625C8.82056 9.93518 8.625 9.73962 8.625 9.49768C8.625 9.25574 8.82056 9.06018 9.0625 9.06018H20.4375C20.6794 9.06018 20.875 9.25574 20.875 9.49768C20.875 9.73962 20.6794 9.93518 20.4375 9.93518Z'
        fill={color || '#45484E'}
      />
    </svg>
  );
}
