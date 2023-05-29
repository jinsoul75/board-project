import Button from "./Button";
import tw from "tailwind-styled-components";
import Link from "next/link";
import Banner from "./Banner";
export default function Aside({ banner }: any) {
  return (
    <StyledAside>
      {banner ? (
        <Banner />
      ) : (
        <>
          <Button
            colorName={"bg-red-500"}
            buttonName={<Link href='/write'>글쓰기</Link>}
          ></Button>
          <Button colorName={"bg-emerald-600"} buttonName={"전체글"}></Button>
          <Button colorName={"bg-amber-400"} buttonName={"프론트"}></Button>
          <Button colorName={"bg-sky-500"} buttonName={"백엔드"}></Button>
          <Button colorName={"bg-fuchsia-600"} buttonName={"좋아요 한 글"}></Button>
        </>
      )}
    </StyledAside>
  );
}

const StyledAside = tw.aside`
flex
flex-col
px-5
`;
