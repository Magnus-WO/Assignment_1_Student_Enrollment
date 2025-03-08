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

// const openAddModalButton = document.querySelectorAll(".add-modal__button");
// const closeAddModalButton = document.querySelector(
//   ".add-modal__button--cancel"
// );

// Form elements
const form = document.querySelector(".add-modal__form");
const nameInputLabel = document.querySelector(".name-label");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const courseDropdown = document.querySelector("#courses");
const courseCodeInputGroup = document.querySelector(".course-code");

// Event listener
document.addEventListener("DOMContentLoaded", () => {
  Ui.openAddStudentModal(
    addStudentButton,
    addModal,
    form,
    courseCodeInputGroup,
    formSubmitButton
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
  Ui.closeAddModal(closeModalButton, addModal);
});

// openAddModalButton.forEach((button) => {
//   button.addEventListener("click", () => {
//     Ui.openAddModal(closeAddModalButton, addModal, form);
//   });
// });

// Form validation
form.addEventListener("submit", (e) => {
  e.preventDefault();
  Form.formValidation(feedbackMessage);

  if (!Form.formValidation(feedbackMessage)) {
    console.log("form not submitted");
    return;
  }
  feedbackMessage.textContent = "Submitted";
});
