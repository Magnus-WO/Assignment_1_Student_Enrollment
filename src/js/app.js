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

const confirmAddButton = document.querySelector(".add-modal__button--confirm");

// Form elements
const form = document.querySelector(".add-modal__form");
const formHeader = document.querySelector(".form__header");
const nameInputLabel = document.querySelector(".name-label");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const courseDropdown = document.querySelector("#courses");
const courseCodeInput = document.querySelector("#course-code");
const emailInputContainer = document.querySelector(".email-container");
const courseCodeInputGroup = document.querySelector(".course-code__group");
// Event listener
document.addEventListener("DOMContentLoaded", () => {
  Ui.openAddStudentModal(
    addStudentButton,
    addModal,
    form,
    courseCodeInputGroup,
    formSubmitButton,
    emailInputContainer
  );
  Ui.openAddInstructorModal(
    addInstructorButton,
    addModal,
    form,
    courseCodeInputGroup,
    formSubmitButton
  );
  Ui.openAddCourseModal(
    addCourseButton,
    addModal,
    form,
    courseCodeInputGroup,
    formSubmitButton,
    "course"
  );
  Ui.closeAddModal(closeModalButton, addModal, feedbackMessage, form);
});
// Track student or instructor buttons
let selectedPersonType = "";
addStudentButton.addEventListener("click", (e) => {
  selectedPersonType = "student";
});
addInstructorButton.addEventListener("click", () => {
  selectedPersonType = "instructor";
});
addCourseButton.addEventListener("click", () => {
  selectedPersonType = "course";
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!Form.personFormValidation(feedbackMessage)) {
    console.log("student not submitted");
    return;
  }
  if (selectedPersonType === "student") {
    Manager.addPerson(
      nameInput.value.trim(),
      emailInput.value.trim(),
      courseDropdown,
      selectedPersonType
    );
    Form.personFormValidation(feedbackMessage);
  }
  if (selectedPersonType === "instructor") {
    Manager.addPerson(
      nameInput.value.trim(),
      emailInput.value.trim(),
      courseDropdown,
      selectedPersonType
    );
    Form.personFormValidation(feedbackMessage);
  }
  if (selectedPersonType === "course") {
    Manager.addCourse(nameInput.value.trim(), courseCodeInput.value.trim());
    Form.courseFormValidation(feedbackMessage);
  }
});
