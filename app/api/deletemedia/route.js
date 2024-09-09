// app/api/deleteMedia.js


// ========== Deleting image or entire folder ==========
import cloudinary from "@/lib/cloudinary.js";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const { publicId, folderPrefix } = await req.json();

  if (publicId) {
    try {
      const res = await cloudinary.uploader.destroy(publicId);
      return NextResponse.json(
        { message: "Media deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.log("Error deleting media → ", error);
      return NextResponse.json(
        { message: "Error deleting media" },
        { status: 500 }
      );
    }
  } else if (folderPrefix) {
    try {
      // Delete all resources with the specified prefix
      const result = await cloudinary.api.delete_resources_by_prefix(
        folderPrefix,
        {
          type: "upload", // Specifies that we are deleting upload resources
          resource_type: "image", // Specifies that we are dealing with images
        }
      );
      return NextResponse.json(
        { message: "Media deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.log("Error deleting media → ", error);
      return NextResponse.json(
        { message: "Error deleting media" },
        { status: 500 }
      );
    }
  }
}
