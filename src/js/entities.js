import { v4 as uuidv4 } from "uuid";

class Person {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class Student extends Person {
  constructor(name, email, selectedCourse, studentId) {
    super(name, email);
    this.course = selectedCourse;
    this.studentId = uuidv4();
  }
}

class Instructor extends Person {
  constructor(name, email, selectedCourse) {
    super(name, email);
    this.instructorId = uuidv4();
    this.course = selectedCourse;
  }
}

class Course {
  constructor(name, courseCode) {
    this.name = name;
    this.code = courseCode;
    this.availability = true;
  }
}

export { Course, Instructor, Person, Student };
