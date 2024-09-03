import connectDb from "@/lib/mongoDB";
import TodoModel from "@/Models/Todo";
import { NextResponse } from "next/server";

// connecting to DB
const connectToDb = async () => {
  await connectDb();
  console.log("DB connected");
};
connectToDb();

// simple GET request - api to get all tasks
export async function GET(req) {
  try {
    const todos = await TodoModel.find({});
    return NextResponse.json({
      todos,
      msg: "Todo Fetched successful",
      status: "ok",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      msg: "Error fetching todos",
      status: "error",
    });
  }
}
