// [{
//   id: '76547647jfcj',
//   name: 'andrew',
//   room: 'the office fans'
// }]


// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)


//creating new classes
  // class User {
  //   constructor (name, age) {
  //     //this refers to the instance
  //     this.name = name;
  //     this.age = age;
  //   }

  //   getUserDescription () {
  //     return `${this.name} is ${this.age} years old`;
  //   }
  // }


  // let me = new User('shinno', 29);
  // console.log(me.getUserDescription());


class Users {
  constructor () {
    this.usersArray = [];
  }

  addUser (id, name, room) {
    let user = {id, name, room};
    this.usersArray.push(user);
    return user;
  }

  removeUser (id) {
    //return user that was removed
    let userToDelete = this.usersArray.find(user => user.id === id);
    if (userToDelete) {
      let indexToDelete = this.usersArray.indexOf(userToDelete);
      this.usersArray.splice(indexToDelete, 1);
    }
    return userToDelete;
  }

  getUser (id) {
    return this.usersArray.find(user => user.id === id);
  }

  getUserList (room) {
    //return all users in room in the form of array of names

    let users = this.usersArray.filter(user => user.room === room);
    let namesInRoom = users.map(user => user.name);

    return namesInRoom;
  }
};


module.exports = {
  Users
};
