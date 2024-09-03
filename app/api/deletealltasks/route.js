import connectDb from "@/lib/mongoDB";
import TodoModel from "@/Models/Todo";
import { NextResponse } from "next/server";

// connecting to DB
const connectToDb = async () => {
  await connectDb();
  console.log("DB connected");
};
connectToDb();


// api to delete all todos
export async function DELETE(req) {
  try {
    await TodoModel.deleteMany({});
    return NextResponse.json({ msg: "all tasks deleted", status: "ok" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      msg: "Error deleting all Todos",
      status: "error",
    });
  }
}
