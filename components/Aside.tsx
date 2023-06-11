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
            buttonName={<Link href='/list/1'>📋 전체글</Link>}
          ></Button>
          <Button
            buttonName={<Link href='/frontend'>🖥️ 프론트엔드</Link>}
          ></Button>
          <Button
            buttonName={<Link href='/backend'>⚙️ 백엔드</Link>}
          ></Button>
          <Button
            buttonName={<Link href='/my-likes'>👍🏻 좋아요</Link>}
          ></Button>
          <button className='bg-indigo-500	text-white h-10 rounded-xl'>
            <Link href='/write'>✏️ 작성하기</Link>
          </button>
        </>
      )}
    </StyledAside>
  );
}

const StyledAside = tw.aside`
flex
flex-col
`;
