'use client';

import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { AiOutlineDelete } from 'react-icons/ai';

export default function DetailLink() {
  const router = useRouter();
  const params = useParams();

  return (
    <button
      className="text-2xl hover:text-violet-600"
      onClick={() => {
        axios
          .post('/api/post/delete', {
            _id: params?.id,
          })
          .then((res) => {
            if (res.status === 200) {
              router.push('/');
              alert('성공적으로 삭제되었습니다.');
            }
          })
          .catch(() => {
            alert('삭제할 권한이 없습니다.');
          });
      }}
    >
      <AiOutlineDelete />
    </button>
  );
}
