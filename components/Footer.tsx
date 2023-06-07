import tw from "tailwind-styled-components";
import DummyCreater from './DummyCreater';
export default function Navbar() {
  return (
      <Continer>
        COPYRIGHTS © 2023. ALL RIGHTS RESERVED by<a href='https://github.com/jinsoul75' target="_blank"> JINSOUL</a>
        <DummyCreater></DummyCreater>
      </Continer>
  );
}

const Continer = tw.footer`
 flex
 h-10
 items-center
 justify-center
 bg-soul-gray
 text-soul-black
 fixed
 bottom-0
 w-full
 text-xs
`;

