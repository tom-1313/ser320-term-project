import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import { getCourse, getTotalEnrolled } from "./services/userService";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function PreviewData() {
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
    getCourse("62703e15b8c8a5679410e129")
      .then((res) => {
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
  }, []);

  function openModal(entry) {
    setEntry(entry);
    setIsModalOpen((prev) => !prev);
  }

  function closeModal() {
    setIsModalOpen((prev) => !prev);
  }

  return (
    <div>
      <Navbar />
      <div className="container text-center">
        <h1>Preview Data</h1>
        <h6>Below is each student entry in minutes</h6>
        {display && (
          <table className="table text-center">
            <TableHeader lessons={15} />
            <TableBody
              lessons={lessons}
              entries={entries}
              students={students}
              openModal={openModal}
            />
          </table>
        )}
      </div>
      <Modal isOpen={isModalOpen} style={customStyles}>
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
