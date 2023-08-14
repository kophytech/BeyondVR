import { IconProps } from '@/interfaces/iconInterface';

export function ImportIcon({ color }: IconProps) {
  return (
    <svg
      width='25'
      height='23'
      viewBox='0 0 25 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M19.8388 1.16272C19.4632 0.788475 19.0135 0.521753 18.5248 0.351386V5.72905H23.9024C23.7321 5.24031 23.4667 4.79065 23.0911 4.41641L19.8388 1.16272ZM17.1283 7.12465V0.142479H5.95683V11.314H0.371094V12.7104H5.95684V22.4855H24.1105V7.12466L17.1283 7.12465ZM11.3387 17.0729L10.3514 16.0856L13.7252 12.7104H7.35327V11.314H13.7252L10.3514 7.94018L11.3387 6.95289L16.398 12.0122L11.3387 17.0729V17.0729Z'
        fill={color || '#45484E'}
      />
    </svg>
  );
}
