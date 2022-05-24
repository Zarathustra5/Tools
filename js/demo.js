//Создаем объект предприятия
let itCompany = new Company("500na700");
let isMainMenuActive = false;

function mainMenu(){
  switch(prompt(`IT-Предприятие: ${itCompany.getName}\n1.Вывести название предприятия\n2.Поменять название предприятия\n3.Добавить отдел\n4.Удалить первый отдел\n5.Посчитать сумму финансов\n6.Вывести всю информацию\n7.Выбрать отдел\n8.Выход`)){
    case "1":
      alert(itCompany.getName);
      break;
    case "2":
      itCompany.setName = prompt("Введите новое название");
      break;
    case "3":
      itCompany.addDepartment(prompt("Введите название нового отдела"));
      break;
    case "4":
      itCompany.deleteDepartment();
      break;
    case "5":
      alert(itCompany.countFinance());
      break;
    case "6":
      alert(itCompany.getInfo);
      break;
    case "7":
      itCompany.chooseDepartment(prompt("Введите название отдела"));
      break;
    case "8":
      isMainMenuActive = false;
      break;
    default:
      alert("Введите верное значение");
      break;
  }
}
while(isMainMenuActive){mainMenu()}
