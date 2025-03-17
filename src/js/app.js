import Manager from "./entityManager.js";
import Form from "./form.js";
import Ui from "./ui.js";
// Select elements
const addStudentButton = document.querySelector(".add-student__button");
const addInstructorButton = document.querySelector(".add-instructor__button");
const addCourseButton = document.querySelector(".add-course__button");
const addModal = document.querySelector(".add-modal");
const formSubmitButton = document.querySelector(".add-modal__button--confirm");
const closeModalButton = document.querySelector(".add-modal__button--cancel");
const feedbackMessage = document.querySelector(".add-form__feedback-message");

// Form elements
const form = document.querySelector(".add-modal__form");
const nameInputContainer = document.querySelector(".name-container");
const nameInput = document.querySelector("#name");
const emailInputContainer = document.querySelector(".email-container");
const emailInput = document.querySelector("#email");

const courseDropdownContainer = document.querySelector(
  ".select-course-dropdown"
);
const courseDropdown = document.querySelector("#courses");

const courseCodeInputGroup = document.querySelector(".course-code__group");
const courseCodeInput = document.querySelector("#course-code");

const courseNameInputContainer = document.querySelector(
  ".course-name-container"
);
const courseNameInput = document.querySelector("#course-name");

// Event listener
document.addEventListener("DOMContentLoaded", () => {
  Ui.renderAllData();
  Ui.populateCourseDropdown();

  Ui.openAddStudentModal(
    addStudentButton,
    addModal,
    form,
    nameInputContainer,
    courseCodeInputGroup,
    emailInputContainer,
    courseDropdownContainer,
    courseNameInputContainer,
    formSubmitButton
  );
  Ui.openAddInstructorModal(
    addInstructorButton,
    addModal,
    form,
    nameInputContainer,
    courseCodeInputGroup,
    emailInputContainer,
    courseDropdownContainer,
    courseNameInputContainer,
    formSubmitButton
  );
  Ui.openAddCourseModal(
    addCourseButton,
    addModal,
    form,
    nameInputContainer,
    courseCodeInputGroup,
    emailInputContainer,
    courseDropdownContainer,
    courseNameInputContainer,
    formSubmitButton
  );
  Ui.closeAddModal(closeModalButton, addModal, feedbackMessage, form);
});

// Track which button is pressed
let selectedForm = "";
addStudentButton.addEventListener("click", () => {
  selectedForm = "student";
  Ui.populateCourseDropdown("student");
});
addInstructorButton.addEventListener("click", () => {
  selectedForm = "instructor";
  Ui.populateCourseDropdown("instructor");
});
addCourseButton.addEventListener("click", () => {
  selectedForm = "course";
});

// Submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Check if adding a person or a course
  if (selectedForm === "student" || selectedForm === "instructor") {
    if (!Form.personFormValidation(feedbackMessage)) {
      console.log(`${selectedForm} not submitted`);
      return;
    }
    Manager.addPerson(
      nameInput.value.trim(),
      emailInput.value.trim(),
      courseDropdown,
      selectedForm,
      feedbackMessage
    );
    if (selectedForm === "student") {
      Ui.renderStudents();
      Ui.renderCourses();
      Ui.populateCourseDropdown();
    } else if (selectedForm === "instructor") {
      Ui.renderInstructors();
      Ui.renderCourses();
      Ui.populateCourseDropdown();
    }
    Ui.renderCourses();
    Ui.populateCourseDropdown();
  } else {
    if (!Form.courseFormValidation(feedbackMessage)) {
      console.log("course not submitted");
      return;
    }
    Manager.addCourse(
      courseNameInput.value.trim(),
      courseCodeInput.value.trim()
    );
    Ui.populateCourseDropdown();
    Ui.renderCourses();
  }
});

// ===================== DELETE MODAL SETUP =====================

// 1. Grab the modal container and its two buttons.
const deleteModalContainer = document.querySelector(".delete-modal-container");
const cancelDeleteBtn = document.querySelector(".delete-modal__button--cancel");
const confirmDeleteBtn = document.querySelector(".delete-modal__button--confirm");

// 2. When we click ANY "delete-button" in the tables, open the modal.
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-button")) {
    // This is the index in the array (student-collection, instructor-collection, or course-collection).
    const index = event.target.getAttribute("data-id");

    // Figure out which table it came from by checking its closest ancestor.
    let collectionKey = "";
    if (event.target.closest("#studentList")) {
      collectionKey = "student-collection";
    } else if (event.target.closest("#instructorList")) {
      collectionKey = "instructor-collection";
    } else if (event.target.closest("#courseList")) {
      collectionKey = "course-collection";
    }

    // Store these in the modal's dataset so we know what to delete on confirm.
    deleteModalContainer.dataset.index = index;
    deleteModalContainer.dataset.collectionKey = collectionKey;

    // Show the modal (assuming your CSS hides it by default).
    deleteModalContainer.style.display = "flex";
  }
});

// 3. “Cancel” button -> simply hide the modal.
cancelDeleteBtn.addEventListener("click", () => {
  deleteModalContainer.style.display = "none";
});

// 4. “Confirm” button -> remove the item from localStorage + re-render
confirmDeleteBtn.addEventListener("click", () => {
  const index = deleteModalContainer.dataset.index;
  const collectionKey = deleteModalContainer.dataset.collectionKey;

  if (!collectionKey) {
    console.error("No collection key found on modal—cannot delete.");
    return;
  }

  // -- 4A. Grab the relevant array from localStorage
  let collection = JSON.parse(localStorage.getItem(collectionKey)) || [];

  // -- 4B. Splice out the item by its index in that array
  const [ removedEntity ] = collection.splice(index, 1);

  // -- 4C. Save back to localStorage
  localStorage.setItem(collectionKey, JSON.stringify(collection));

  // -- 4D. If we removed a student/instructor, remove them from any course that references them
  if (collectionKey === "student-collection" || collectionKey === "instructor-collection") {
    const courseArr = JSON.parse(localStorage.getItem("course-collection")) || [];

    // For students: remove them from course.students
    // For instructors: remove them from course.instructors
    if (removedEntity) {
      if (collectionKey === "student-collection") {
        courseArr.forEach((course) => {
          course.students = course.students.filter(
            (stu) => stu.email !== removedEntity.email
          );
          // If seats open up, set course.availability = true
          if (course.students.length < course.maxStudents) {
            course.availability = true;
          }
        });
      } else {
        // It's an instructor
        courseArr.forEach((course) => {
          course.instructors = course.instructors.filter(
            (inst) => inst.email !== removedEntity.email
          );
        });
      }
      // Save updated courses
      localStorage.setItem("course-collection", JSON.stringify(courseArr));
    }
  }

  // -- 4E. Re-render the UI for whichever collection changed
  if (collectionKey === "student-collection") {
    Ui.renderStudents();
    Ui.renderCourses(); // Update courses in case a student was removed
  } else if (collectionKey === "instructor-collection") {
    Ui.renderInstructors();
    Ui.renderCourses(); // Update courses if an instructor was removed
  } else if (collectionKey === "course-collection") {
    Ui.renderCourses();
  }

  //  hide the modal
  deleteModalContainer.style.display = "none";
});

