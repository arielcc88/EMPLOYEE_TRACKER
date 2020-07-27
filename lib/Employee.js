class Employee {
  //class constructor
  constructor(id, f_name, l_name, role_id, manager_id) {
    //setting class attributes
    this.id = id;
    this.f_name = f_name;
    this.l_name = l_name;
    this.role_id = role_id;
    this.manager_id = manager_id;
  }

  /*--------
    METHODS
    --------*/
  //get employee's ID
  getId() {
    return this.id;
  }

  //get employee's name
  getName() {
    return `${this.f_name} ${this.l_name}`;
  }

  //get employee's email
  getRoleId() {
    return this.role_id;
  }

  //get Role -> defaults to Employee
  getManagerId() {
    return this.manager_id;
  }
}

//exporting parent class
module.exports = Employee;
