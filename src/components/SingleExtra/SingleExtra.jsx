import React, { useState, useContext, useRef } from "react";
import { dataContext } from "../../contexts/appContext";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import classes from "./SingleExtra.module.css";
import { addCommaSeparator } from "../../utils/addCommaSeparator";

const SingleExtra = () => {
  const inputRef = useRef();
  const { setStoredData } = useContext(dataContext);
  const [extra, setExtra] = useState(0);

  const formSubmitHandle = (event) => {
    event.preventDefault();
    if (!isNaN(extra)) {
      setStoredData((prevState) => ({
        ...prevState,
        total: prevState.total + +extra,
        extras: {
          ...prevState["extras"],
          total: prevState["extras"].total + +extra,
        },
      }));
    }
    setExtra(0);
    inputRef.current.value = null;
  };

  const inputChangeHandle = (event) => {
    setExtra(+event.target.value);
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandle}>
      <label>
        Add extra: {extra != 0 && !isNaN(extra) ? addCommaSeparator(extra) : 0}{" "}
        Rials
      </label>
      <div>
        <Input ref={inputRef} onChange={inputChangeHandle} />
        <Button type="submit">Add</Button>
      </div>
    </form>
  );
};

export default SingleExtra;
