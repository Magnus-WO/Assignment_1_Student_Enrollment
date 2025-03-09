class Ui {
  static currentEditId = null;
  //   Open add modals
  static openAddModal(
    addStudentButton,
    addModal,
    form,
    courseCodeInputGroup,
    formSubmitButton,
    modalType
  ) {
    addStudentButton.addEventListener("click", () => {
      form.reset();
      Ui.currentEditId = null;
      addModal.classList.add("display-modal");
      if (modalType === "course") {
        courseCodeInputGroup.style.visibility = "visible";
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
  static closeAddModal(closeModalButton, addModal, form) {
    closeModalButton.addEventListener("click", () => {
      addModal.classList.remove("display-modal");
    });

    // Close modal on click outside of form
    addModal.addEventListener("click", (e) => {
      if (e.target === addModal) {
        addModal.classList.remove("display-modal");
      }
    });
  }
}

export default Ui;
