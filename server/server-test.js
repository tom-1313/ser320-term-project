const axios = require('axios');


  axios.post("http://localhost:8080/user/signup", {email: "sspinner@quinnipiac.edu", password: "3210", isFaculty: true})
  .then(response => {
     const userData = response.data
     console.log(userData)
  })
  .catch(function (error) {
    console.log(error);
  });


  axios.post("http://localhost:8080/user/course", {name: "SER330", totalLesson: "39", entry: []})
  .then(response => {
     const userData = response.data
     console.log(userData)
  })
  .catch(function (error) {
    console.log(error);
  });


  axios.post("http://localhost:8080/user/enroll/623e7719c74844e148d5d1c5/622ec1910472d3469846b2ba")
  .then(response => {
     const userData = response.data
     console.log(userData)
  })
  .catch(function (error) {
    console.log(error);
  });


  axios.get('http://localhost:8080/user/enrolled/623e7749c74844e148d5d1cb')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
  });


  axios.get('http://localhost:8080/user/course/622ec1910472d3469846b2ba')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
  });


  axios.put('http://localhost:8080/user/course/622ec1910472d3469846b2ba',{ name: "SER120"})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
  });


  const entry = {
    lesson: 2,
    project: 0,
    homework: 10,
    study: 1,
    student: "622ebfe60472d3469846b2b6"
  }
  
  axios.post("http://localhost:8080/user/course/622fef2d86cf67e0f905c325/entry", entry)
    .then(response => {
       console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });


  axios.delete('http://localhost:8080/user/course/622ec1910472d3469846b2ba')
  .then(function (response) {
  console.log(response);
  })
  .catch(function (error) {
  console.log(error);
  })
  .then(function () {
  });