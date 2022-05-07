import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CourseCard from "./components/CourseCard";
import { getEnrolled } from "./services/userService";

function Dashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    //TODO: Get the user isFaculty from the token
    getEnrolled("622ebfe60472d3469846b2b6")
      .then((res) => {
        const data = res.data;
        setCourses(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Dashboard</h1>
        {courses.map((course, index) => <CourseCard key={index} course={course} isFaculty="false"/>)}
      </div>
    </div>
  );
}

export default Dashboard;
