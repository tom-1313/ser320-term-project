const axios = require("axios");

// Note you will need a new course id after running this script
const userId = "623e946348e98325e21d2222"
const courseId = "623e94a6407997a050f4691c"

axios
  .post(`http://localhost:8080/user/signup`, {
    email: "sspinner@quinnipiac.edu",
    password: "3210",
    isFaculty: true,
  })
  .then((response) => {
    const userData = response.data;
    console.log("TESTING ENDPOINT: POST /signup");
    console.log(userData);
  })
  .catch(function (error) {
    console.log(error);
  });

axios
  .post("http://localhost:8080/user/course", {
    name: "SER330",
    totalLesson: "39",
    entry: [],
  })
  .then((response) => {
    const userData = response.data;
    console.log("TESTING ENDPOINT: POST /course");
    console.log(userData);
  })
  .catch(function (error) {
    console.log(error);
  });

axios
  .post(
    `http://localhost:8080/user/enroll/${userId}/${courseId}`
  )
  .then((response) => {
    const userData = response.data;
    console.log("TESTING ENDPOINT: POST /enroll/:userId/:courseId");
    console.log(userData);
  })
  .catch(function (error) {
    console.log(error);
  });

axios
  .get(`http://localhost:8080/user/enrolled/${userId}`)
  .then(function (response) {
    console.log("TESTING ENDPOINT: GET /enrolled/:userId");
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {});

axios
  .get(`http://localhost:8080/user/course/${courseId}`)
  .then(function (response) {
    console.log("TESTING ENDPOINT: GET /course/:courseId");
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {});

axios
  .put(`http://localhost:8080/user/course/${courseId}`, {
    name: "SER120",
  })
  .then(function (response) {
    console.log("TESTING ENDPOINT: PUT /course/:courseId");
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {});

const entry = {
  lesson: 2,
  project: 0,
  homework: 10,
  study: 1,
  student: "622ebfe60472d3469846b2b6",
};

axios
  .post(
    `http://localhost:8080/user/course/${courseId}/entry`,
    entry
  )
  .then((response) => {
    console.log("TESTING ENDPOINT: POST /course/:courseId/entry");
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

axios
  .delete(`http://localhost:8080/user/course/${courseId}`)
  .then(function (response) {
    console.log("TESTING ENDPOINT: DELETE /course/:courseId");
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
