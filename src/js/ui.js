import { Instructor } from "./entities";

class Ui {
  static currentId = null;

  // Open add modals
  static openAddModal(
    addButton,
    addModal,
    form,
    nameInputContainer,
    courseCodeInputGroup,
    emailInputContainer,
    courseDropdownContainer,
    courseNameInputContainer,
    formSubmitButton,
    modalType
  ) {
    addButton.addEventListener("click", () => {
      form.reset();
      addModal.classList.add("display-modal");
      Ui.currentEditId = null;

      // Reset visibility
      nameInputContainer.style.display =
        modalType === "course" ? "none" : "block";
      emailInputContainer.style.display =
        modalType === "course" ? "none" : "block";
      courseDropdownContainer.style.display =
        modalType === "course" ? "none" : "flex";
      courseNameInputContainer.style.display =
        modalType === "course" ? "block" : "none";
      courseCodeInputGroup.style.visibility =
        modalType === "course" ? "visible" : "hidden";

      formSubmitButton.textContent = `Add ${modalType}`;
    });
  }

  static openAddStudentModal(...args) {
    Ui.openAddModal(...args, "student");
    Ui.populateCourseDropdown("student");
  }

  static openAddInstructorModal(...args) {
    Ui.openAddModal(...args, "instructor");
    Ui.populateCourseDropdown("instructor");
  }

  static openAddCourseModal(...args) {
    Ui.openAddModal(...args, "course");
  }

  // Close add modals
  static closeAddModal(closeModalButton, addModal, feedbackMessage, form) {
    const resetModal = () => {
      addModal.classList.remove("display-modal");
      feedbackMessage.textContent = "";
      ["name", "email", "courses", "courses-code"].forEach((field) => {
        document
          .querySelector(`[id=${field}]`)
          .classList.remove("input-field__error");
      });
      form.reset();
    };

    closeModalButton.addEventListener("click", resetModal);
    addModal.addEventListener("click", (e) => {
      if (e.target === addModal) resetModal();
    });
  }

  // Populate courses in dropdown menu
  static populateCourseDropdown(personType) {
    const courseDropdown = document.querySelector("#courses");
    courseDropdown.innerHTML = `<option value="">-- Select course --</option>`;

    const courses = JSON.parse(localStorage.getItem("course-collection")) || [];

    courses.forEach((course) => {
      const option = document.createElement("option");
      option.value = course.code;
      option.textContent = course.name;
      if (personType === "student" && !course.availability) {
        option.disabled = true;
        option.textContent += " (FULL)";
      }
      courseDropdown.append(option);
    });
  }

  // Render entities
  static renderStudents() {
    Ui.renderTable("student-collection", "#studentList");
  }
  static renderInstructors() {
    Ui.renderTable("instructor-collection", "#instructorList");
  }

  static renderAllData() {
    Ui.renderTable("student-collection", "#studentList");
    Ui.renderTable("instructor-collection", "#instructorList");
    Ui.renderCourses();
  }

  static renderTable(collectionKey, tableSelector) {
    const tableBody = document.querySelector(tableSelector);
    tableBody.innerHTML = "";
    const collection = JSON.parse(localStorage.getItem(collectionKey)) || [];

    collection.forEach((person, index) => {
      const row = document.createElement("tr");
      row.classList.add("table-row");

      const nameCell = document.createElement("td");
      nameCell.textContent = person.name;
      const emailCell = document.createElement("td");
      emailCell.textContent = person.email;
      const courseCell = document.createElement("td");
      courseCell.textContent = person.course;

      // Action buttons
      const actionButtonsContainer = document.createElement("div");
      actionButtonsContainer.classList.add("action-buttons__container");
      const actionsCell = document.createElement("td");

      // Edit button
      const editButton = document.createElement("button");
      editButton.textContent = "✎";
      editButton.classList.add("edit-button");
      editButton.setAttribute("data-id", index);

      // Delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.classList.add("delete-button");
      deleteButton.setAttribute("data-id", index);

      actionButtonsContainer.append(editButton, deleteButton);
      actionsCell.append(actionButtonsContainer);

      row.append(nameCell, emailCell, courseCell, actionsCell);
      tableBody.append(row);

      // Edit button event listener
      editButton.addEventListener("click", () => {
        Ui.displayEditModal(index, collectionKey);
      });
    });
  }

