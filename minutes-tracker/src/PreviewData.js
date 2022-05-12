import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import { getCourse, getTotalEnrolled } from "./services/userService";
import { modalStyle } from "./utils";
import Modal from "react-modal";
const XLSX = require("xlsx");

Modal.setAppElement("#root");

function PreviewData(props) {
  const { state: course } = useLocation();
  const [entries, setEntries] = useState();
  const [lessons, setLessons] = useState();
  const [display, setDisplay] = useState(false);
  const [students, setStudents] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entry, setEntry] = useState({
    study: 0,
    project: 0,
    homework: 0,
  });

  useEffect(() => {
    //Query for course
    getCourse(course._id)
      .then((res) => {
        setEntries(res.data.entry);
        setLessons(res.data.totalLesson);

        //Get the total number of enrolled students in the course
        getTotalEnrolled(course._id)
          .then((res) => {
            setStudents(res.data.length);
          })
          .then((res) => setDisplay(true))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  function openModal(entry) {
    setEntry(entry);
    setIsModalOpen((prev) => !prev);
  }

  function closeModal() {
    setIsModalOpen((prev) => !prev);
  }

  function download() {
    const table = document.getElementById("course-table");
    const workbook = XLSX.utils.table_to_book(table);
    const ws = workbook.Sheets["Sheet1"];
    XLSX.utils.sheet_add_aoa(ws, [["Created " + new Date().toISOString()]], {
      origin: -1,
    });
    XLSX.writeFile(workbook, `${course.name}-data.xlsx`);
  }

  return (
    <div>
      <Navbar isFaculty={true} />
      <div className="container text-center">
        <h1>{course.name}</h1>
        <h6>
          Below is each student entry in minutes. The first row is the lesson
          number.
        </h6>
        {display && (
          <table className="table table-layout text-center" id="course-table">
            <TableHeader lessons={course.totalLesson} />
            <TableBody
              lessons={lessons}
              entries={entries}
              students={students}
              openModal={openModal}
            />
          </table>
        )}
        <button className="btn btn-primary" onClick={download}>
          Download Data
        </button>
      </div>
      <Modal isOpen={isModalOpen} style={modalStyle}>
        <div className="text-center container">
          <table className="table">
            <thead>
              <tr>
                <td>Activity</td>
                <td>Time (minutes)</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Study</td>
                <td>{entry.study}</td>
              </tr>
              <tr>
                <td>Homework</td>
                <td>{entry.homework}</td>
              </tr>
              <tr>
                <td>Project</td>
                <td>{entry.project}</td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={closeModal}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default PreviewData;
