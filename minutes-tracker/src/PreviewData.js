import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import { getCourse, getTotalEnrolled } from "./services/userService";

function PreviewData() {
  const [entries, setEntries] = useState();
  const [lessons, setLessons] = useState();
  const [display, setDisplay] = useState(false);
  const [students, setStudents] = useState(0);

  useEffect(() => {
    //Query for course
    getCourse("62703e15b8c8a5679410e129")
      .then((res) => {
        // console.log(res.data);
        console.log(res.data.totalLesson);
        setEntries(res.data.entry);
        setLessons(res.data.totalLesson);
      })
      .catch((err) => console.log(err));

    getTotalEnrolled("62703e15b8c8a5679410e129")
      .then((res) => {
        setStudents(res.data.length);
      })
      .then((res) => setDisplay(true))
      .catch((err) => console.log(err));
    console.log("Fetched all Data")
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Preview Data</h1>
      <p>Below is each student entry in minutes</p>
      {display && (
        <table className="table">
          <TableHeader lessons={15} />
          <TableBody lessons={lessons} entries={entries} students={students} />
        </table>
      )}
    </div>
  );
}

export default PreviewData;
