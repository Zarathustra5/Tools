//Объявление класса IT-предприятий
class Company{
  constructor(name){     //Конструктор
    this._name = name;   //название предприятия (знак "_" в начале означает закрытое свойство)
    this._pCaption = new Department();    //ссылка на заголовок очереди отделений
    this._pLast = null;    //ссылка на последний элемент очереди отделений 
  }
  get getName(){         //Геттер, возвращающий название предприятия
    return this._name;
  }
  set setName(newName){   //Сеттер, изменяющий название предприятия
    this._name = newName;
    alert("Название предприятия успешно изменено");
  }
  addDepartment(departmentName){       //Метод добавления отделения
    if (this._pCaption.next != null){
      this._pLast.next = new Department(departmentName);
      this._pLast = this._pLast.next;
    }else{
      this._pCaption.next = new Department(departmentName);
      this._pLast = this._pCaption.next;
    }
  }
  deleteDepartment(){       //Метод удаления отделения
    if (this._pCaption.next != null){
      this._pCaption.next = this._pCaption.next.next;
      alert("Отдел удален успешно");
    }else{
      alert("Отделы отсутствуют");
    }
  }
  searchDepartment(departmentName){  //Метод поиска отделения
    let pTemp = this._pCaption.next;
    while (pTemp != null){
      if (pTemp.getName == departmentName){
        return pTemp;
      }
      pTemp = pTemp.next;
    }
    return null;
  }
  countFinance(){        //Метод подсчета общего объема финансирования
    let pTemp = this._pCaption.next;
    let res = 0
    while (pTemp != null){
      res += pTemp.countFinance();
      pTemp = pTemp.next;
    }
    return res;
  }
  get getInfo(){        //Геттер получения всей информации
    let res = "";
    let pTemp = this._pCaption.next;
    while (pTemp != null){
      res += `Отдел: ${pTemp.getName}\n${pTemp.getInfo}\n`;
      pTemp = pTemp.next;
    }
    return res;
  }
  chooseDepartment(departmentName){       //Метод выбора отделения, с которым будем работать
    let isDepartmentMenuActive = true;
    function departmentMenu(currentDepartment){
      switch(prompt(`Отдел: ${currentDepartment.getName}\n1.Вывести название отдела\n2.Поменять название отдела\n3.Добавить проект\n4.Удалить проект\n5.Посчитать сумму финансов\n6.Вывести всю информацию\n7.Выбрать проект\n8.Вернуться в меню предприятия`)){
        case "1":
          alert(currentDepartment.getName);
          break;
        case "2":
          currentDepartment.setName = prompt("Введите новое название");
          break;
        case "3":
          currentDepartment.addProject(prompt("Введите название нового проекта"));
          break;
        case "4":
          currentDepartment.deleteProject(prompt("Введите название удаляемого проекта"));
          break;
        case "5":
          alert(currentDepartment.countFinance());
          break;
        case "6":
          alert(currentDepartment.getInfo);
          break;
        case "7":
          currentDepartment.chooseProject(prompt("Введите название проекта"));
          break;
        case "8":
          isDepartmentMenuActive = false;
          break;
        default:
          alert("Введите верное значение");
          break;
      }
    }
    if (this._pCaption.next != null){
      let currentDepartment = this.searchDepartment(departmentName);
      if (currentDepartment){
        while(isDepartmentMenuActive){departmentMenu(currentDepartment)}
      }else{
        alert("Отдел не найден");
      }
    }else{
      alert("Проектов нет");
    }
  }
}
