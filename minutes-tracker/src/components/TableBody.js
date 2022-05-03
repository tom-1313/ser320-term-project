import React, { useState, useEffect } from "react";
import TableData from "./TableData";

function TableBody(props) {
  const [table, setTable] = useState([]);
  const [displayTable, setDisplayTable] = useState(false);

  useEffect(() => {
    //create an object with an array for each lesson
    let course = [];
    for (let i = 1; i <= props.lessons; i++) {
      const lessonEntries = props.entries.filter((entry) => entry.lesson === i);
      course.push(lessonEntries);
    }

    setTable(createTable(course));
    setDisplayTable(true);
    //filter the lessons
  }, []);

  const createTable = (course) => {
    //generate an array of data for each lesson
    let tableData = [];

    //loop through the total number of student
    for (let i = 0; i < props.students; i++) {
      let tds = [];
      //loop through each entry for each lesson
      for (let j = 0; j < course.length; j++) {
        const entry = course[j].pop();
        if (entry === undefined) {
          tds.push(<td key={i + " " + j}>{"N/A"}</td>);
        } else {
          tds.push(<TableData key={i + " " + j} entry={entry} />);
        }
      }
      tableData.push(<tr key={"tr" + i}>{tds}</tr>);
    }
    return tableData;
  };

  return <tbody>
    {displayTable && table}
  </tbody>;
}

export default TableBody;
