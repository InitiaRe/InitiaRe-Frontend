import React from "react";
import useFile from "../../../../Hooks/useFile";
import useAuth from "../../../../Hooks/useAuth";
import useCategories from "../../../../Hooks/useCategories";
import useSubCategories from "../../../../Hooks/useSubCategories";

export default function Stage6JSX() {
  const { category } = useCategories();
  const {subCategory} = useSubCategories();
  const { file } = useFile();
  const { auth } = useAuth();

  const handleClick = () => {
    if (!file) {
      console.log("There is no file as of now, please upload one");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    uploadFile(fd);
  };

  const uploadFile = async (fd) => {
    await fetch(
      "https://initiare-website-2603191647bb.herokuapp.com/api/v1/storage/media/upload",
      {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: "Bearer " + auth.accessToken,
        },
        body: fd,
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data.res.download_url)); //change later when user download is viable
  };

  return (
    <>
      <button onClick={handleClick}>Upload File</button>
      <button
        onClick={() => {
          console.log(category);
          console.log(subCategory)
        }}
      >
        Check if all categories works until stage 6
      </button>
    </>
  );
}
