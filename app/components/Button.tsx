import tw from "tailwind-styled-components";

export default function Button({ buttonName, colorName }:any) {
  return <StyledBtn className={colorName}>{buttonName}</StyledBtn>;
}

const StyledBtn = tw.button`
    rounded-lg
    p-2
    w-20
    h-20
    text-xs
    mb-3
    border
    border-indigo-600
  `;

// props에 따라 버튼 색상 변경하게 만들기
