"use client";

import { useEffect, useState } from "react";
import axios from "axios";
export default function Comment(props: any) {
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);

  useEffect(() => {
    if (comment === "") {
      axios.get(`/api/comment/list?id=${props._id}`).then((res) => {
        setData(res.data);
      });
    }
  }, [comment]);

  return (
    <div>
      <div>댓글목록</div>
      <hr></hr>
      {data.length > 0
        ? data.map((d: any, i) => (
            <div key={i}>
              <div>{d.content}</div>
              <div>{d.author}</div>
              <div>{d.date}</div>
              <button className='border border-black'>수정</button>
              <button className='border border-black'>삭제</button>
            </div>
          ))
        : "댓글 로딩중"}
      <input
        className='border'
        onChange={(e) => {
          setComment(e.target.value);
        }}
        value={comment}
      />

      <button
        onClick={() => {
          axios
            .post("/api/comment/new", {
              comment: comment,
              _id: props._id,
              date: new Date().toLocaleString(),
            })
            .then(() => setComment(""));
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
