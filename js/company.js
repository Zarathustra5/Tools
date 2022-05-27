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
  set addDepartment(departmentName){       //Метод добавления отделения
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
      return 1;
    }else{
      return 0;
    }
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
    let pTemp = this._pCaption.next;
    while (pTemp != null){
      if (pTemp.getName == departmentName){
        return pTemp;
      }
      pTemp = pTemp.next;
    }
    return null;
  }
}
