'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import CommentItem from './CommentItem';
export interface DataType {
  content: string;
  author: string;
  date: string;
  _id: string;
}

export default function Comment(props: { _id: number }) {
  const [comment, setComment] = useState('');
  const [data, setData] = useState([]);

  const fetchComments = useCallback(() => {
    axios(`/api/comment/list?id=${props._id}`).then((res) => {
      setData(res.data);
    });
  }, [props._id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div>
      <hr></hr>
      <form
        className="border p-2 mt-4 flex"
        onSubmit={(e) => {
          e.preventDefault();
          axios
            .post('/api/comment/new', {
              comment: comment,
              _id: props._id,
              date: new Date(),
            })
            .then(() => {
              setComment('');
              fetchComments();
            });
        }}
      >
        <input
          className=" mr-2 border-b-4 grow"
          placeholder="댓글을 입력해주세요"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          value={comment}
        />
        <button className="border w-40 hover:bg-slate-200	" type="submit">
          댓글등록
        </button>
      </form>
      {data.length > 0 ? (
        data.map((d: DataType) => (
          <section key={d._id}>
            <CommentItem d={d} />
          </section>
        ))
      ) : (
        <div className="flex justify-center mt-5">
          <div>등록된 댓글이 없습니다.</div>
        </div>
      )}
    </div>
  );
}
