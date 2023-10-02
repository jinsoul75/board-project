'use client';

import axios from 'axios';

const DummyCreater = () => {
  //! 각 키값쌍은 본인 데이터형식에 알맞게 수정하시면 됩니다.
  const data = {
    category: 'FRONTEND',
    title: `프론트엔드 질문입니다. ${Math.floor(Math.random() * 1000)}`,
    content:
      '최근에 프론트엔드 프레임워크를 선택해야 하는 프로젝트에 참여하게 되었습니다. 그런데 React, Angular, Vue 중에서 어떤 것을 선택해야 할지 망설이고 있습니다. 각 프레임워크의 장단점을 비교하고 어떤 프레임워크를 선택해야 할지에 대한 조언이 필요합니다.저는 기존에 React 경험이 있지만 Angular와 Vue에 대해서는 잘 모릅니다. 프로젝트의 요구 사항은 복잡한 웹 애플리케이션을 개발하는 것이며, 효율적인 상태 관리, 라우팅, 컴포넌트 재사용 등이 중요합니다.',
    author: '김프엔',
    email: 'wlsthf75@naver.com',
    likeCount: 0,
    commentCount: 0,
  };

  return (
    <button
      onClick={() => {
        axios.post('/api/post/dummy', data);
      }}
    >
      버튼
    </button>
  );
};

export default DummyCreater;
