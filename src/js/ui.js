import { Instructor } from "./entities";

class Ui {
  //   Open add modals
  static currentId = null;
  static openAddModal(
    addStudentButton,
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
    addStudentButton.addEventListener("click", (e) => {
      form.reset();

      addModal.classList.add("display-modal");
      if (modalType === "course") {
        nameInputContainer.style.display = "none";
        emailInputContainer.style.display = "none";
        courseDropdownContainer.style.display = "none";
        courseNameInputContainer.style.display = "block";
        courseCodeInputGroup.style.visibility = "visible";

        formSubmitButton.textContent = "Add course";
      } else {
        nameInputContainer.style.display = "block";
        emailInputContainer.style.display = "block";
        courseDropdownContainer.style.display = "flex";
        courseNameInputContainer.style.display = "none";
        courseCodeInputGroup.style.visibility = "hidden";
      }
      formSubmitButton.textContent = `Add ${modalType}`;
    });
  }

  static openAddStudentModal(
    addStudentButton,
    addModal,
    form,
    nameInputContainer,
    courseCodeInputGroup,
    emailInputContainer,
    courseDropdownContainer,
    courseNameInputContainer,
    formSubmitButton
  ) {
    Ui.openAddModal(
      addStudentButton,
      addModal,
      form,
      nameInputContainer,
      courseCodeInputGroup,
      emailInputContainer,
      courseDropdownContainer,
      courseNameInputContainer,
      formSubmitButton,
      "student"
    );
    Ui.populateCourseDropdown("student");
  }

  static openAddInstructorModal(
    addInstructorButton,
    addModal,
    form,
    nameInputContainer,
    courseCodeInputGroup,
    emailInputContainer,
    courseDropdownContainer,
    courseNameInputContainer,
    formSubmitButton
  ) {
    Ui.openAddModal(
      addInstructorButton,
      addModal,
      form,
      nameInputContainer,
      courseCodeInputGroup,
      emailInputContainer,
      courseDropdownContainer,
      courseNameInputContainer,
      formSubmitButton,
      "instructor"
    );
    Ui.populateCourseDropdown("instructor");
  }
  static openAddCourseModal(
    addCourseButton,
    addModal,
    form,
    nameInputContainer,
    courseCodeInputGroup,
    emailInputContainer,
    courseDropdownContainer,
    courseNameInputContainer,
    formSubmitButton
  ) {
    Ui.openAddModal(
      addCourseButton,
      addModal,
      form,
      nameInputContainer,
      courseCodeInputGroup,
      emailInputContainer,
      courseDropdownContainer,
      courseNameInputContainer,
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

  // Populate courses in dropdown menu
  static populateCourseDropdown(personType) {
    const courseDropdown = document.querySelector("#courses");
    courseDropdown.innerHTML = `<option value="">-- Select course --</option>`; // Reset dropdown

    const courses = JSON.parse(localStorage.getItem("course-collection")) || [];

    courses.forEach((course) => {
      const option = document.createElement("option");
      option.value = course.code;
      option.textContent = course.name;

      // Disable if full
      if (personType === "student" && !course.availability) {
        option.disabled = true;
        option.textContent += " (FULL)";
      }

      courseDropdown.append(option);
    });
  }
  // Render students
  static renderStudents() {
    Ui.renderTable("student-collection", "#studentList");
  }
  static renderInstructors() {
    Ui.renderTable("instructor-collection", "#instructorList");
  }

  //   Render data
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

      // Create table cells dynamically
      const nameCell = document.createElement("td");
      nameCell.textContent = person.name;
      const emailCell = document.createElement("td");
      emailCell.textContent = person.email;
      const courseCell = document.createElement("td");
      courseCell.textContent = person.course;

      //   Create action buttons
      const actionButtonsContainer = document.createElement("div");
      actionButtonsContainer.classList.add("action-buttons__container");
      const actionsCell = document.createElement("td");

      // Create Edit Button
      const editButton = document.createElement("button");
      editButton.textContent = "✎";
      editButton.classList.add("edit-button");
      editButton.setAttribute("data-id", index);

      // Create Delete Button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.classList.add("delete-button");
      deleteButton.setAttribute("data-id", index);

      // Append buttons to actions cell
      actionsCell.append(actionButtonsContainer);
      actionButtonsContainer.append(editButton, deleteButton);

      // Append the elements to row
      row.append(nameCell, emailCell, courseCell, actionsCell);

      // Append the row to the table
      tableBody.append(row);
    });
  }

  static renderCourses() {
    const courseList = document.querySelector("#courseList");
    courseList.innerHTML = "";

    const courses = JSON.parse(localStorage.getItem("course-collection")) || [];
    courses.forEach((course, index) => {
      const row = document.createElement("tr");
      row.classList.add("table-row");

      // Create table cells dynamically
      const courseCodeCell = document.createElement("td");
      courseCodeCell.textContent = course.code;
      const courseNameCell = document.createElement("td");
      courseNameCell.textContent = course.name;
      const courseStudentQuantityCell = document.createElement("td");
      courseStudentQuantityCell.textContent = course.students.length;
      const availabilityCell = document.createElement("td");
      availabilityCell.textContent = course.availability ? "✅" : "❌";

      //   Create action buttons
      const actionButtonsContainer = document.createElement("div");
      actionButtonsContainer.classList.add("action-buttons__container");
      const actionsCell = document.createElement("td");

      // Create Edit Button
      const editButton = document.createElement("button");
      editButton.textContent = "✎";
      editButton.classList.add("edit-button");
      editButton.setAttribute("data-id", index);

      // Create Delete Button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.classList.add("delete-button");
      deleteButton.setAttribute("data-id", index);

      // Append buttons to actions cell
      actionsCell.append(actionButtonsContainer);
      actionButtonsContainer.append(editButton, deleteButton);

      // Append the elements to row
      row.append(
        courseCodeCell,
        courseNameCell,
        courseStudentQuantityCell,
        availabilityCell,
        actionsCell
      );

      // Append the row to the table
      courseList.append(row);
    });
  }

  static populateForm(
    e,
    formHeader,
    emailContainer,
    selectOptionsContainer,
    courseCodeContainer
  ) {}
}

export default Ui;
