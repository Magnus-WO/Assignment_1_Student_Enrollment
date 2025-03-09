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

// Form elements
const form = document.querySelector(".add-modal__form");
const nameInputLabel = document.querySelector(".name-label");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const courseDropdown = document.querySelector("#courses");
const courseCode = document.querySelector("#course-code");
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
addStudentButton.addEventListener("click", () => {
  selectedPersonType = "student";
});

addInstructorButton.addEventListener("click", () => {
  selectedPersonType = "instructor";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  Form.formValidation(feedbackMessage);

  // Form validation
  if (!Form.formValidation(feedbackMessage)) {
    console.log("form not submitted");
    return;
  }

  //   Submit form
  console.log("Name:", name.value.trim());
  console.log("Email:", email.value.trim());
  // Ensure you are getting the course value
  console.log("Selected Course:", courseDropdown.value); 

  if (!Ui.currentEditId) {
    Manager.addPerson(
      name.value.trim(),
      email.value.trim(),
      courseDropdown.value,
      selectedPersonType
    );
    feedbackMessage.textContent = "Submitted";
  } else {
    // Manager.currentEditId()
    Ui.currentEditId = null;
    formSubmitButton.textContent = "Add";
  }

  form.reset();
});
