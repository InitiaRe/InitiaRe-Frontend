import { /*faC,*/ faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

import useFile from "../../../../Hooks/useFile";
import u4css from "./Stage4.module.css";

export default function Stage4JSX({ setHasSelected }) {
  useEffect(() => setHasSelected(true));
  return (
    <div className={`${u4css[`panel`]}`}>
      <p className={`${u4css[`primary-question`]}`}>
        Bài báo của bạn còn gồm chủ đề nào liên quan nữa không? (Có thể chọn
        nhiều hơn 1)
        <br />
        <span>Nếu không có, hãy nhấn "Next"</span>
      </p>
      <div className={`${u4css[`choices`]}`}>
        <div className={`${u4css[`option-wrapper`]}`}>
          <p className={`${u4css[`option-header`]}`}>Natural Sciences (KHTN)</p>
          <Options name="Life Sciences" vname="Khoa học Sự sống" />
          <Options name="Physical Sciences" vname="Khoa học Vật chất" />
          <Options name="Earth Sciences" vname="Khoa học Trái Đất" />
          <Options
            name="Medical and Health"
            vname="Khoa học Y Khoa & Sức khoẻ"
          />
          <Options name="Mathematics" vname="Toán học" />
          <Options
            name="Formal Sciences"
            vname="Công nghệ Thông tin-Khoa học Hình thức"
          />
        </div>

        <div className={`${u4css[`option-wrapper`]}`}>
          <p className={`${u4css[`option-header`]}`}>Social Sciences (KHXH)</p>
          <Options name="Social Studies" vname="Khoa học xã hội" />
          <Options name="Economics" vname="Kinh tế học" />
          <Options name="Psychology" vname="Tâm lý học" />
          <Options name="Education" vname="Giáo dục" />
          <Options name="Culture and Arts" vname="Văn hóa & Nghệ thuật" />
        </div>
      </div>
    </div>
  );
}

const Options = ({ name, vname }) => {
  const { file, setFile } = useFile();
  const [isChosen, setIsChosen] = useState(false);

  function handleChange(e) {
    setIsChosen(!isChosen);
    let { value, checked } = e.target;

    if (checked) {
      setFile({ ...file, subCategory: [...file.subCategory, value] });
    } else if (!checked) {
      const newSubCategories = file.subCategory.filter((cat) => cat !== value);
      setFile({ ...file, subCategory: newSubCategories });
    }
  }
  // eslint-disable-next-line

  // FIX this
  // useEffect(() => {
  //   const newSubCategories = subCategory.filter(cat => cat !== category)
  //   setSubCategory(newSubCategories)
  //   if (category === name) setIsChosen(false)
  // }, [file.category, name, setFile, file.subCategory])

  return (
    <div
      className={`${u4css[`option`]} ${
        file.category !== name ? u4css[`vacant`] : u4css[`not-vacant`]
      } ${isChosen ? u4css[`chosen`] : u4css[`not-chosen`]}`}
    >
      {file.category !== name ? (
        <input
          type="checkbox"
          id={"Secondary" + name}
          name="option"
          className={`${u4css[`checkbox`]}`}
          value={name}
          onChange={handleChange}
        />
      ) : null}

      <label
        htmlFor={"Secondary" + name}
        className={`${u4css[`secondary-label`]} ${
          file.category !== name ? u4css[`vacant`] : u4css[`not-vacant-label`]
        }`}
      >
        <div
          className={`${u4css[`before-secondary-label`]} ${isChosen ? u4css[`chosen-label`] : u4css[`not-chosen`]}`}
        >
          {isChosen && <FontAwesomeIcon icon={faCheck} />}{" "}
          {file.category === name && <FontAwesomeIcon icon={faCheck} />}
        </div>
        <span>{vname}</span>
      </label>
    </div>
  );
};
