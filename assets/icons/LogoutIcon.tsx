import { IconProps } from '@/interfaces/iconInterface';

export function LogoutIcon({ color }: IconProps) {
  return (
    <svg
      width='22'
      height='22'
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M21.2484 11.9336L16.6547 16.5274C16.4867 16.6879 16.2636 16.7779 16.0312 16.7789C15.9186 16.7792 15.807 16.7569 15.7031 16.7133C15.5418 16.6481 15.4036 16.5362 15.3062 16.392C15.2088 16.2479 15.1566 16.0779 15.1562 15.9039V12.1852H8.375C8.14294 12.1852 7.92038 12.093 7.75628 11.9289C7.59219 11.7648 7.5 11.5422 7.5 11.3102C7.5 11.0781 7.59219 10.8556 7.75628 10.6915C7.92038 10.5274 8.14294 10.4352 8.375 10.4352H15.1562V6.71643C15.1566 6.54244 15.2088 6.3725 15.3062 6.22833C15.4036 6.08416 15.5418 5.9723 15.7031 5.90706C15.8629 5.8436 16.0375 5.82739 16.2062 5.86036C16.3749 5.89332 16.5306 5.97407 16.6547 6.09299L21.2484 10.6867C21.4127 10.8526 21.5049 11.0767 21.5049 11.3102C21.5049 11.5437 21.4127 11.7677 21.2484 11.9336ZM8.375 20.0602H2.25V2.56018H8.375C8.60706 2.56018 8.82962 2.46799 8.99372 2.3039C9.15781 2.1398 9.25 1.91725 9.25 1.68518C9.25 1.45312 9.15781 1.23056 8.99372 1.06646C8.82962 0.902368 8.60706 0.810181 8.375 0.810181H2.25C1.78587 0.810181 1.34075 0.994555 1.01256 1.32274C0.684374 1.65093 0.5 2.09605 0.5 2.56018V20.0602C0.5 20.5243 0.684374 20.9694 1.01256 21.2976C1.34075 21.6258 1.78587 21.8102 2.25 21.8102H8.375C8.60706 21.8102 8.82962 21.718 8.99372 21.5539C9.15781 21.3898 9.25 21.1672 9.25 20.9352C9.25 20.7031 9.15781 20.4806 8.99372 20.3165C8.82962 20.1524 8.60706 20.0602 8.375 20.0602Z'
        fill={color || '#45484E'}
      />
    </svg>
  );
}