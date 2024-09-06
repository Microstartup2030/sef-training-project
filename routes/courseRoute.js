const router = require("express").Router();

 const certificate = require("../controllers/courses/certificateController");
const course = require("../controllers/courses/courseController");
const courseStudent = require("../controllers/courses/courseStudentController");
const exam = require("../controllers/courses/examController");
const lesson = require("../controllers/courses/lessonController");
const question = require("../controllers/courses/questionController");
const review = require("../controllers/courses/reviewController");
const unit = require("../controllers/courses/unitController");
const { uploadImageMiddleware } = require("../middlewares/upload");


// /api/course
router.post("/create", course.createCourse);
router.get("/index", course.getCourses);
router.get("/view/:id", course.getCourse);
router.get("/count", course.getCourseIndex);
router.put("/update/:id", uploadImageMiddleware,course.updateCourse);
router.delete("/delete/:id", course.deleteCourse);

// /api/certificate
router.post("/certificate/create", certificate.createCertificate);
router.put("/certificate/update/:id", uploadImageMiddleware, certificate.updateCertificate);

// /api/courseStudent
router.post("/courseStudent/create", courseStudent.createCourseStudent);
router.get("/courseStudent/index", courseStudent.getCourseStudents);
router.get("/courseStudent/view/:id", courseStudent.getCourseStudent);
router.put("/courseStudent/update/:id", courseStudent.updateCourseStudent);
router.delete("/courseStudent/delete/:id", courseStudent.deleteCourseStudent);


// /api/exam
router.post("/exam/create", exam.createExam);
router.get("/exam/index", exam.getExams);
router.get("/exam/view/:id", exam.getExam);
router.put("/exam/update/:id", exam.updateEexam);
router.delete("/exam/delete/:id",uploadImageMiddleware, exam.deleteExam);

// /api/lesson
router.post("/lesson/create", lesson.createLesson);
router.get("/lesson/index", lesson.getLessons);
router.get("/lesson/view/:id", lesson.getLesson);
router.put("/lesson/update/:id", lesson.updateLesson);
router.delete("/lesson/delete/:id", lesson.deleteLesson);

// /api/question
router.post("/question/create", question.createQuestion);
router.get("/question/index", question.getQuestions);
router.get("/question/view/:id", question.getQuestion);
router.put("/question/update/:id", question.updateQuestion);
router.delete("/question/delete/:id", question.deleteQuestion);

// /api/review
router.post("/review/create", review.createReview);
router.get("/review/index", review.getReviews);
router.get("/review/view/:id", review.getReview);
router.put("/review/update/:id", review.updateReview);
router.delete("/review/delete/:id", review.deleteReview);

// /api/unit
router.post("/unit/create", unit.createUnit);
router.get("/unit/index", unit.getUnits);
router.get("/unit/view/:id", unit.getUnit);
router.put("/unit/update/:id", unit.updateUnit);
router.delete("/unit/delete/:id", unit.deleteUnit);



module.exports = router;