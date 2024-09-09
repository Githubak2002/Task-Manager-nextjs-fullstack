"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

export default function Page() {

  const [resource, setResource] = useState();
  const [imgs, setImgs] = useState([]);

  useEffect(() => {

  },[])


  const handleSuccess = (result) => {
    console.log("Upload successful:", result);
  };

  const handleError = (error) => {
    console.error("Upload error:", error);
  };

  const handleQueuesEnd = () => {
    console.log("All uploads complete. Images:", imgs);
  };

  return (
    <sectio className=" flexCenter h-[70vh] flex-col gap-y-6">
      <h1>Upload Images</h1>


      {/* ===== Normal upload ====== */}
      {/* <CldUploadWidget
        signatureEndpoint="/api/upload"
        onSuccess={handleSuccess}
        onError={handleError}
      >
        {({ open }) => {
          return (
            <button
              className="mt-6 p-2 rounded-lg bg-blue-500 text-white"
              onClick={() => open()}
            >
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget> */}

      {/* ======= */}

      <CldUploadWidget
        signatureEndpoint="/api/upload"
        options={{
          // sources: ['local', 'url', 'unsplash'],
          multiple: true,
          folder: 'trial_folder' 
          // maxFiles: 5
        }}
        onSuccess={(result, { widget }) => {
          setResource(result?.info); // { public_id, secure_url, etc }
          setImgs((prevImgs) => [...prevImgs, result.info]);
          console.log("resource → ",result?.info);
        }}
        onQueuesEnd={(result, { widget }) => {
          // widget.close();
          handleQueuesEnd(); 
        }}
      >
        {({ open }) => {
          function handleOnClick() {
            setResource(undefined);
            open();
          }
          return <button className="mt-6 p-2 rounded-lg bg-blue-500 text-white" onClick={handleOnClick}>Upload an Image </button>;
        }}
      </CldUploadWidget>

      <button onClick={() => console.log("All imgs → ",imgs)}>subimt</button>

    </sectio>
  );
}