  static renderCourses() {
    const courseList = document.querySelector("#courseList");
    courseList.innerHTML = "";
    const courses = JSON.parse(localStorage.getItem("course-collection")) || [];

    courses.forEach((course, index) => {
      const row = document.createElement("tr");
      row.classList.add("table-row");

      const courseCodeCell = document.createElement("td");
      courseCodeCell.textContent = course.code;
      const courseNameCell = document.createElement("td");
      courseNameCell.textContent = course.name;
      const courseStudentQuantityCell = document.createElement("td");
      courseStudentQuantityCell.textContent = course.students.length;
      const availabilityCell = document.createElement("td");
      availabilityCell.textContent = course.availability ? "✅" : "❌";

      const actionButtonsContainer = document.createElement("div");
      actionButtonsContainer.classList.add("action-buttons__container");
      const actionsCell = document.createElement("td");

      // Edit button
      const editButton = document.createElement("button");
      editButton.textContent = "✎";
      editButton.classList.add("edit-button");
      editButton.setAttribute("data-id", index);

      // Delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.classList.add("delete-button");
      deleteButton.setAttribute("data-id", index);

      actionButtonsContainer.append(editButton, deleteButton);
      actionsCell.append(actionButtonsContainer);

      row.append(
        courseCodeCell,
        courseNameCell,
        courseStudentQuantityCell,
        availabilityCell,
        actionsCell
      );
      courseList.append(row);

      // Edit button event listener
      editButton.addEventListener("click", () => {
        Ui.displayEditModal(index, "course-collection");
      });
    });
  }

  static displayEditModal(id, dataKey) {
    const editModal = document.querySelector(".add-modal");
    const formSubmitButton = document.querySelector(
      ".add-modal__button--confirm"
    );

    const nameInputContainer = document.querySelector(".name-container");
    const emailInputContainer = document.querySelector(".email-container");
    const courseDropdownContainer = document.querySelector(
      ".select-course-dropdown"
    );
    const courseCodeInputGroup = document.querySelector(".course-code__group");
    const courseNameInputContainer = document.querySelector(
      ".course-name-container"
    );

    editModal.classList.add("display-modal");
    formSubmitButton.textContent = "Confirm edit";

    nameInputContainer.style.display =
      dataKey === "course-collection" ? "none" : "block";
    emailInputContainer.style.display =
      dataKey === "course-collection" ? "none" : "block";
    courseDropdownContainer.style.display =
      dataKey === "course-collection" ? "none" : "flex";
    courseNameInputContainer.style.display =
      dataKey === "course-collection" ? "block" : "none";
    courseCodeInputGroup.style.visibility =
      dataKey === "course-collection" ? "visible" : "hidden";

    Ui.populateForm(id, dataKey);
  }

  static populateForm(id, dataKey) {
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const courseDropdown = document.querySelector("#courses");
    const courseCodeInput = document.querySelector("#course-code");
    const courseNameInput = document.querySelector("#course-name");

    const collection = JSON.parse(localStorage.getItem(dataKey)) || [];
    const entityToEdit = collection[id];

    Ui.currentId = id;

    if (dataKey.includes("student") || dataKey.includes("instructor")) {
      nameInput.value = entityToEdit.name;
      emailInput.value = entityToEdit.email;
      courseDropdown.value = entityToEdit.course;
    } else if (dataKey === "course-collection") {
      courseCodeInput.value = entityToEdit.code;
      courseNameInput.value = entityToEdit.name;
    }
  }
}

export default Ui;
