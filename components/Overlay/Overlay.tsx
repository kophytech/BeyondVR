import React from "react";

interface Props {
  navbar: Boolean;
  handleOpen: () => void;
}

export default function Overlay({ navbar, handleOpen }: Props) {
  if (navbar) {
    return (
      <div
        onClick={handleOpen}
        className="absolute z-40 top-0 h-full w-full bg-black bg-opacity-40"
      ></div>
    );
  }

  return <></>;
}
