"use client";
import { useEffect, useState } from "react";
import Todo from "./Todo";
import { ITodo } from "@/app/models/todo";

export default function Home() {
  const [currentTodo, setCurrentTodo] = useState<ITodo>({
    name: "",
    description: "",
    status: false,
    duedate: "",
  });
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    fetch("/api", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const todo = data.data as any;
        setTodos(todo);
      });
  }, []);

  function AddHandler() {
    fetch("/api/v1/todo", {
      method: "POST",
      body: JSON.stringify({
        name: currentTodo.name,
        description: currentTodo.description,
        status: currentTodo.status,
        duedate: currentTodo.duedate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentTodo({
          name: "",
          description: "",
          status: false,
          duedate: "",
        });

        const todo = data.data;
        setTodos([...todos, todo]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function DeleteHandler(todoId: string) {
    fetch("/api/v1/todo", {
      method: "DELETE",
      body: JSON.stringify({
        id: todoId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const todo_id = data.data._id;
        const copy_todo = [...todos];
        const todo_todelete = copy_todo.findIndex((x) => x._id == todo_id);
        copy_todo.splice(todo_todelete, 1);
        setTodos(copy_todo);
      });
  }

  function toggleStatusHandler(todoId: string) {
    let todo_to_update = todos.findIndex((x) => x._id == todoId);

    fetch("/api/v1/todo", {
      method: "PUT",
      body: JSON.stringify({
        id: todoId,
        status: todos[todo_to_update].status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const copy_todo = [...todos];
        copy_todo[todo_to_update].status = !copy_todo[todo_to_update].status;
        setTodos(copy_todo);
      });
  }

  return (
    <>
      <div className="flex justify-center min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200">
        <div className="container border border-pink-200 p-8 rounded-lg bg-pink-50 shadow-lg ">
          <p className="text-2xl font-semibold text-center text-pink-800 mb-6">
            Todo App
          </p>

          <div className="grid gap-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 items-center">
              <label
                htmlFor="name"
                className="text-pink-700 text-right pr-4 sm:col-span-1"
              >
                ชื่อเรื่อง:
              </label>
              <input
                type="text"
                id="name"
                className="border border-pink-300 rounded-lg p-2 sm:col-span-1"
                placeholder="เพิ่มชื่อเรื่อง"
                onChange={(event) =>
                  setCurrentTodo({ ...currentTodo, name: event.target.value })
                }
                value={currentTodo.name}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 items-center">
              <label
                htmlFor="description"
                className="text-pink-700 text-right pr-4 sm:col-span-1"
              >
                รายละเอียด:
              </label>
              <input
                type="text"
                id="description"
                className="border border-pink-300 rounded-lg p-2 sm:col-span-1"
                placeholder="เพิ่มรายละเอียด"
                onChange={(event) =>
                  setCurrentTodo({
                    ...currentTodo,
                    description: event.target.value,
                  })
                }
                value={currentTodo.description}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 items-center">
              <label
                htmlFor="duedate"
                className="text-pink-700 text-right pr-4 sm:col-span-1"
              >
                วันครบกำหนด:
              </label>
              <input
                type="datetime-local"
                id="duedate"
                className="border border-pink-300 rounded-lg p-2 sm:col-span-1 text-center"
                onChange={(event) =>
                  setCurrentTodo({
                    ...currentTodo,
                    duedate: event.target.value,
                  })
                }
                value={currentTodo.duedate}
              />
            </div>

            <div className="flex justify-center">
              <button
                className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg p-2 w-full sm:w-auto sm:col-span-3"
                onClick={AddHandler}
              >
                เพิ่ม
              </button>
            </div>
          </div>

          <hr className="my-6" />

          <div className="grid gap-y-4">
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                deleteHandler={DeleteHandler}
                toggleStatusHandler={toggleStatusHandler}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
