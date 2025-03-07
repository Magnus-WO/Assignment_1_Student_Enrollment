import { v4 as uuidv4 } from "uuid";
class Person {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class Student extends Person {
  constructor(name, email, studentId, course) {
    super(name, email);
    this.studentId = uuidv4();
    this.course = course;
  }
}
class Instructor extends Person {
  constructor(name, email, instructorId, course) {
    super(name, email);
    this.instructorId = uuidv4();
    this.course = course;
  }
}

class Course {
  constructor(name, code, availability) {
    this.name = name;
    this.code = code;
    this.availability = availability;
  }
}

export { Course, Instructor, Person, Student };
