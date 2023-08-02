import { useState } from "react";

const CheckLine = ({
  checked,
  toggleCheckbox,
  article_id,
  title,
  articleTitle,
}) => {
  const [checkedState, setCheckedState] = useState(checked);

  const toggleChecked = (e) => {
    setCheckedState(!checkedState);
    toggleCheckbox(e, article_id, title);
  };
  return (
    <div className="flex-center">
      <input
        onChange={toggleChecked}
        type="checkbox"
        name=""
        id=""
        checked={checkedState}
      />
      <p>{articleTitle}</p>
    </div>
  );
};

export default CheckLine;
