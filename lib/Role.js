//deparment class for DB insertion
class Role {
  constructor(title, salary, department_id) {
    //defining dept name
    this.title = title;
    this.salary = salary;
    this.department_id = department_id;
  }

  getRole() {
    return this.title;
  }

  getSalary(){
    return this.salary;
  }

  getDeptId(){
    return this.department_id;
  }
}

module.exports = Role;
