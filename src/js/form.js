class Form {
  // Validation person input
  static personFormValidation(feedbackMessage) {
    feedbackMessage.textContent = "";
    const fieldsToValidate = [
      { name: "name", message: "Please enter your full name" },
      { name: "email", message: "Please enter your email" },
      { name: "courses", message: "Please select a course from the list" },
    ];
    for (let field of fieldsToValidate) {
      const inputField = document.querySelector(`[id= ${field.name}]`);
      inputField.addEventListener("input", () => {
        feedbackMessage.textContent = "";
        inputField.classList.remove("input-field__error");
        feedbackMessage.classList.remove("input-field__error-message");
      });
      if (!inputField.value.trim()) {
        feedbackMessage.textContent = field.message;
        inputField.classList.add("input-field__error");
        feedbackMessage.classList.add("input-field__error-message");
        return false;
      }
    }
    return true;
  }
  //   Validation course input
  static courseFormValidation(feedbackMessage) {
    feedbackMessage.textContent = "";
    const fieldsToValidate = [
      { name: "course-name", message: "Please enter a course name" },
      { name: "course-code", message: "Please enter the course code" },
    ];
    for (let field of fieldsToValidate) {
      const inputField = document.querySelector(`[id= ${field.name}]`);
      inputField.addEventListener("input", () => {
        feedbackMessage.textContent = "";
        inputField.classList.remove("input-field__error");
        feedbackMessage.classList.remove("input-field__error-message");
      });
      if (!inputField.value.trim()) {
        feedbackMessage.textContent = field.message;
        inputField.classList.add("input-field__error");
        feedbackMessage.classList.add("input-field__error-message");
        return false;
      }
    }
    return true;
  }
}

export default Form;
