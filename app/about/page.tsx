import Image from 'next/image';
import tw from 'tailwind-styled-components';

import nextLogo from '../../public/images/Nextjs-logo.svg';
import jinsoul from '../../public/images/jinsoul.png';
import mooseng from '../../public/images/mooseng.jpeg';
import jiwonp from '../../public/images/jiwonp.png';
import jeanne from '../../public/images/jeanne.png';

import Profile from '@/components/Profile';
import { teamInfo } from '@/util/teamInfo';

export default function About() {
  const profileImg = [jinsoul, mooseng, jiwonp, jeanne];

  return (
    <Main>
      <div>
        <H1>🤓프로젝트 소개</H1>
        <Image src={nextLogo} alt="nextjs-logo" />
        <p className="mt-4">
          이 프로젝트는 <b>Next.js</b>를 이용한 게시판 만들기 토이 프로젝트로, 팀원들이 같은 주제로{' '}
          <b>솔로 프로젝트</b>를 진행하며 서로 <b>코드리뷰</b>를 하는 방식으로 진행되었습니다.
        </p>
        <p>진행 기간: 2023년 5월 24일 ~ 2023년 6월 9일(2주)</p>
      </div>
      <div>
        <H1 className="mt-10">👩🏻‍💻팀원 소개</H1>
        <div></div>
        <div>
          {teamInfo.map((info, index) => {
            return (
              <div key={index}>
                <Image
                  className="rounded-full my-2"
                  src={profileImg[index]}
                  alt="profile-img"
                  width={100}
                  height={100}
                />
                <Profile info={info} />
                { index === teamInfo.length - 1 ? null : <hr></hr>}
              </div>
            );
          })}
        </div>
      </div>
    </Main>
  );
}

const Main = tw.main`
  p-10
`;

const H1 = tw.h1`
  text-2xl	
  mb-4
`;
