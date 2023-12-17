import React, { useRef } from "react";
import {PlusOutlined } from "@ant-design/icons";

const Upload = ({uploadedFile, setUploadedFile}) => {

    
    const hiddenFileInput = useRef(null); // ADDED

    const handleClick = event => {
    hiddenFileInput.current.click();    // ADDED
   };

   const handleChange = event => {
    const fileUploaded = event.target.files[0]; // ADDED
    
    // Set the uploaded file in the component's state
    setUploadedFile(fileUploaded);

    // You can perform additional actions with the file as needed
    console.log("Uploaded file:", fileUploaded);
  };

  return (
<div>
  <button className={`flex justify-center items-center w-full h-full bg-secondary-bg dark:bg-dark-secondary-bg`} onClick={handleClick}>
    <input type="file" accept=".jpg" ref={hiddenFileInput} style={{ display: "none" }} onChange={handleChange} />

    {!(uploadedFile && uploadedFile.type === "image/jpeg") ? (
      <div>
        <PlusOutlined className="text-primary-bright text-5xl" />

        <div className="font-semibold text-primary-bright dark:text-dark-primary-bright text-lg">
          Upload Image
        </div>
        <div className="text-xs">JPG files are allowed</div>
      </div>
    ) : (
      /* Display the uploaded image if available */
      <div>
       {uploadedFile && uploadedFile instanceof Blob && (
        <div>
          <img src={URL.createObjectURL(uploadedFile)} alt="uploaded" style={{ width: "100%" }} />
        </div>
      )}
       
      </div>
    )}
  </button>
</div>
  );
};

export default Upload