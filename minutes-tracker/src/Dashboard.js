import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CourseCard from "./components/CourseCard";
import Modal from "react-modal";
import EditModal from "./components/EditModal";
import ConfirmModal from "./components/ConfirmModal";
import {
  getEnrolled,
  getCreatedCourses,
  deleteCourse,
} from "./services/userService";
import { modalStyle } from "./utils";
import { getCurrentUser } from "./services/authService";

Modal.setAppElement("#root");

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [isFaculty, setIsFaculty] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [modalCourse, setModalCourse] = useState();
  const [updateCourse, setUpdateCourse] = useState();
  const [courseId, setCourseId] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsFaculty(currentUser.isFaculty);
    if (currentUser.isFaculty) {
      //if the user is a faculty get the courses created by the facutly
      getCreatedCourses(currentUser.id).then((res) => {
        const data = res.data;
        setCourses(data);
      });
    } else {
      //if the user is a student get enrolled courses
      getEnrolled(currentUser.id).then((res) => {
        const data = res.data;
        setCourses(data);
      });
    }
  }, []);

  function openModal(course, updateCourse) {
    setModalCourse(course);
    if (updateCourse !== undefined) {
      setUpdateCourse(() => updateCourse);
    }
    setIsOpen(true);
  }

  function openConfirmModal(courseId) {
    setCourseId(courseId);
    setIsConfirmOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setIsConfirmOpen(false);
  }

  function deleteCourseData(courseId) {
    deleteCourse(courseId)
      .then((res) => {
        const newCourseList = courses.filter(
          (course) => course._id !== courseId
        );
        setCourses(newCourseList);
        setIsConfirmOpen(false);
      })
      .catch((err) => console.log(err));
  }

  function addCourse(courseId) {
    const newCourses = courses.concat(courseId);
    setCourses(newCourses);
  }

  return (
    <div className="box">
      <Navbar isFaculty={isFaculty} addCourse={addCourse} />
      <div className="container text-center box">
        <h1>Home</h1>
        <p>Below is a list of courses you are currently enrolled in</p>
        <div className="container">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              course={course}
              isFaculty={isFaculty}
              openModal={openModal}
              openConfirmModal={openConfirmModal}
            />
          ))}
        </div>
        <Modal isOpen={isOpen} style={modalStyle}>
          <EditModal
            course={modalCourse}
            close={closeModal}
            updateCourse={updateCourse}
            isFaculty={isFaculty}
          />
        </Modal>
        <Modal isOpen={isConfirmOpen} style={modalStyle}>
          <ConfirmModal
            heading={"Delete Course"}
            description={
              <p className="text-center text-danger">
                Warning: Deleting this course will <b>perminately </b>the course
                data. Are you sure you wish to continue?
              </p>
            }
            courseId={courseId}
            closeModal={closeModal}
            deleteCourse={deleteCourseData}
          />
        </Modal>
      </div>
    </div>
  );
}

export default Dashboard;
