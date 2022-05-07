import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CourseCard from "./components/CourseCard";
import Modal from "react-modal";
import EditModal from "./components/EditModal";
import { getEnrolled, getCreatedCourses } from "./services/userService";
import { modalStyle } from "./utils";

Modal.setAppElement("#root");

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [isFaculty, setIsFaculty] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [modalCourse, setModalCourse] = useState();
  const [updateCourse, setUpdateCourse] = useState();

  useEffect(() => {
    //TODO: Get the user isFaculty from the token
    if (isFaculty) {
      //if the user is a faculty get the courses created by the facutly
      getCreatedCourses("622ebfe60472d3469846b2b6").then((res) => {
        const data = res.data;
        setCourses(data);
      });
    } else {
      //if the user is a student get enrolled courses
      getEnrolled("622ebfe60472d3469846b2b6").then((res) => {
        const data = res.data;
        setCourses(data);
      });
    }
  }, []);

  function openModal(course, updateCourse) {
    setModalCourse(course);
    setUpdateCourse(() => updateCourse);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Navbar />
      <div className="container text-center">
        <h1>Dashboard</h1>
        <p>Below are a list of courses you are currently enrolled in</p>
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            course={course}
            isFaculty={isFaculty}
            openModal={openModal}
          />
        ))}
      </div>
      <Modal isOpen={isOpen} style={modalStyle}>
        <EditModal
          course={modalCourse}
          close={closeModal}
          updateCourse={updateCourse}
        />
      </Modal>
    </div>
  );
}

export default Dashboard;
