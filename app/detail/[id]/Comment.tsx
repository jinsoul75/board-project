'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface DataType {
  content: string;
  author: string;
  date: string;
  _id: string;
}

export default function Comment(props: { _id: number }) {
  const [comment, setComment] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`/api/comment/list?id=${props._id}`).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
      <div>댓글목록</div>
      <hr></hr>
      {data.length > 0
        ? data.map((d: DataType) => (
            <div key={d._id}>
              <CommentList d={d} />
            </div>
          ))
        : '작성된 댓글이 없습니다.'}
      <input
        className="border"
        onChange={(e) => {
          setComment(e.target.value);
        }}
        value={comment}
      />
      <button
        onClick={() => {
          axios
            .post('/api/comment/new', {
              comment: comment,
              _id: props._id,
              date: new Date().toLocaleString(),
            })
            .then(() => setComment(''));
        }}
      >
        댓글등록
      </button>
    </div>
  );
}

export function CommentList({ d }: { d: DataType }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState('');

  const editMode = isEditing ? '수정 완료' : '수정';
  return (
    <>
      {isEditing ? (
        <input defaultValue={d.content} onChange={(e) => setEditedValue(e.target.value)} />
      ) : (
        <div>{d.content}</div>
      )}
      <div>{d.author}</div>
      <div>{d.date}</div>
      <button
        onClick={() => {
          if (isEditing) {
            axios.post('/api/comment/edit', {
              comment: editedValue,
              _id: d._id,
              date: new Date().toLocaleString(),
            });
            setIsEditing(false);
          } else {
            setIsEditing(true);
          }
        }}
        className="border border-black"
      >
        {editMode}
      </button>
      <button
        onClick={() => {
          axios.post('/api/comment/delete', {
            _id: d._id,
          });
        }}
        className="border border-black"
      >
        삭제
      </button>
    </>
  );
}
