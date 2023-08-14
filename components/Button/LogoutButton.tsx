import { LogoutIcon } from '@/assets/icons';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export default function LogoutButton() {
  const [isHovered, setIsHovered] = useState(false);
  const { logout } = useAuth();

  return (
    <button
      className={`${
        isHovered ? 'bg-bw-black-400 text-bw-silver ' : 'text-bw-black-100 '
      } flex gap-3 items-center py-2 px-3 mt-10 w-full rounded-md hover:bg-bw-black-400 hover:text-bw-silver transition-all ease-linear`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => logout()}
    >
      <LogoutIcon color={isHovered ? '#FAFAFA' : '#45484E'} />
      Logout
    </button>
  );
}
