import Link from 'next/link';
import tw from 'tailwind-styled-components';

import Banner from './Banner';

export default function Aside({ banner }: { banner?: string }) {
  return (
    <StyledAside>
      {banner ? (
        <Banner />
      ) : (
        <>
          <StyledLink href="/list?page=1">📋 전체글</StyledLink>
          <StyledLink href="/frontend?page=1">🖥️ 프론트엔드</StyledLink>
          <StyledLink href="/backend?page=1">⚙️ 백엔드</StyledLink>
          <StyledLink href="/my-likes?page=1">👍🏻 좋아요</StyledLink>
          <StyledLink
            className="bg-indigo-500 hover:bg-indigo-300 active:bg-indigo-400 p-2	text-white rounded-xl"
            href="/write"
          >
            ✏️ 작성하기
          </StyledLink>
        </>
      )}
    </StyledAside>
  );
}

const StyledAside = tw.aside`
flex
flex-col
`;

const StyledLink = tw(Link)`
p-2
w-40
text-xl
text-center
mb-4
hover:bg-slate-200	rounded-xl
`;
