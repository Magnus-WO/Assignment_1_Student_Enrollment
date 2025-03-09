import Form from "./form.js";
import Ui from "./ui.js";

// Select elements
const addForm = document.querySelector(".add-modal__form");
const formHeader = document.querySelector(".form__header");
//    Form Containers
const nameContainer = document.querySelector(".form__name-container");
const emailContainer = document.querySelector(".form__email-container");
const selectOptionsContainer = document.querySelector(
  ".select-options-container"
);
const courseCodeContainer = document.querySelector(
  ".form__course-code-container"
);
// Form inputs
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const selectDropDown = document.querySelector("#courses");
const courseCodeInput = document.querySelector("#course-code");

//Form labels
const nameLabel = document.querySelector(".label__name");
const emailLabel = document.querySelector(".label__email");
const selectLabel = document.querySelector(".label__select");
const courseCodeLabel = document.querySelector(".label__course-code");

const feedbackMessage = document.querySelector(".add-form__feedback-message");
const openAddModalButton = document.querySelectorAll(".add-modal__button");
const closeAddModalButton = document.querySelector(
  ".add-modal__button--cancel"
);
const addModal = document.querySelector(".add-modal");

openAddModalButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    Ui.openAddModal(closeAddModalButton, addModal, addForm);
    Ui.renderForm(
      e,
      formHeader,
      nameContainer,
      emailContainer,
      selectOptionsContainer,
      courseCodeContainer
    );
  });
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  Form.formValidation(feedbackMessage);

  // Form validation
  if (!Form.formValidation(feedbackMessage)) {
    console.log("form not submitted");
    return;
  }
  // Not done ------------
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
