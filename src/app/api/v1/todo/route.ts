import { connectToDatabase } from "@/app/lib/mongodb";
import todo from "@/app/models/todo";
import Todo from "@/app/models/todo";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const todoResult = await Todo.find({});
  return NextResponse.json({ data: todoResult });
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const data = await req.json();

  const newTodo = new todo(data);
  const new_todo = await newTodo.save();

  return NextResponse.json({
    status: 200,
    message: "Added Success",
    data: new_todo
  })
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  const data = await req.json();

  const todo = await Todo.findByIdAndDelete(data.id);

  return NextResponse.json({
    status: 200,
    message: "Delete Success",
    data: todo
  })
}

export async function PUT(req: NextRequest) {
  await connectToDatabase();
  const data = await req.json();

  const todo = await Todo.findByIdAndUpdate(data.id, {
    status: !data.status
  }, { new: true });

  return NextResponse.json({
    status: 200,
    message: "Delete Success",
    data: todo
  })
}