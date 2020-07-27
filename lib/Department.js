//deparment class for DB insertion
class Department {
  constructor(name) {
    //defining dept name
    this.name = name;
  }

  getDeptName() {
    return this.name;
  }
}

module.exports = Department;
