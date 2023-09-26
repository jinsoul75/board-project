import Profile from '@/components/Profile';
import { teamInfo } from '@/util/teamInfo';

export default function About() {
  return (
    <>
      <div>
        <h1>프로젝트 소개</h1>
        <p>
          이 프로젝트는 Next.js를 이용한 게시판 만들기 토이 프로젝트로, 팀원들이 같은 주제로 솔로
          프로젝트를 진행하며 서로 코드리뷰를 하는 방식으로 진행되었습니다.
        </p>
        <p>진행 기간: 2023년 5월 24일 ~ 2023년 6월 9일(2주)</p>
      </div>
      <div>
        <h1>팀원 소개</h1>
        <div>
          {teamInfo.map((info) => {
            return <Profile info={info} />;
          })}
        </div>
      </div>
    </>
  );
}
