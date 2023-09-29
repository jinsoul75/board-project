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
      className="text-xl hover:text-red-600 active:text-xl mr-1 flex items-center"
      onClick={() => {
        setIsLike(!isLike);
        axios
          .post('/api/post/like', { pageId: props.pageId })
          .catch(() => {
            alert('로그인 후 이용이 가능합니다.');
          });
      }}
    >
      {isLike ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
      <span>좋아요</span>
    </button>
  );
}
