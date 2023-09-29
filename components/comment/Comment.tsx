'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import tw from 'tailwind-styled-components';
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
  }, []);

  useEffect(() => {
    fetchComments();
  }, []);

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
          <div key={d._id}>
            <CommentList d={d} />
          </div>
        ))
      ) : (
        <div className="flex justify-center mt-5">
          <div>등록된 댓글이 없습니다.</div>
        </div>
      )}
    </div>
  );
}

export function CommentList({ d }: { d: DataType }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState('');

  const editMode = isEditing ? '수정 완료' : '수정';
  return (
    <form className="border my-4 p-4 flex justify-between">
      <div>
        {isEditing ? (
          <input
            className="border-b-4"
            defaultValue={d.content}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedValue(e.target.value)}
          />
        ) : (
          <div className="text-lg">{d.content}</div>
        )}
        <div className="text-sm text-slate-700">{d.author}</div>
        <div className="text-sm text-slate-700">{d.date}</div>
      </div>
      <div className="flex">
        <Button
          className="mr-4"
          type={isEditing ? 'submit' : 'button'}
          onClick={() => {
            if (isEditing) {
              axios.post('/api/comment/edit', {
                comment: editedValue,
                _id: d._id,
              });
              setIsEditing(false);
            } else {
              setIsEditing(true);
            }
          }}
        >
          <AiOutlineEdit />
          {editMode}
        </Button>
        <Button
          onClick={() => {
            axios.post('/api/comment/delete', {
              _id: d._id,
            });
          }}
        >
          <AiOutlineDelete />
          삭제
        </Button>
      </div>
    </form>
  );
}

const Button = tw.button`
  border
  flex
  items-center
  p-1
  hover:bg-slate-200
`;
