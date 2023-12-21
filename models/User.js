"use strict";

class User {
  constructor(
    firstName,
    lastName,
    userName,
    passWord,
    category = "Entertainment",
    pagesize = 5
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.passWord = passWord;
    this.category = category;
    this.pagesize = pagesize;
  }
}
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
