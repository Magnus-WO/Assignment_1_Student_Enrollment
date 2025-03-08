class Ui {
  static renderStudent() {}
  static openAddModal(closeAddModalButton, addModal, addForm) {
    addModal.classList.add("add-modal--visible");
    closeAddModalButton.addEventListener("click", () => {
      addForm.reset();
      addModal.classList.remove("add-modal--visible");
    });
  }
}

export default Ui;
