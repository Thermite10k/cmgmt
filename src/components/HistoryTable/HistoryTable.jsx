import { useContext } from "react";
import classes from "./HistoryTable.module.css";
import { dataContext } from "../../contexts/appContext";
import getFormattedData from "../../utils/getFormattedDate.js";
import Button from "../UI/Button/Button.jsx";
const HistoryTable = () => {
  const { storedData, resetHistory } = useContext(dataContext);
  const history = storedData.history;

  const resetHandler = () => {
    if (window.confirm("Do you want to reset the history?")) {
      resetHistory();
    }
  };

  return (
    <div className={classes.historyTableContainer}>
      <table className={classes.historyTable} border={1}>
        <thead className={classes.historyTableHead}>
          <tr>
            <th colSpan="1">Date</th>
            <th colSpan="3">Tables</th>
            <th colSpan="3">Play Stations</th>
            <th>Extras</th>
            <th>Total</th>
          </tr>
          <tr>
            <th colSpan="1"></th>
            <th colSpan="1">Time</th>
            <th colSpan="1">Extra</th>
            <th colSpan="1">Total</th>
            <th>Time</th>
            <th>Extra</th>
            <th>Total</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className={classes.historyTableBody}>
          {Object.keys(history).map((k, index) => (
            <tr className={classes.historyRow} key={index}>
              <td colSpan={"1"}>{k}</td>
              <td>{history[k]["Tables"]["time"]}</td>
              <td>{history[k]["Tables"]["extras"]}</td>
              <td>{history[k]["Tables"]["total"]}</td>
              <td>{history[k]["Play Stations"]["time"]}</td>
              <td>{history[k]["Play Stations"]["extras"]}</td>
              <td>{history[k]["Play Stations"]["total"]}</td>
              <td>{history[k]["extras"]["total"]}</td>
              <td>{history[k].total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button className={classes.resetButton} onClick={resetHandler}>
        Reset
      </Button>
    </div>
  );
};

export default HistoryTable;
