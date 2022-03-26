const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const Course = require("../models/course");
const UserCourse = require("../models/userCourse");
//const course = require("../models/course");
const bodyParser = require('body-parser');

//Authenticates the login information
userRouter.post("/login", async (req, res) => {
  //TODO: Implement after user authenitatication lesson
  console.log(req.body);
  await User.findOne({ email: req.body.email })
    .then((user) => {
      if (user.password === req.body.password) {
        res.send("Success");
      }
      res.send("Invalid user/pass");
    })
    .catch((err) => {
      res.send(err);
    });
});

//Logs the user out of the application
userRouter.post("/logout", async (req, res) => {
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

  //Get a course with the given courseId
  .get(async (req, res) => {

    await Course.findById(req.params.courseId)
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(500).send(err));
  })

  //Update a course's information
  .put(async (req, res) => {
    const filter = req.params.courseId;
    const update = req.body;
    await Course.findByIdAndUpdate(filter, update, { new: true })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => res.status(500).send(err));
  })

  //Delete the course with the given courseId from the courses collection
  .delete(async (req, res) => {
    await Course.findByIdAndRemove(req.params.courseId)
      .then((result) =>
        res
          .status(200)
          .send(
            result +
              "Course with id " +
              req.params.courseId +
              " successfully deleted."
          )
      )
      .catch((err) => res.status(500).send(err));
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
