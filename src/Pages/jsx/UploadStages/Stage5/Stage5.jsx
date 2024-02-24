import React from "react";
import { useState } from "react";
import u5css from "./Stage5.module.css";
import useFile from "../../../../Hooks/useFile";

export default function Stage5JSX({setHasSelected}) {
  const [chosenCat, setChosenCat] = useState("");
  const HandleChoose = (e) => {
    setChosenCat(e.target.value);
    setHasSelected(true)
  };
  return (
    <div className={`${u5css[`panel`]}`}>
      <p>Loại bài nghiên cứu là gì?</p>
      <div className={`${u5css[`choices`]}`}>
        {/* <Options
          name="Research Paper"
          setChosenCat={HandleChoose}
          chosenCat={chosenCat}
        />
        <Options
          name="Review Paper"
          setChosenCat={HandleChoose}
          chosenCat={chosenCat}
        /> */}
        <Options
          name="Research Proposal"
          setChosenCat={HandleChoose}
          chosenCat={chosenCat}
          vname="Đề xuất nghiên cứu"
        />
        <Options
          name="Scientific Poster"
          setChosenCat={HandleChoose}
          chosenCat={chosenCat}
          vname="Poster khoa học"
        />
        <Options
          name="Research Report"
          setChosenCat={HandleChoose}
          chosenCat={chosenCat}
          vname="Báo cáo nghiên cứu"
        />
      </div>
    </div>
  );
}

const Options = ({ name, setChosenCat, chosenCat, vname }) => {
  const { file ,setFile } = useFile();

  return (
    <div
      className={`${u5css[`option`]} ${
        chosenCat === name ? u5css[`chosen`] : u5css[`not-chosen`]
      } `}
    >
      <input
        type="radio"
        id={name + "type"}
        name="option"
        className={`${u5css[`radio-button`]}`}
        value={name}
        onChange={(e) => {
          setFile({...file, paperType: e.target.value})
          setChosenCat(e);
        }}
      />
      <label for={name + "type"} className={`${u5css[`primary-label-5`]}`}>
      <div className={`${u5css[`before-primary-label`]} ${chosenCat === name ? u5css[`chosen-label`] : u5css[`not-chosen`]}`}></div>
        <span>{name} ({vname})</span>
      </label>
    </div>
  );
};
