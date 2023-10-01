import tw from "tailwind-styled-components";

interface ButtonProps {
  buttonName: string;
  colorName?: string;
  type?:string;
  className?: string;
}

export default function Button({ buttonName }:ButtonProps) {
  return <StyledBtn>{buttonName}</StyledBtn>;
}

const StyledBtn = tw.button`
    p-2
    w-40
    h-20
    text-xl
  `;
