import React, { useState, useContext } from "react";
import { dataContext } from "../../contexts/appContext";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

const SingleExtra = () => {
  const { setStoredData } = useContext(dataContext);
  const [extra, setExtra] = useState(0);

  const formSubmitHandle = (event) => {
    event.preventDefault();
    setStoredData((prevState) => ({
      ...prevState,
      total: prevState.total + +extra,
      2: { ...prevState[2], amount: prevState[2].amount + +extra },
    }));
    setExtra(0);
  };

  const inputChangeHandle = (event) => {
    setExtra(+event.target.value);
  };

  return (
    <div>
      <form onSubmit={formSubmitHandle}>
        <label>Add extra: </label>
        <Input value={extra} onChange={inputChangeHandle} />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

export default SingleExtra;
