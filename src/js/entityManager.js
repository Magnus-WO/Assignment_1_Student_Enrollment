import { Course, Instructor, Person, Student } from "./entities";

class Manager {
  static studentCollection =
    JSON.parse(localStorage.getItem("student-collection")) || [];
  static instructorCollection =
    JSON.parse(localStorage.getItem("instructor-collection")) || [];
  static courseCollection =
    JSON.parse(localStorage.getItem("course-collection")) || [];

  static addPerson(name, email, courseDropdown, personType, feedbackMessage) {
    const selectedCourse = courseDropdown.value;
    let person;
    let courses = JSON.parse(localStorage.getItem("course-collection")) || [];
    let course = courses.find((course) => course.code === selectedCourse);

    if (personType === "student") {
      // Check if the course doesn't exist
      if (!course) {
        console.log("Course not found.");
        feedbackMessage.textContent = "Course not found";
        return;
      }

      // Check if the course is full
      if (course.students.length >= course.maxStudents) {
        console.log(`Cannot add student. The course "${course.name}" is full.`);
        feedbackMessage.textContent = `The course ${course.name} is full.`;

        return;
      }

      // Add the student to student collection
      person = new Student(name, email, selectedCourse);
      Manager.studentCollection.push(person);
      localStorage.setItem(
        "student-collection",
        JSON.stringify(Manager.studentCollection)
      );
      // Add student to course
      course.students.push({
        id: person.id,
        name: person.name,
        email: person.email,
      });

      // Mark course as full
      if (course.students.length >= course.maxStudents) {
        course.availability = false;
      }

      // Update courses in localStorage
      localStorage.setItem("course-collection", JSON.stringify(courses));

      console.log(`${person.name} added to ${course.name}`);
    } else if (personType === "instructor") {
      // Check if the course doesn't exist
      if (!course) {
        console.log("Course not found.");
        feedbackMessage.textContent = "Course not found";
        return;
      }

      // Add instructor to instructorCollection
      person = new Instructor(name, email, selectedCourse);
      Manager.instructorCollection.push(person);
      localStorage.setItem(
        "instructor-collection",
        JSON.stringify(Manager.instructorCollection)
      );

      // Add instructor to course
      course.instructors.push({
        id: person.id,
        name: person.name,
        email: person.email,
      });
      // Update courses in localStorage
      localStorage.setItem("course-collection", JSON.stringify(courses));
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

  static findEntityById(id, type) {
    switch (type) {
      case "student":
        return this.students.find((s) => s.studentId === id);
      case "instructor":
        return this.instructors.find((i) => i.instructorId === id);
      case "course":
        return this.courses.find((c) => c.courseId === id);
      default:
        return console.log("Could´t find the entity");
    }
  }
}

// TODO: add delete method for for every entity. Make sure it removes students from the array inside the courses called students.

export default Manager;
