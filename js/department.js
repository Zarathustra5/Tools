//Объявление класса отделений
class Department{
  constructor(name){     //Конструктор
    this._name = name;   //название отделения (знак "_" в начале означает закрытое свойство)
    this._projects = [];          //проекты
    this._next = null;      //следующий элемент очереди отделений
  }
  get getName(){         //Геттер, возвращающий название отделения
    return this._name;
  }
  set setName(newName){   //Сеттер, изменяющий название отделения
    this._name = newName;
    alert("Название отдела успешно изменено");
  }
  addProject(projectName){      //Метод добавления проекта
    if (this._projects.length > 0){
      let indexOfProject = this.searchProject(prompt("Введите название проекта из списка"));
      if (indexOfProject !== null){
        if (prompt("Добавить перед/после") == "перед"){
          for (let i = this._projects.length; i > indexOfProject; i--){
            this._projects[i] = this._projects[i - 1];
          }
          this._projects[indexOfProject] = new Project(projectName);
        }else{
          for (let i = this._projects.length; i > indexOfProject; i--){
            this._projects[i] = this._projects[i - 1];
          }
          this._projects[indexOfProject + 1] = new Project(projectName);

        }
      }else{
        alert("Проект не найден");
      }
    }else{
      this._projects.push(new Project(projectName));
    }
  }
  deleteProject(projectName){       //Метод удаления проекта
    if (this._projects.length > 0){
      let indexOfProject = this.searchProject(projectName);
      if (indexOfProject !== null){
        for (let i = indexOfProject; i < this._projects.length; i++){
          this._projects[i] = this._projects[i + 1];
        }
        this._projects.pop();
      }else{
        alert("Проект не найден");
      }
    }else{
      alert("Проектов нет");
    }
  }
  searchProject(projectName){  //Метод поиска проекта
    for (let el of this._projects){
      if (el.getName == projectName){
        return this._projects.indexOf(el);
      }
    }
    return null;
  }
  countFinance(){        //Метод подсчета общего объема финансирования по отделу
    let res = 0;
    for (let el of this._projects){
      if (el.getFinance){
        res += Number(el.getFinance);
      }
    }
    return res;
  }
  get getInfo(){        //Геттер получения всей информации
    let res = "";
    for (let el of this._projects){
      res += `\t${el.getInfo}\n`;
    }
    return res;
  }
  chooseProject(projectName){       //Метод выбора проекта, с которым будем работать
    let isProjectMenuActive = true;
    function projectMenu(currentProject){
      switch(prompt(`Проект: ${currentProject.getName}\n1.Вывести название проекта\n2.Поменять название проекта\n3.Вывести объем финансов\n4.Изменить объем финансов\n5.Вывести всю информацию\n6.Вернуться в меню отдела`)){
        case "1":
          alert(currentProject.getName);
          break;
        case "2":
          currentProject.setName = prompt("Введите новое название");
          break;
        case "3":
          alert(currentProject.getFinance);
          break;
        case "4":
          currentProject.setFinance = prompt("Введите новый объем финансирования");
          break;
        case "5":
          alert(currentProject.getInfo);
          break;
        case "6":
          isProjectMenuActive = false;
          break;
        default:
          alert("Введите верное значение");
          break;
      }
    }
    if (this._projects.length > 0){
      let indexOfProject = this.searchProject(projectName);
      let currentProject = this._projects[indexOfProject];
      if (currentProject){
        while(isProjectMenuActive){projectMenu(currentProject)}
      }else{
        alert("Проект не найден");
      }
    }else{
      alert("Проектов нет");
    }
  }
}
