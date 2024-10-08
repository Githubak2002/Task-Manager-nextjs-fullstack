import connectDb from "@/lib/mongoDB";
import TodoModel from "@/Models/Todo";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// export const revalidate = 0;

// connecting to DB
const connectToDb = async () => {
  await connectDb();
  console.log("DB connected");
};
connectToDb();

// simple GET request - api to get all tasks
// export async function GET(req) {
//   try {
//     const todos = await TodoModel.find({});
//     return NextResponse.json({
//       todos,
//       msg: "Todo Fetched successful",
//       status: "ok",
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({
//       msg: "Error fetching todos",
//       status: "error",
//     });
//   }
// }


// Simple GET request - API to get all tasks



export async function GET(req) {
  try {
    const todos = await TodoModel.find({});
    
    const response = NextResponse.json({
      todos,
      msg: "Todo Fetched successfully",
      status: "ok",
    });
    
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate'); // For development
    response.headers.set('Pragma', 'no-cache'); // For HTTP/1.0 compatibility
    response.headers.set('Expires', '0'); // For HTTP/1.1 compatibility
    
    return response;
  } catch (error) {
    console.error(error);
    
    const response = NextResponse.json({
      msg: "Error fetching tasks",
      status: "error",
    });
    
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate'); // For development
    response.headers.set('Pragma', 'no-cache'); // For HTTP/1.0 compatibility
    response.headers.set('Expires', '0'); // For HTTP/1.1 compatibility
    
    return response;
  }
}
