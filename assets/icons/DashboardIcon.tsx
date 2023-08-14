import { IconProps } from '@/interfaces/iconInterface';

export function DashboardIcon({ color }: IconProps) {
  return (
    <svg
      width='22'
      height='22'
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M20.9312 8.65239L12.1812 0.700823C11.8586 0.405685 11.4372 0.242004 11 0.242004C10.5627 0.242004 10.1413 0.405685 9.81874 0.700823L1.06874 8.65239C0.889588 8.81628 0.746504 9.01567 0.648588 9.23786C0.550672 9.46006 0.500066 9.7002 0.499989 9.94301V20.0164C0.492875 20.4577 0.648637 20.886 0.937489 21.2196C1.10143 21.406 1.30338 21.5552 1.52977 21.657C1.75616 21.7589 2.00174 21.8111 2.24999 21.8102H7.49999C7.73205 21.8102 7.95461 21.718 8.11871 21.5539C8.2828 21.3898 8.37499 21.1673 8.37499 20.9352V15.6852C8.37499 15.4531 8.46718 15.2306 8.63127 15.0665C8.79537 14.9024 9.01792 14.8102 9.24999 14.8102H12.75C12.9821 14.8102 13.2046 14.9024 13.3687 15.0665C13.5328 15.2306 13.625 15.4531 13.625 15.6852V20.9352C13.625 21.1673 13.7172 21.3898 13.8813 21.5539C14.0454 21.718 14.2679 21.8102 14.5 21.8102H19.75C20.0402 21.8128 20.3263 21.7412 20.5812 21.6024C20.8586 21.4513 21.0902 21.2285 21.2519 20.9572C21.4135 20.6858 21.4992 20.376 21.5 20.0602V9.94301C21.4999 9.7002 21.4493 9.46006 21.3514 9.23786C21.2535 9.01567 21.1104 8.81628 20.9312 8.65239Z'
        fill={color || '#45484E'}
      />
    </svg>
  );
}
