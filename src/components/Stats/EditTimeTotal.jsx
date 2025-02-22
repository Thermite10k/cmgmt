import React, { useContext, useState, useRef } from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { dataContext } from "../../contexts/appContext";
import { addCommaSeparator } from "../../utils/addCommaSeparator";
import classes from "./EditTimeTotal.module.css";
const EditTimeTotal = () => {
  const [inputVal, setInputVal] = useState(0);
  const { setStoredData } = useContext(dataContext);
  const inputRef = useRef();
  const editFormSubmitHandle = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());
    setInputVal(0);
    inputRef.current.value = null;

    if (formJson.editBy.length > 0 && !isNaN(inputVal)) {
      const key = formJson.selectedService;

      setStoredData((prevState) => ({
        ...prevState,
        services: {
          ...prevState.services,
          [key]: {
            ...prevState.services[key],
            time: prevState.services[key].time + +formJson.editBy,
            total: prevState.services[key].total + +formJson.editBy,
          },
        },
        total: prevState.total + +formJson.editBy,
      }));
    }
  };
  return (
    <div>
      <form className={classes.form} onSubmit={editFormSubmitHandle}>
        <label>
          Select a service to edit:
          <select name="selectedService">
            <option value={"Tables"}>Tables</option>
            <option value={"Play Stations"}>Play Stations</option>
          </select>
        </label>
        <label>
          Edit by:{" "}
          {inputVal != 0 && !isNaN(inputVal) ? addCommaSeparator(inputVal) : 0}{" "}
          Rials
        </label>
        <div>
          <Input
            ref={inputRef}
            onChange={(e) => setInputVal(+e.target.value)}
            name="editBy"
          />
          <Button type="submit">submit</Button>
        </div>
      </form>
    </div>
  );
};

export default EditTimeTotal;
