import { useContext } from "react";
import classes from "./HistoryTable.module.css";
import { dataContext } from "../../contexts/appContext";
import getFormattedData from "../../utils/getFormattedDate.js";
import { addCommaSeparator } from "../../utils/addCommaSeparator.js";
import exportCSV from "../../utils/exportCSV.js";
import Button from "../UI/Button/Button.jsx";
const HistoryTable = () => {
  const { storedData, resetHistory } = useContext(dataContext);
  const history = storedData.history;

  const resetHandler = () => {
    if (window.confirm("Do you want to reset the history?")) {
      resetHistory();
    }
    const saveHistoryHandler = () => {
      exportCSV();
    };
  };

  return (
    <div className={classes.historyTableContainer}>
      <table className={classes.historyTable} border={1}>
        <thead className={classes.historyTableHead}>
          <tr>
            <th colSpan="1">#</th>
            <th colSpan="1">Date</th>
            <th colSpan="3">Tables</th>
            <th colSpan="3">Play Stations</th>
            <th colSpan="3">Snooker</th>
            <th>Extras</th>
            <th>Total</th>
          </tr>
          <tr>
            <th colSpan="1"></th>
            <th colSpan="1"></th>
            <th colSpan="1">Time</th>
            <th colSpan="1">Extra</th>
            <th colSpan="1">Total</th>
            <th>Time</th>
            <th>Extra</th>
            <th>Total</th>
            <th>Time</th>
            <th>Extra</th>
            <th>Total</th>

            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className={classes.historyTableBody}>
          {Object.keys(history).map(
            (k, index) =>
              k != "sum" && (
                <tr className={classes.historyRow} key={index}>
                  <td colSpan={"1"}>{k}</td>
                  {history[k]["date"] ? (
                    <td>{history[k]["date"]}</td>
                  ) : (
                    <td> </td>
                  )}
                  <td>{addCommaSeparator(history[k]["Tables"]["time"])}</td>
                  <td>{addCommaSeparator(history[k]["Tables"]["extras"])}</td>
                  <td>{addCommaSeparator(history[k]["Tables"]["total"])}</td>
                  <td>
                    {addCommaSeparator(history[k]["Play Stations"]["time"])}
                  </td>
                  <td>
                    {addCommaSeparator(history[k]["Play Stations"]["extras"])}
                  </td>
                  <td>
                    {addCommaSeparator(history[k]["Play Stations"]["total"])}
                  </td>

                  <td>
                    {history[k].Snooker
                      ? addCommaSeparator(history[k]["Snooker"]["time"])
                      : 0}
                  </td>
                  <td>
                    {history[k].Snooker
                      ? addCommaSeparator(history[k]["Snooker"]["extras"])
                      : 0}
                  </td>
                  <td>
                    {history[k].Snooker
                      ? addCommaSeparator(history[k]["Snooker"]["total"])
                      : 0}
                  </td>

                  <td>{addCommaSeparator(history[k]["extras"]["total"])}</td>
                  <td>{addCommaSeparator(history[k].total)}</td>
                </tr>
              )
          )}
          {history.sum && (
            <tr className={classes.historyRow}>
              <td></td>
              <td>SUM: </td>
              <td>{addCommaSeparator(history.sum.tableTimeSum)}</td>
              <td>{addCommaSeparator(history.sum.tableExtrasSum)}</td>
              <td>{addCommaSeparator(history.sum.tableTotalSum)}</td>

              <td>{addCommaSeparator(history.sum.playStationsTimeSum)}</td>
              <td>{addCommaSeparator(history.sum.playStationsExtrasSum)}</td>
              <td>{addCommaSeparator(history.sum.playStationsTotalSum)}</td>

              <td>{addCommaSeparator(history.sum.snookerTimeSum || 0)}</td>
              <td>{addCommaSeparator(history.sum.snookerExtrasSum || 0)}</td>
              <td>{addCommaSeparator(history.sum.snookerTotalSum || 0)}</td>

              <td>{addCommaSeparator(history.sum.extrasSum)}</td>
              <td>{addCommaSeparator(history.sum.grandTotal)}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Button className={classes.resetButton} onClick={resetHandler}>
        Reset
      </Button>
      {/* <Button onClick={() => exportCSV(history)}>Save</Button> */}
    </div>
  );
};

export default HistoryTable;
