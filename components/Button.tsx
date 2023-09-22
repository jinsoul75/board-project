import tw from "tailwind-styled-components";

interface ButtonProps {
  buttonName: string | JSX.Element;
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
