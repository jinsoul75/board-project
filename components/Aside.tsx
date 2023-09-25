import Link from 'next/link';
import tw from 'tailwind-styled-components';

import Button from './Button';
import Banner from './Banner';

export default function Aside({ banner }: { banner: string | null }) {

  return (
    <StyledAside>
      {banner ? (
        <Banner />
      ) : (
        <>
          <Button buttonName={<Link href="/list/1">📋 전체글</Link>}></Button>
          <Button buttonName={<Link href="/frontend/1">🖥️ 프론트엔드</Link>}></Button>
          <Button buttonName={<Link href="/backend/1">⚙️ 백엔드</Link>}></Button>
          <Button buttonName={<Link href="/my-likes">👍🏻 좋아요</Link>}></Button>
          <button className="bg-indigo-500	text-white h-10 rounded-xl">
            <Link href="/write">✏️ 작성하기</Link>
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
