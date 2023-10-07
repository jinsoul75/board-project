import Link from 'next/link';
import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { SignInBtn, SignOutBtn } from './SignInOutBtn';

export default async function Header() {
  const session: { user: { image: string; name: string } } | null =
    await getServerSession(authOptions);

  return (
    <HeaderWrapper>
      <div className="flex items-center">
        <StyledLink prefetch={false} href="/">Home</StyledLink>
        <StyledLink prefetch={false} href="/list">Community</StyledLink>
        <StyledLink prefetch={false} href="/about">About</StyledLink>
        <StyledLink prefetch={false} href="/mypage">
          Mypage
        </StyledLink>
      </div>
      {session === null ? (
        <SignInBtn />
      ) : (
        <div className="flex items-center">
          <span className="font-bold">{session.user.name}</span>
          <span className="mr-[10px]">님 환영합니다!</span>
          <Image
            className="rounded-full mr-[10px]"
            src={session.user.image}
            alt={'user-image'}
            width={30}
            height={30}
          ></Image>
          <SignOutBtn />
        </div>
      )}
    </HeaderWrapper>
  );
}
const HeaderWrapper = tw.header`
 flex 
 p-5
 bg-soul-gray
 text-soul-black
 justify-between
 h-[80px]
`;
const StyledLink = tw(Link)`
p-4

hover:font-bold

`;
