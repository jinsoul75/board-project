'use client';

import axios from 'axios';
import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface LikeProps {
  isLike: {
    pageId: ObjectId | undefined;
  };
  pageId: ObjectId | undefined;
}

export default function Like(props: LikeProps) {
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    if (props.isLike.pageId === props.pageId) setIsLike(true);
  }, []);

  return (
    <button
      className="text-2xl hover:text-red-600 active:text-xl mr-1"
      onClick={() => {
        setIsLike(!isLike);
        axios
          .post('/api/post/like', { pageId: props.pageId })
          .then(() => {})
          .catch(() => {
            alert('로그인 후 이용이 가능합니다.');
          });
      }}
    >
      {/* 사용자와 일치하는 좋아요데이터가 있고 그 좋아요데이터의 pageId가 지금 pageId와 같고 isLike 상태가 true라면 찬하트 */}
      {isLike ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
    </button>
  );
}
