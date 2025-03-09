import { Course, Instructor, Student } from "./entities";

class Manager {
  static studentCollection =
    JSON.parse(localStorage.getItem("student-collection")) || [];
  static instructorCollection =
    JSON.parse(localStorage.getItem("instructor-collection")) || [];
  static courseCollection =
    JSON.parse(localStorage.getItem("course-collection")) || [];

  static addPerson(name, email, courseDropdown, personType) {
    const selectedCourse = courseDropdown.value;
    let person;

    if (personType === "student") {
      person = new Student(name, email, selectedCourse);
      Manager.studentCollection.push(person);
      localStorage.setItem(
        "student-collection",
        JSON.stringify(Manager.studentCollection)
      );
      console.log(person);
    } else if (personType === "instructor") {
      person = new Instructor(name, email, selectedCourse);
      Manager.instructorCollection.push(person);
      localStorage.setItem(
        "instructor-collection",
        JSON.stringify(Manager.instructorCollection)
      );
    }

    return person;
  }
  static addCourse(name, courseCode) {
    let course;
    course = new Course(name, courseCode);
    Manager.courseCollection.push(course);
    localStorage.setItem(
      "course-collection",
      JSON.stringify(Manager.courseCollection)
    );
    console.log(course);

    return course;
  }
}

export default Manager;
