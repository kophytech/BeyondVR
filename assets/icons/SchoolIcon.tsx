import { IconProps } from "@/interfaces/iconInterface";

export function SchoolIcon({ color, w, h }: IconProps) {
  return (
    <svg
      width={w || "28"}
      height={h || "29"}
      viewBox="0 0 28 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.4 11.8667L14.9333 8.13334V5.91018H20.5333V0.310181H13.0667V8.13334L5.6 11.8667V15.2435H1.86667V26.4435H0V28.3102H11.2V20.8435H16.8V28.3102H28V26.4435H26.1333V15.2435H22.4V11.8667ZM24.2667 26.4435V17.1102H22.4V26.4435H24.2667ZM5.6 26.4435H3.73333V17.1102H5.6V26.4435ZM11.2 16.1768C11.2 14.6304 12.4536 13.3768 14 13.3768C15.5464 13.3768 16.8 14.6304 16.8 16.1768C16.8 17.7232 15.5464 18.9768 14 18.9768C12.4536 18.9768 11.2 17.7232 11.2 16.1768Z"
        fill={color || "#45484E"}
      />
    </svg>
  );
}
