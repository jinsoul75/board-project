import Link from "next/link";
import tw from "tailwind-styled-components";
import LoginBtn from "../app/LoginBtn";
import LogoutBtn from "../app/LogoutBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <Nav>
      <StyledLink href='/'>Home</StyledLink>
      <StyledLink href='/about'>About</StyledLink>
      <StyledLink href='/mypage'>Mypage</StyledLink>
      {session === null ? (
        <LoginBtn />
      ) : (
        <div>
          <span>{session.user.name}</span>
          <img className='w-[20px] h-[20px]' src={session.user.image}></img>
          <LogoutBtn />
        </div>
      )}
    </Nav>
  );
}
const Nav = tw.nav`
 flex 
 p-5
 text-violet-600
 font-bold
`;
const StyledLink = tw(Link)`
p-1
mr-2
`;
