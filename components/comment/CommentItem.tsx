'use client';

import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import tw from 'tailwind-styled-components';
import { DataType } from '@/components/comment/Comment';
import { UserInfo } from '@/app/detail/[id]/page';

export default function CommentItem(props: { d: DataType; session: null | UserInfo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(props.d.content);

  const editMode = isEditing ? '수정 완료' : '수정';
  const onlyDate = props.d.date.split("T")[0]
  const onlyTime = props.d.date.split("T")[1].slice(0,5)

  return (
    <div className="border my-4 p-4 flex justify-between">
      <div className="grow">
        {isEditing ? (
          <input
            className="border-b-4"
            defaultValue={editedValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEditedValue(e.target.value)}
          />
        ) : (
          <div className="text-lg">{props.d.content}</div>
        )}
        <div className="text-sm text-slate-700">{props.d.author}</div>
        <div className="text-sm text-slate-700">{onlyDate}</div>
        <div className="text-sm text-slate-700">{onlyTime}</div>
      </div>
      {props.session && props.d.email === props.d.email ?
      <div className="flex">
        <Button
          type="button"
          className="mr-4"
          onClick={(e) => {
            e.preventDefault();
            if (isEditing) {
              if (props.d.content !== editedValue) {
                axios
                  .post('/api/comment/edit', {
                    comment: editedValue,
                    _id: props.d._id,
                  })
                  .then(() => {})
                  .catch((error) => {
                    console.error(error);
                  });
              }
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
          type="button"
          onClick={() => {
            if (window.confirm('정말로 삭제하시겠습니까?')) {
              axios.post('/api/comment/delete', {
                _id: props.d._id,
              });
            }
          }}
        >
          <AiOutlineDelete />
          삭제
        </Button>
      </div>
      : null}
    </div>
  );
}

const Button = tw.button`
    border
    flex
    items-center
    p-1
    hover:bg-slate-200
  `;
