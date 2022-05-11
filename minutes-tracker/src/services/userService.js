import http from "./httpService";
//import the route
const apiUrl = "http://localhost:8080/"
const apiEndpoint = apiUrl + "user";
/**
 * Posts the login data
 *
 * @param {Object} data The login information
 * @return {Object} A JWT token
 */
export function login(data) {
  return http.post(`${apiEndpoint}/login`, data);
}

/** TODO: unimplemented
 * Posts the login data
 *
 * @return {Object} A JWT token
 */
export function logout() {
  return http.post(`${apiEndpoint}/logout`);
}

/**
 * Creates a user account
 *
 * @param {Object} data The information to create an account
 * @return {Object} The created account
 */
export function signup(data) {
  return http.post(`${apiEndpoint}/signup`, data);
}

/**
 * Enrolls the user in a course
 *
 * @param {String} userId The _id of the user
 * @param {String} courseId The _id of the course
 * @return {Object} The userId and courseId
 */
export function enroll(userId, courseId) {
  return http.post(`${apiEndpoint}/${userId}/enroll/${courseId}`);
}

/**
 * Enrolls the user in multiple courses
 *
 * @param {Object} data the data of the courses
 * @return {Object} The new course info
 */
export function enrollMultiple(data) {
  return http.post(`${apiEndpoint}/enroll/multiple`, data);
}

/**
 * Gets all the course names the given user is enrolled in from the UserCourse collection
 *
 * @param {String} userId The _id of the user
 * @return {Object} A list of courses the user is enrolled in
 */
export function getEnrolled(userId) {
  return http.get(`${apiEndpoint}/${userId}/enrolled`);
}


/**
 * Gets all the courses a user is currently not enrolled in
 *
 * @param {String} userId The _id of the user
 * @return {Object} A list of courses the user is not enrolled in
 */
export function getNotEnrolled(userId) {
  return http.get(`${apiEndpoint}/${userId}/course/not/enrolled`);
}

/**
 * Gets all the courses a faculty created
 *
 * @param {String} userId The _id of the user
 * @return {Object} A list of courses the user is enrolled in
 */
export function getCreatedCourses(userId) {
  return http.get(`${apiEndpoint}/${userId}/created`);
}

/**
 * Gets all the courses in the database
 *
 * @return {Object} A list of courses in the database
 */
 export function getAllCourses() {
  return http.get(`${apiEndpoint}/course`);
}

/**
 * Gets all the students enrolled in a course
 *
 * @param {String} courseId The _id of the course
 * @return {Object} A list of students enrolled in a given course
 */
export function getTotalEnrolled(courseId) {
  return http.get(`${apiEndpoint}/enrolled/${courseId}`);
}

/**
 * Creates a course in the database
 *
 * @param {Object} data The information of the course
 * @return {Object} The created course
 */
export function createCourse(data) {
  return http.post(`${apiEndpoint}/course`, data);
}

/**
 * Gets all courses names in the database
 *
 * @return {Object} All course names in the database
 */
export function getCourseNames() {
  return http.get(`${apiEndpoint}/course`);
}

/**
 * Get a course with the given courseId
 *
* @param {String} courseId The _id of the course
 * @return {Object} The course with the given courseId
 */
export function getCourse(courseId) {
  return http.get(`${apiEndpoint}/course/${courseId}`);
}

/**
 * Updates a course information
 *
 * @param {String} courseId The _id of the course
 * @param {Object} data The updated course information
 * @return {Object} The updated course information
 */
export function updateCourse(courseId, data) {
  return http.put(`${apiEndpoint}/course/${courseId}`, data);
}

/**
 * Deletes a course from the database
 *
* @param {String} courseId The _id of the course
 * @return {Object} The deleted course 
 */
export function deleteCourse(courseId) {
  return http.delete(`${apiEndpoint}/course/${courseId}`);
}

/**
 * Adds an entry to a course
 *
 * @param {String} courseId The _id of the course
 * @param {Object} data The data for the entry
 * @return {Object} The updated course
 */
export function createEntry(courseId, data) {
  return http.post(`${apiEndpoint}/course/${courseId}/entry`, data);
}

/**
 * Gets all the entries for a course
 *
 * @param {String} courseId The _id of the course
 * @return {Object} The entries for a course
 */
export function getEntry(courseId) {
  return http.get(`${apiEndpoint}/course/${courseId}/entry`);
}
