import tw from "tailwind-styled-components";

export default function Button({ buttonName }:any) {
  return <StyledBtn>{buttonName}</StyledBtn>;
}

const StyledBtn = tw.button`
    rounded-lg
    p-2
    w-20
    h-20
    text-xs
    mb-3
    bg-soul-gray
    border
    rounded-xl
    border-transparent
    shadow-lg
  `;
