import { useState } from "react";

const Checkbox = ({ label, checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const onClick = () =>{
    setIsChecked((prev) => !prev)
    onChange(isChecked)
  };

  return (
    <div className="checkbox-wrapper">
        <label>
            <input type="checkbox" className={isChecked ? "checked" : ""} checked={isChecked} onChange={() => onClick()}/>
            {label}
        </label>                      
    </div>
  );
};
export default Checkbox;