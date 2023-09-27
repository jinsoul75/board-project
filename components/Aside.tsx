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
          <StyledLink href="/list/1">📋 전체글</StyledLink>
          <StyledLink href="/frontend/1">🖥️ 프론트엔드</StyledLink>
          <StyledLink href="/backend/1">⚙️ 백엔드</StyledLink>
          <StyledLink href="/my-likes">👍🏻 좋아요</StyledLink>
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
`;
