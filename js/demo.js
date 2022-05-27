//-----События нажатия на элементы меню------
let dialogueInput = document.querySelector(".dialogue_input");
let dialogueForm = document.querySelector(".dialogue__form");
let dialogueOutput = document.querySelector(".dialogue_output");
let dialogueAlert = document.querySelector(".dialogue_alert");
let answer;
let currentDepartment = null;

let tableCompany = document.querySelector(".table_company");
let tableProjects = document.querySelector(".table_projects");

//Асинхронность
function submit(callback){
  dialogueForm.onsubmit = () => callback(answer); 
}

//Данные формы ввода
dialogueForm.addEventListener("submit", e => {
  e.preventDefault();     
  let formData = new FormData(dialogueForm);
  if (formData.get("answer") != ""){
    dialogueInput.classList.remove("_active");
    answer = formData.get("answer");
    dialogueForm.querySelector(".input").value = "";
  }
});

//Создание объекта предприятия
let tableCompanyTitle = document.querySelector(".tabele_company th");
let itCompany;
submit(answer => itCompany = new Company(answer));

//1.Вывести название преприятия
function companyGetName() {
  dialogueOutput.classList.add("_active");
  dialogueOutput.lastElementChild.lastElementChild.textContent = itCompany.getName;
}

//2.Изменить название предприятия
function companySetName() {
  dialogueInput.querySelector(".label").textContent = "Введите новое название предприятия: "; dialogueInput.classList.add("_active");
  submit(answer => itCompany.setName = answer);
}

//3.Добавить отдел
function addDepartment() {
  dialogueInput.querySelector(".label").textContent = "Введите название отдела: ";
  dialogueInput.classList.add("_active");
  submit(answer => {
    itCompany.addDepartment = answer;
    tableCompany.lastElementChild.insertAdjacentHTML("beforeend", `<tr class="${answer}" title="Кликните для просмотра проектов"><td>${answer}</td><td>0</td><td>0$</td></tr>`);
  });
}

//4.Удалить отдел
function deleteDepartment() {
  if (itCompany.deleteDepartment()){
    tableCompany.lastElementChild.firstElementChild.remove();
  }else{
    dialogueAlert.querySelector(".label").textContent = "Отделы не найдены";
    dialogueAlert.classList.add("_active");
  }
}

//5.Выбрать отдел
function chooseDepartment() {
  dialogueInput.querySelector(".label").textContent = "Введите название отдела: ";
  dialogueInput.classList.add("_active");
  submit(answer => {
    let searchResult = itCompany.chooseDepartment(answer); 
    if (searchResult){
      document.querySelector(".department").classList.add("_active");
      currentDepartment = searchResult;
    }else{
      dialogueAlert.querySelector(".label").textContent = "Отдел не найден";
      dialogueAlert.classList.add("_active");
    }
  });
}

//Кнопка закрыть
let closeBtn = document.querySelectorAll("hr.close");
closeBtn.forEach(el => {
  el.onclick = () => {
    let closedWindow = el.parentElement.parentElement.parentElement;
    closedWindow.classList.remove("_active");
    if (closedWindow.classList.contains("plan")){
      closedWindow.querySelector("select").remove();
    }
  }
});

let fullscreenBtn = document.querySelectorAll("hr.fullscreen");
fullscreenBtn.forEach(el => {
  el.onclick = () => {
    el.parentElement.parentElement.parentElement.classList.toggle("_fullscreen");
  }
});

//-----События нажатия на элементы меню------
//1.Вывести название отдела
function departmentGetName() {
  dialogueOutput.classList.add("_active");
  dialogueOutput.lastElementChild.lastElementChild.textContent = currentDepartment.getName;
}

//2.Изменить название отдела
function departmentSetName() {
  dialogueInput.querySelector(".label").textContent = "Введите новое название отдела: ";
  dialogueInput.classList.add("_active");
  submit(answer => {
    tableCompany.querySelector(`.${currentDepartment.getName}`).firstElementChild.textContent = answer;
    currentDepartment.setName = answer;
  });
}

//3.Добавить проект
function addProject() {
  let beforeAfter;
  let projectFromList;
  dialogueInput.querySelector(".label").textContent = "перед/после: ";
  dialogueInput.classList.add("_active");
  submit(answer => {
    beforeAfter = answer;
    dialogueInput.querySelector(".label").textContent = "Введите название проекта из списка: ";
    dialogueInput.classList.add("_active");
    submit(answer => {
      projectFromList = answer;
      dialogueInput.querySelector(".label").textContent = "Введите название проекта: ";
      dialogueInput.classList.add("_active");
      let result = currentDepartment.addProject(answer, projectFromList, beforeAfter); 
      submit(answer => {
        if (result == 1){
          tableProjects.lastElementChild.insertAdjacentHTML("beforeend", `<tr class="${answer}" title="Кликните для просмотра проектов"><td>${answer}</td><td>0$</td></tr>`);
        }else if (result == 2){
          if (beforeAfter == "перед"){
            tableProjects.querySelector(`.${projectFromList}`).insertAdjacentHTML("beforebegin", `<tr class="${answer}" title="Кликните для просмотра проектов"><td>${answer}</td><td>0$</td></tr>`);
          }else{
            tableProjects.querySelector(`.${projectFromList}`).insertAdjacentHTML("afterend", `<tr class="${answer}" title="Кликните для просмотра проектов"><td>${answer}</td><td>0$</td></tr>`);
          }
        }else{
          alert("Ошибка");
        }
      });
    });
  });
}

//4.Удалить проект
function deleteProject() {
}
