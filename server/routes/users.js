const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const Course = require("../models/course");
const UserCourse = require("../models/userCourse");

//Authenticates the login information
userRouter.post("login", async (req, res) => {
  //TODO: Implement after user authenitatication lesson
});

//Logs the user out of the application
userRouter.post("logout", async (req, res) => {
  //TODO: Implement after user authenitatication lesson
});

//Creates a student user account
//TODO: Hash password after learning to encrypt data
userRouter.post("/signup", async (req, res) => {
  await User.create(req.body)
    .then((user) => res.send(user))
    .catch((err) => res.send(err));
});

//Enrolls a user in a course and saves it to the UserCourse collection
userRouter.post("/enroll/:userId/:courseId", async (req, res) => {
  await UserCourse.create({
    user: req.params.userId,
    course: req.params.courseId,
  })
    .then((userCourse) => {
      res.send(userCourse);
    })
    .catch((err) => {
      res.send(err);
    });
});

//Gets all the course names the given user is enrolled in from the UserCourse collection
userRouter.get("/enrolled/:userId", async (req, res) => {
  await UserCourse.find({ user: req.params.userId }, { course: 1, _id: 0 })
    .then((courses) => {
      const courseIds = [];
      courses.forEach((course) => courseIds.push(course.course));
      Course.find({ _id: { $in: courseIds } }, { name: 1, _id: 0 })
        .then((c) => res.send(c))
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
});

//Creates a course
userRouter.post("/course", async (req, res) => {
  await Course.create(req.body)
    .then((course) => res.send(course))
    .catch((err) => res.send(err));
});

userRouter
  .route("/course/:courseId")

  .get(async (req, res) => {
    //TODO: Get a course with the given courseId from the courses collection. This is for REQ-7
  })

  .put(async (req, res) => {
    //TODO: Update information of a course in the courses collection. See REQ-5
  })

  .delete(async (req, res) => {
    //TODO: Delete a course from the courses collection. See REQ-10
  });

//Adds an entry to a course under the courses collection
userRouter.post("/course/:courseId/entry", async (req, res) => {
  await Course.findById(req.params.courseId)
    .then((course) => {
      course.entry.push(req.body);
      course.save();
      res.send(course);
    })
    .catch((err) => res.send(err));
});

module.exports = userRouter;
