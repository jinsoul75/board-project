import Link from 'next/link';
import tw from 'tailwind-styled-components';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import LoginBtn from '../app/LoginBtn';
import LogoutBtn from '../app/LogoutBtn';

export default async function Header() {
  const session: { user: { image: string; name: string } } | null =
    await getServerSession(authOptions);

  return (
    <HeaderWrapper>
      <div className="flex items-center">
        <StyledLink href="/">Home</StyledLink>
        <StyledLink href="/about">About</StyledLink>
        <StyledLink prefetch={false} href="/mypage">
          Mypage
        </StyledLink>
      </div>
      {session === null ? (
        <div>
          <LoginBtn />
        </div>
      ) : (
        <div className="flex items-center">
          <span className="font-bold">{session.user.name}</span>
          <span className="mr-[10px]">님 환영합니다!</span>
          <img className="w-[30px] h-[30px] rounded-full mr-[10px]" src={session.user.image}></img>
          <LogoutBtn />
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
 h-[70px]
`;
const StyledLink = tw(Link)`
p-2
mr-5
hover:border-b-4 border-soul-black 
hover:font-bold
`;
