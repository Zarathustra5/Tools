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
  }
  set addDepartment(departmentName){       //Метод добавления отделения
    if (this._pCaption._next != null){
      this._pLast._next = new Department(departmentName);
      this._pLast = this._pLast._next;
    }else{
      this._pCaption._next = new Department(departmentName);
      this._pLast = this._pCaption._next;
    }
  }
  deleteDepartment(){       //Метод удаления отделения
    if (this._pCaption._next != null){
      this._pCaption._next = this._pCaption._next._next;
      return 1;
    }else{
      return 0;
    }
  }
  countFinance(){        //Метод подсчета общего объема финансирования
    let pTemp = this._pCaption._next;
    let res = 0
    while (pTemp != null){
      res += pTemp.countFinance();
      pTemp = pTemp._next;
    }
    return res;
  }
  get getInfo(){        //Геттер получения всей информации
    let res = "";
    let pTemp = this._pCaption._next;
    while (pTemp != null){
      res += `Отдел: ${pTemp.getName}\n${pTemp.getInfo}\n`;
      pTemp = pTemp._next;
    }
    return res;
  }
  chooseDepartment(departmentName){       //Метод выбора отделения, с которым будем работать
    let pTemp = this._pCaption._next;
    while (pTemp != null){
      if (pTemp.getName == departmentName){
        return pTemp;
      }
      pTemp = pTemp._next;
    }
    return null;
  }
  downloadCompany(obj){
    let pTempTo = this._pCaption._next;
    let pTempFrom = obj._pCaption._next;
    while (pTempFrom != null){
      pTempTo = new Department(pTempFrom._name);
      for (let i = 0; i < pTempFrom._projects.length; i++){
        pTempTo._projects[i] = new Project(pTempFrom._projects[i]._name);
        pTempTo._projects[i].setFinance = pTempFrom._projects[i]._finance;
      }
      pTempTo = pTempTo._next;
      pTempFrom = pTempFrom._next;
    }
  }
}
