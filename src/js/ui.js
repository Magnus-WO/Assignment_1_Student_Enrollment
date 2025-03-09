class Ui {
  static renderStudent() {}
  static openAddModal(closeAddModalButton, addModal, addForm) {
    addModal.classList.add("add-modal--visible");
    closeAddModalButton.addEventListener("click", () => {
      addForm.reset();
      addModal.classList.remove("add-modal--visible");
    });
  }
  static renderForm(
    e,
    formHeader,
    emailContainer,
    selectOptionsContainer,
    courseCodeContainer
  ) {
    // Student
    if (e.target.dataset.button === "student") {
      formHeader.textContent = "Add student";
      emailContainer.style.display = "flex";
      selectOptionsContainer.style.display = "flex";
      courseCodeContainer.style.display = "none";
      // Instructor
    } else if (e.target.dataset.button === "instructor") {
      formHeader.textContent = "Add instructor";
      emailContainer.style.display = "flex";
      selectOptionsContainer.style.display = "flex";
      courseCodeContainer.style.display = "none";
      // Course
    } else if (e.target.dataset.button === "course") {
      formHeader.textContent = "Add course";
      emailContainer.style.display = "none";
      selectOptionsContainer.style.display = "none";
      courseCodeContainer.style.display = "flex";
    }
  }
}

export default Ui;
