import Form from "./form.js";
import Ui from "./ui.js";

// Select elements
const addForm = document.querySelector(".add-modal__form");
const feedbackMessage = document.querySelector(".add-form__feedback-message");
const openAddModalButton = document.querySelectorAll(".add-modal__button");
const closeAddModalButton = document.querySelector(
  ".add-modal__button--cancel"
);
const addModal = document.querySelector(".add-modal");

openAddModalButton.forEach((button) => {
  button.addEventListener("click", () => {
    Ui.openAddModal(closeAddModalButton, addModal, addForm);
  });
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  Form.formValidation(feedbackMessage);

  if (!Form.formValidation(feedbackMessage)) {
    console.log("form not submitted");
    return;
  }
  feedbackMessage.textContent = "Submitted";
});
