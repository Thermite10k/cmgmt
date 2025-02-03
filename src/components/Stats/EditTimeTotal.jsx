import React, { useContext, useState } from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { dataContext } from "../../contexts/appContext";
import { addCommaSeparator } from "../utils/addCommaSeparator";
import classes from "./EditTimeTotal.module.css";
const EditTimeTotal = () => {
  const [inputVal, setInputVal] = useState(0);
  const { setStoredData } = useContext(dataContext);
  const editFormSubmitHandle = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());
    setInputVal(0);

    if (formJson.editBy.length > 0 && !isNaN(inputVal)) {
      const key = formJson.selectedService;

      setStoredData((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          time: prevState[key].time + +formJson.editBy,
          total: prevState[key].total + +formJson.editBy,
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
        <label>Edit by: {addCommaSeparator(inputVal)} Rials</label>
        <div>
          <Input onChange={(e) => setInputVal(+e.target.value)} name="editBy" />
          <Button type="submit">submit</Button>
        </div>
      </form>
    </div>
  );
};

export default EditTimeTotal;
