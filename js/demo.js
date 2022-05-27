//-----События нажатия на элементы меню------
let dialogueInput = document.querySelector(".dialogue_input");
let dialogueForm = document.querySelector(".dialogue__form");
let dialogueOutput = document.querySelector(".dialogue_output");
let answer;
let currentPlan = null;

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
function getName() {
  dialogueOutput.classList.add("_active");
  dialogueOutput.lastElementChild.lastElementChild.textContent = itCompany.getName;
}

//2.Изменить название предприятия
function setName() {
  dialogueInput.querySelector(".label").textContent = "Введите новое название предприятия: ";
  dialogueInput.classList.add("_active");
  submit(answer => itCompany.setName = answer);
}

//3.Добавить отдел
function addDepartment() {
  dialogueInput.querySelector(".label").textContent = "Введите название отдела: ";
  dialogueInput.classList.add("_active");
  submit(answer => itCompany.addDepartment = answer);
}

//4.Удалить отдел
function deleteDepartment() {
  dialogueOutput.classList.add("_active");
  dialogueOutput.lastElementChild.lastElementChild.textContent = itCompany.deleteDepartment();
}

//5.Найти отдел
function searchDepartment() {
  alert(itCompany.searchDepartment(prompt("Введите название плана")));
}

//7.Выбрать план
function chooseDepartment() {
  itCompany.chooseDepartment();
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
//1.Вывести название плана
function showPlanName() {
  alert(currentPlan.getName);
}

//2.Изменить название плана
function changePlanName() {
  currentPlan.setName = prompt("Введите новое название:");
}

//3.Вывести предмет
function showPlanHours() {
  alert(currentPlan.getHours(prompt("Введите название предмета:")));
}

//4.Добавить предмет и часы
function addPlanHours() {
  currentPlan.addHours(prompt("Введите название предмета:"), prompt("Введите количество часов:")); }

//5.Изменить часы
function changePlanHours() {
  currentPlan.changeHours(prompt("Введите название предмета:"), prompt("Введите новое значение:"));
}

//6.Сумма
function showPlanSum() {
  alert(currentPlan.getHoursSum);
}

//7.Показать всю информацию
function showPlanData() {
  alert(currentPlan.getData);
}
