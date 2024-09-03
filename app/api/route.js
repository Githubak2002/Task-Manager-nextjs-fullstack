import connectDb from "@/lib/mongoDB";
import TodoModel from "@/Models/Todo";
import { NextResponse } from "next/server";

// connecting to DB
const connectToDb = async () => {
  await connectDb();
  console.log("DB connected");
}
connectToDb();

// simple GET request
export async function GET (req) {
  // console.log("response → ",req);
  const todos = await TodoModel.find({});
  return NextResponse.json({todos,msg:"Todo Fetched successful", status:"ok"})
}

// POST request
export async function POST(req) {
  try {
    console.log("response → ",req);
    const { task } = await req.json(); 
    console.log("task: ", task);
    await TodoModel.create({ task }); 
    return NextResponse.json({ msg: "Todo added", status: "ok" }); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Error adding Todo", status: "error" }); 
  }
}

// DELETE request
export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await TodoModel.findByIdAndDelete(id);
    return NextResponse.json({msg:"task deleted",status:"ok"})
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Error deleting Todo", status: "error" });
  }
}