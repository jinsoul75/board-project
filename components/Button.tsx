import tw from "tailwind-styled-components";

export default function Button({ buttonName }:any) {
  return <StyledBtn>{buttonName}</StyledBtn>;
}

const StyledBtn = tw.button`
    p-2
    w-40
    h-20
    text-xl
  `;
