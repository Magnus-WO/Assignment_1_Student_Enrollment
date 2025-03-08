class Form {
  static formValidation(feedbackMessage) {
    feedbackMessage.textContent = "";
    const fieldsToValidate = [
      { name: "name", message: "please enter your full name" },
      { name: "email", message: "please enter your email" },
      { name: "courses", message: "please select a course from the list" },
      { name: "course-code", message: "please enter the course-code" },
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
