import React, { useState } from "react";
import u3css from "./Stage3.module.css";
import useCategories from "../../../../Hooks/useCategories";

export default function Stage3JSX() {
  const [chosenCat, setChosenCat] = useState("");
  const HandleChoose = (e) => {
    setChosenCat(e.target.value);
  }
  return (
    <div className={`${u3css[`panel`]}`}>
      <p className={`${u3css[`primary-question`]}`}>
        What is the PRIMARY area of study of your paper?
        <br />
        <span>(Please choose one only)</span>
      </p>
      <div className={`${u3css[`choices`]}`}>
        <div className={`${u3css[`option-wrapper`]}`}>
          <p className={`${u3css[`option-header`]}`}>Natural Sciences</p>
          <Options name="Life Sciences" setChosenCat={HandleChoose} chosenCat={chosenCat}/>
          <Options name="Physical Sciences" setChosenCat={HandleChoose} chosenCat={chosenCat}/>
          <Options name="Earth Sciences" setChosenCat={HandleChoose} chosenCat={chosenCat}/>
          <Options name="Medical and Health" setChosenCat={HandleChoose} chosenCat={chosenCat}/>
          <Options name="Mathematics" setChosenCat={HandleChoose} chosenCat={chosenCat}/>
          <Options name="Formal Sciences" setChosenCat={HandleChoose} chosenCat={chosenCat}/>
        </div>

        <div className={`${u3css[`option-wrapper`]}`}>
          <p className={`${u3css[`option-header`]}`}>Social Sciences</p>
          <Options name="Social Studies" setChosenCat={HandleChoose} chosenCat={chosenCat}/>
          <Options name="Humanities" setChosenCat={HandleChoose} chosenCat={chosenCat}/>
        </div>
      </div>
    </div>
  );
}

const Options = ({ name, setChosenCat, chosenCat }) => {
  const {category, setCategory} = useCategories();
  
  return (
    <div className={`${u3css[`option`]} ${chosenCat === name ? u3css[`chosen`] : u3css[`not-chosen`]} `}>
      <input 
        type="radio"
        id={"Primary" + name}
        name="option"
        className={`${u3css[`radio-button`]}`}
        value={name}
        onChange={(e) => {
          setCategory(e.target.value);
          setChosenCat(e)
        }}
      />
      <label for={"Primary" + name} className={`${u3css[`primary-label`]}`}>
        <div className={`${u3css[`before-primary-label`]} ${chosenCat === name ? u3css[`chosen-label`] : u3css[`not-chosen`]}`}></div>
        <span>{name}</span>
      </label>
    </div>
  );
};
