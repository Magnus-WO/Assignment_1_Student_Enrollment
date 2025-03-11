import Manager from "./entityManager.js";
import Form from "./form.js";
import Ui from "./ui.js";
// Select elements
const addStudentButton = document.querySelector(".add-student__button");
const addInstructorButton = document.querySelector(".add-instructor__button");
const addCourseButton = document.querySelector(".add-course__button");
const addModal = document.querySelector(".add-modal");
const formSubmitButton = document.querySelector(".add-modal__button--confirm");
const closeModalButton = document.querySelector(".add-modal__button--cancel");
const feedbackMessage = document.querySelector(".add-form__feedback-message");

// Form elements
const form = document.querySelector(".add-modal__form");
const nameInputContainer = document.querySelector(".name-container");
const nameInput = document.querySelector("#name");

const emailInputContainer = document.querySelector(".email-container");
const emailInput = document.querySelector("#email");

const courseDropdownContainer = document.querySelector(
  ".select-course-dropdown"
);
const courseDropdown = document.querySelector("#courses");

const courseCodeInputGroup = document.querySelector(".course-code__group");
const courseCodeInput = document.querySelector("#course-code");

const courseNameInputContainer = document.querySelector(
  ".course-name-container"
);
const courseNameInput = document.querySelector("#course-name");

// Event listener
document.addEventListener("DOMContentLoaded", () => {
  Ui.renderTable("student-collection", "#studentList");
  Ui.renderTable("instructor-collection", "#instructorList");
  Ui.renderCourses();
  Ui.populateCourseDropdown();

  Ui.openAddStudentModal(
    addStudentButton,
    addModal,
    form,
    nameInputContainer,
    courseCodeInputGroup,
    emailInputContainer,
    courseDropdownContainer,
    courseNameInputContainer,
    formSubmitButton
  );
  Ui.openAddInstructorModal(
    addInstructorButton,
    addModal,
    form,
    nameInputContainer,
    courseCodeInputGroup,
    emailInputContainer,
    courseDropdownContainer,
    courseNameInputContainer,
    formSubmitButton
  );
  Ui.openAddCourseModal(
    addCourseButton,
    addModal,
    form,
    nameInputContainer,
    courseCodeInputGroup,
    emailInputContainer,
    courseDropdownContainer,
    courseNameInputContainer,
    formSubmitButton
  );
  Ui.closeAddModal(closeModalButton, addModal, feedbackMessage, form);
});

// Track which button is pressed
let selectedForm = "";
addStudentButton.addEventListener("click", () => {
  selectedForm = "student";
});
addInstructorButton.addEventListener("click", () => {
  selectedForm = "instructor";
});
addCourseButton.addEventListener("click", () => {
  selectedForm = "course";
});

// Submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Check if adding a person or a course
  if (selectedForm === "student" || selectedForm === "instructor") {
    if (!Form.personFormValidation(feedbackMessage)) {
      console.log(`${selectedForm} not submitted`);
      return;
    }
    Manager.addPerson(
      nameInput.value.trim(),
      emailInput.value.trim(),
      courseDropdown,
      selectedForm
    );
    Ui.renderTable(
      selectedForm === "student"
        ? "student-collection"
        : "instructor-collection",
      selectedForm === "student" ? "#studentList" : "#instructorList"
    );
  } else if (selectedForm === "course") {
    if (!Form.courseFormValidation(feedbackMessage)) {
      console.log("course not submitted");
      return;
    }
    Manager.addCourse(
      courseNameInput.value.trim(),
      courseCodeInput.value.trim()
    );
    Ui.populateCourseDropdown();
    Ui.renderCourses();
  }
});
