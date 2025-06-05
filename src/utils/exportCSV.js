const exportCSV = (data) => {
  console.log(data);
  let dataArray = [];

  dataArray.push(["#,Date,,tables,,,playstations,,extras,total,\n"]);

  Object.keys(data).map((k, v) => {
    if (k !== "sum") {
      dataArray.push(`${k},`);
      Object.keys(data[k]).map((k2, v2) => {
        Object.keys(data[k][k2]).map((k3, v3) => {});
      });
      dataArray.push("\n");
    }
    //dataArray.push(Object.values(data[k]).join(","));
  });
  //console.log(dataArray);

  const blob = new Blob([dataArray], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  window.open(url);
};

export default exportCSV;
