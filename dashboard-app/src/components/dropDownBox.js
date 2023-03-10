import React, { useEffect, useState } from "react";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};


const Dropdown = ({ placeHolder, options, onChange }) => {
    const [showMenu, setShowMenu] = useState(false);// to be used to show the selection of items
    const [selectedValue, setSelectedValue] = useState(null);// to be used to show the currently selected items

    useEffect(() => {
        const handler = () => setShowMenu(false);

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    });
    
    const handleInputClick = (e) => {// handles when a selection is made
        e.stopPropagation();
        setShowMenu(!showMenu);// removes the dropdown box from the page after selection is made
    };

  const getDisplay = () => {
    if( selectedValue ) return selectedValue.label;// shows the correect item selected

    return placeHolder;// otherwise the box returns "Select..."
  };

  const onItemClick = (option) => {// sets the value of selectedValue
    setSelectedValue(option);
    onChange(option.value);
  };

  const isSelected = (option) => {
    if( !selectedValue ) return false;

    return selectedValue.value === option.value;
  }

  return (
    <div className="dropdown-container">
      <div onClick={handleInputClick} className="dropdown-input">
      <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            <Icon />
          </div>
        </div>
        {showMenu && (
        <div className="dropdown-menu"> 
            {options.map((option) => (
                <div onClick={() => onItemClick(option)}
                key={option.value}
                className={`dropdown-item ${isSelected(option) && "selected"}`}>
                    {option.label}
                </div>              
            ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;