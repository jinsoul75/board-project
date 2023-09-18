"use client";
import axios from "axios";
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Like(props: any) {
  const [isLike, setIsLike] = useState(false)
  
  useEffect(()=>{
    if(props.isLike && props.isLike.pageId === props.pageId)
    setIsLike(true)
  },[])
  
  return (
    <button
    className='border border-black'
      onClick={() =>
        axios.post("/api/post/like", { pageId: props.pageId })
        .then(()=>{
          setIsLike(!isLike)
        })
        .catch(() => {
          alert("로그인 후 이용이 가능합니다.");
        })
      }
    >
      {/* 사용자와 일치하는 좋아요데이터가 있고 그 좋아요데이터의 pageId가 지금 pageId와 같고 isLike 상태가 true라면 찬하트 */}
      {props.isLike && (props.isLike.pageId === props.pageId) && isLike
      ? <FaHeart className=' text-3xl text-red-600' />
      : <FaRegHeart className=' text-3xl' />
      }
    </button>
  );
}
