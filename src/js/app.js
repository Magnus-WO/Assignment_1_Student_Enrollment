import Manager from "./entityManager.js";
// import Form from "./formValidation.js";
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
const nameInputLabel = document.querySelector(".name-label");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const courseDropdown = document.querySelector("#courses");
const courseCodeInput = document.querySelector("#course-code");
const courseCodeInputGroup = document.querySelector(".course-code__group");
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
  if (selectedPersonType === "student") {
    Manager.addPerson(
      nameInput.value.trim(),
      emailInput.value.trim(),
      courseDropdown,
      selectedPersonType
    );
  }
  if (selectedPersonType === "instructor") {
    Manager.addPerson(
      nameInput.value.trim(),
      emailInput.value.trim(),
      courseDropdown,
      selectedPersonType
    );
  }
  if (selectedPersonType === "course") {
    Manager.addCourse(nameInput.value.trim(), courseCodeInput.value.trim());
  }

  // Form.formValidation(feedbackMessage);
  // Form validation
  // if (!Form.formValidation(feedbackMessage)) {
  //   console.log("form not submitted");
  //   return;
  // }
  // Not done ------------
  //   Submit form
  // console.log("Name:", name.value.trim());
  // console.log("Email:", email.value.trim());
  // // Ensure you are getting the course value
  // console.log("Selected Course:", courseDropdown.value);
  // if (!Ui.currentEditId) {
  //   Manager.addPerson(
  //     name.value.trim(),
  //     email.value.trim(),
  //     courseDropdown.value,
  //     selectedPersonType
  //   );
  //   feedbackMessage.textContent = "Submitted";
  // } else {
  //   // Manager.currentEditId()
  //   Ui.currentEditId = null;
  //   formSubmitButton.textContent = "Add";
  // }
  // form.reset();
});
