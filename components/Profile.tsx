import Link from 'next/link';
import tw from 'tailwind-styled-components';
import { FaBlogger, FaGithub } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

export interface ProfileType {
  name: string;
  introPhrase: string;
  historyData: string[];
  blog: string;
  github: string;
  email: string;
}

export default function Profile({ info }: { info: ProfileType }) {
  return (
    <Section>
      <H2>{info.name}</H2>
      <div className="mt-2">{info.introPhrase}</div>
      <ul className="mt-2">
        {info.historyData.map((history) => {
          return <li className='list-disc list-inside'>{history}</li>;
        })}
      </ul>
      <div className="mt-2">
        <FlexDiv>
          <FaBlogger className="mr-2" />
          <Link className="hover:underline decoration-sky-500" href={info.blog}>
            {info.blog}
          </Link>
        </FlexDiv>
        <FlexDiv>
          <FaGithub className="mr-2" />
          <Link className="hover:underline decoration-pink-500" href={info.github}>
            {info.github}
          </Link>
        </FlexDiv>
        <FlexDiv>
          <HiOutlineMail className="mr-2" />
          <div>{info.email}</div>
        </FlexDiv>
      </div>
    </Section>
  );
}

const Section = tw.section`
  flex
  flex-col
  pb-4
`;

const H2 = tw.h2`
  text-xl
  font-bold
`;

const FlexDiv = tw.div`
  flex
  items-center
`;
