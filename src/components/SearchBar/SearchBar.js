import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import searchIcon from "../../icons/search-icon.svg";
import styles from "./SearchBar.module.css";

const { root, inputFrame, labelBtn } = styles;

const SearchBar = ({ defaultValue, onSubmit }) => {
  const [inputVal, setInputVal] = useState(defaultValue);
  const inputRef = useRef();

  const submit = () => {
    const { value } = inputRef.current;
    setInputVal(value);
    onSubmit(value);
  };

  const onEnterPress = ({ target: { value }, key }) => {
    if (key === "Enter") submit();
  };

  const clearValue = () => {
    setInputVal("");
  };

  useEffect(() => {
    if (!inputVal) {
      inputRef.current.focus();
    }
  }, [inputVal]);

  return (
    <div className={root}>
      <button className={labelBtn} onClick={clearValue}>
        {inputVal}
      </button>
      <div
        className={inputFrame}
        style={{ display: inputVal ? "none" : "flex" }}
      >
        <input
          ref={inputRef}
          type="text"
          tabIndex="1"
          defaultValue={defaultValue}
          onKeyDown={onEnterPress}
        />
        <button onClick={submit}>
          <img src={searchIcon} alt="search" />
        </button>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  defaultValue: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
