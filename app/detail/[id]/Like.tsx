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
      {props.isLike && (props.isLike.pageId === props.pageId) && isLike
      ? <FaHeart className=' text-3xl text-red-600' />
      : <FaRegHeart className=' text-3xl' />
      }
    </button>
  );
}
