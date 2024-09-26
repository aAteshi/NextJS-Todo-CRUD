import React from "react";
import { ITodo } from "@/app/models/todo";

export default function Todo({
  todo,
  deleteHandler,
  toggleStatusHandler,
}: {
  todo: ITodo;
  deleteHandler: (todoId: string) => void;
  toggleStatusHandler: (todoId: string) => void;
}) {
  const timeConvert = (time: string) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  return (
    <div className="grid grid-cols-7 hover:bg-pink-100 p-2 items-center rounded-xl text-center">
      <div
        className="col-span-1"
        style={{
          textDecoration: todo.status == false ? "none" : "line-through",
        }}
      >
        {todo.name}
      </div>
      <div className="col-span-2">{todo.description}</div>
      <div className="col-span-1">
        {todo.status ? "เสร็จแล้ว" : "ยังไม่เสร็จ"}
      </div>
      <div className="col-span-2">{timeConvert(todo.duedate)}</div>
      <div className="col-span-1 flex flex-col gap-2">
        <button
          className={`${
            todo.status ? "bg-pink-400" : "bg-pink-500"
          } text-white rounded-lg p-2 w-full`}
          onClick={() => {
            toggleStatusHandler(todo._id as string);
          }}
        >
          {todo.status ? "ไม่สำเร็จ" : "สำเร็จ"}
        </button>
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg p-2 w-full"
          onClick={() => {
            deleteHandler(todo._id as string);
          }}
        >
          ลบ
        </button>
      </div>
    </div>
  );
}
