class Ui {
  static currentEditId = null;
  //   Open add modals
  static openAddModal(
    addStudentButton,
    addModal,
    form,
    courseCodeInputGroup,
    formSubmitButton,
    modalType,
    emailInputContainer
  ) {
    addStudentButton.addEventListener("click", (e) => {
      form.reset();

      Ui.currentEditId = null;
      addModal.classList.add("display-modal");
      if (modalType === "course") {
        courseCodeInputGroup.style.visibility = "visible";
        emailInputContainer.style.visibility = "hidden";
      } else {
        courseCodeInputGroup.style.visibility = "hidden";
      }
      formSubmitButton.textContent = `Add ${modalType}`;
    });
  }

  static openAddStudentModal(
    addStudentButton,
    addModal,
    form,
    courseCodeInputGroup,
    formSubmitButton
  ) {
    Ui.openAddModal(
      addStudentButton,
      addModal,
      form,
      courseCodeInputGroup,
      formSubmitButton,
      "student"
    );
  }

  static openAddInstructorModal(
    addInstructorButton,
    addModal,
    form,
    courseCodeInputGroup,
    formSubmitButton
  ) {
    Ui.openAddModal(
      addInstructorButton,
      addModal,
      form,
      courseCodeInputGroup,
      formSubmitButton,
      "instructor"
    );
  }
  static openAddCourseModal(
    addCourseButton,
    addModal,
    form,
    courseCodeInputGroup,
    formSubmitButton
  ) {
    Ui.openAddModal(
      addCourseButton,
      addModal,
      form,
      courseCodeInputGroup,
      formSubmitButton,
      "course"
    );
  }

  //   Close add modals
  static closeAddModal(closeModalButton, addModal, feedbackMessage, form) {
    closeModalButton.addEventListener("click", () => {
      addModal.classList.remove("display-modal");
      feedbackMessage.textContent = "";
      const fieldsToValidate = [
        { name: "name" },
        { name: "email" },
        { name: "courses" },
        { name: "courses-code" },
      ];
      for (let field of fieldsToValidate) {
        const inputField = document.querySelector(`[id= ${field.name}]`);
        inputField.classList.remove("input-field__error");
      }
      form.reset();
    });

    // Close modal on click outside of form
    addModal.addEventListener("click", (e) => {
      if (e.target === addModal) {
        addModal.classList.remove("display-modal");
        feedbackMessage.textContent = "";
        const fieldsToValidate = [
          { name: "name" },
          { name: "email" },
          { name: "courses" },
          { name: "courses-code" },
        ];
        for (let field of fieldsToValidate) {
          const inputField = document.querySelector(`[id= ${field.name}]`);
          inputField.classList.remove("input-field__error");
        }
        form.reset();
      }
    });
  }
  static renderForm(
    e,
    formHeader,
    emailContainer,
    selectOptionsContainer,
    courseCodeContainer
  ) {}
}

export default Ui;
