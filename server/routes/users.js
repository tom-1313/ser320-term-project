const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const Course = require("../models/course");
const UserCourse = require("../models/userCourse");
const passport = require("passport");
const Verify = require("./verify");

//Authenticates the login information
userRouter.post("/login", passport.authenticate("local"), async (req, res) => {
  await User.findOne({ email: req.body.email })
    .then((user) => {
      const token = Verify.getToken(user);

      return res.status(200).send(token);
    })
    .catch((err) => {
      res.send(err);
    });
});

//Logs the user out of the application
userRouter.post("/logout", async (req, res) => {
  req.logout();
  res.send({ message: "Successfully logged out" });
});

//Creates a student user account
userRouter.post("/signup", async (req, res) => {
  await User.register(
    new User({ email: req.body.email, isFaculty: req.body.isFaculty }),
    req.body.password
  )
    .then((user) => {
      passport.authenticate("local")(req, res, () => {
        const token = Verify.getToken(user);

        return res
          .status(200)
          .header("x-access-token", token)
          .header("access-control-expose-headers", "x-access-token")
          .send(user);
      });
    })
    .catch((err) => res.send(err));
});

//Enrolls a user in a course and saves it to the UserCourse collection
userRouter.post("/:userId/enroll/:courseId", async (req, res) => {
  await UserCourse.create({
    user: req.params.userId,
    course: req.params.courseId,
  }).catch((err) => {
    res.send(err);
  });

  Course.findById(req.params.courseId)
    .then((course) => res.send(course))
    .catch((err) => res.send(err));
});

//Enrolls a user in multiple courses and saves it to the UserCourse collection
userRouter.post("/enroll/multiple", async (req, res) => {
  const courseIds = req.body.course_ids;

  //enroll the user in the courses
  await UserCourse.insertMany(req.body.user_course_ids).catch((err) =>
    res.send(err)
  );

  //get the course info
  await Course.find({
    _id: {
      $in: courseIds,
    },
  })
    .then((courses) => {
      res.send(courses);
    })
    .catch((err) => res.send(err));
});

//Gets the courses the user isn't currently enrolled in
userRouter.get(
  "/:userId/course/not/enrolled/",
  Verify.verifyUser,
  async (req, res) => {
    const courseIds = await UserCourse.find(
      { user: req.params.userId },
      { course: 1, _id: 0 }
    ).then((courses) => {
      const courseIds = courses.map((course) => course.course);

      Course.find({ _id: { $nin: courseIds } })
        .then((courses) => {
          res.send(courses);
        })
        .catch((err) => res.send(err));
    });
  }
);

//Gets all the users enrolled in course
userRouter.get("/enrolled/:courseId", Verify.verifyUser, async (req, res) => {
  await UserCourse.find({ course: req.params.courseId })
    .then((enrolled) => res.send(enrolled))
    .catch((err) => res.send(err));
});

//Gets all the courses a faculty created
userRouter.get("/:userId/created", async (req, res) => {
  await Course.find({ faculty: req.params.userId })
    .then((courses) => res.send(courses))
    .catch((err) => res.send(err));
});

//Gets all the course names the given user is enrolled in from the UserCourse collection
userRouter.get("/:userId/enrolled", Verify.verifyUser, async (req, res) => {
  await UserCourse.find({ user: req.params.userId }, { course: 1, _id: 0 })
    .then((courses) => {
      const courseIds = [];
      courses.forEach((course) => courseIds.push(course.course));
      Course.find({ _id: { $in: courseIds } })
        .then((c) => res.send(c))
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
});

userRouter
  .route("/course")

  //Creates a course
  .post(Verify.verifyUser, Verify.verifyFaculty, async (req, res) => {
    await Course.create(req.body)
      .then((course) => res.send(course))
      .catch((err) => res.send(err));
  })

  //Gets all courses in the database
  .get(async (req, res) => {
    await Course.find({}, { name: 1 })
      .then((courses) => res.send(courses))
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
  .put(Verify.verifyUser, Verify.verifyFaculty, async (req, res) => {
    const filter = req.params.courseId;
    const update = req.body;
    await Course.findByIdAndUpdate(filter, update, { new: true })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => res.status(500).send(err));
  })

  //Delete the course with the given courseId from the courses collection
  .delete(Verify.verifyUser, Verify.verifyFaculty, async (req, res) => {
    await Course.findByIdAndRemove(req.params.courseId)
      .then((result) => {
        UserCourse.remove({ course: req.params.courseId }).then((result) => {
          res.status(200).send({ message: "Course deleted" });
        });
      })
      .catch((err) => res.status(500).send(err));
  });

//Adds an entry to a course under the courses collection
userRouter
  .route("/course/:courseId/entry")

  .post(async (req, res) => {
    await Course.findById(req.params.courseId)
      .then((course) => {
        course.entry.push(req.body);
        course.save();
        res.send(course);
      })
      .catch((err) => res.send(err));
  })

  .get(Verify.verifyUser, Verify.verifyFaculty, async (req, res) => {
    await Course.findById(req.params.courseId)
      .then((course) => {
        res.send(course.entry);
      })
      .catch((err) => res.send(err));
  });

module.exports = userRouter;
