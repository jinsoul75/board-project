import tw from "tailwind-styled-components";

export default function Navbar() {
  return (
      <Continer>
        COPYRIGHTS © 2023. ALL RIGHTS RESERVED by  <a href='https://github.com/jinsoul75' target="_blank">jinsoul</a>
      </Continer>
  );
}

const Continer = tw.footer`
 flex
 h-10
 items-center
 justify-center
 bg-gray-200
 fixed
 bottom-0
 w-full
`;

