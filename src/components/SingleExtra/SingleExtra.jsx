import React, { useState, useContext } from "react";
import { dataContext } from "../../contexts/appContext";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import classes from "./SingleExtra.module.css";
import { addCommaSeparator } from "../utils/addCommaSeparator";

const SingleExtra = () => {
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
  };

  const inputChangeHandle = (event) => {
    setExtra(+event.target.value);
    // just a test...
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandle}>
      <label>Add extra: {addCommaSeparator(extra)} Rials</label>
      <div>
        <Input onChange={inputChangeHandle} />
        <Button type="submit">Add</Button>
      </div>
    </form>
  );
};

export default SingleExtra;
