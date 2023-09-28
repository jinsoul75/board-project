'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import tw from 'tailwind-styled-components';
import { DataType } from '@/app/list/detail/[id]/Comment';

export default function CommentItem({ d }: { d: DataType }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(d.content);

  const editMode = isEditing ? '수정 완료' : '수정';

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isEditing) {
          if (d.content !== editedValue) {
            axios
              .post('/api/comment/edit', {
                comment: editedValue,
                _id: d._id,
              })
              .then(() => {
                
              })
              .catch((error) => {
                console.error(error);
              });
          }
          setIsEditing(false);
        } else {
          setIsEditing(true);
        }
      }}
      className="border my-4 p-4 flex justify-between"
    >
      <div>
        {isEditing ? (
          <input
            className="border-b-4"
            defaultValue={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
          />
        ) : (
          <div className="text-lg">{d.content}</div>
        )}
        <div className="text-sm text-slate-700">{d.author}</div>
        <div className="text-sm text-slate-700">{d.date}</div>
      </div>
      <div className="flex">
        <Button type="submit" className="mr-4">
          <AiOutlineEdit />
          {editMode}
        </Button>
        <Button
          type="button"
          onClick={() => {
            if (window.confirm('정말로 삭제하시겠습니까?')) {
              axios.post('/api/comment/delete', {
                _id: d._id,
              });
            }
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
