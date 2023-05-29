import Link from "next/link";
import tw from "tailwind-styled-components";

export default function Navbar() {
  return (
    <Nav>
      <StyledLink href='/'>Home</StyledLink>
      <StyledLink href='/about'>About</StyledLink>
      <StyledLink href='/mypage'>Mypage</StyledLink>
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
