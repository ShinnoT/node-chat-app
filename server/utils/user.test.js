const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.usersArray = [{
      id: '1',
      name: 'Mike',
      room: 'Node course'
    }, {
      id: '2',
      name: 'Andrew',
      room: 'Node course'
    }, {
      id: '3',
      name: 'Jordan',
      room: 'React course'
    }];
  });

  it('should add new user', () => {
    // redefininf the global variable users here
    // so it doesnt use default beforeEach
    let users = new Users();
    let user = {
      id: '123',
      name: 'Coolio',
      room: 'The Office Fans'
    };
    let resUser = users.addUser(user.id, user.name, user.room);
    expect(users.usersArray).toEqual([user]);
  });

  it('should return names for NODE course', () => {
    correctArray = ['Mike', 'Andrew'];
    expect(users.getUserList('Node course')).toEqual(correctArray);
    expect(users.getUserList('Node course').length).toBe(2);
  });

  it('should return names for REACT course', () => {
    correctArray = ['Jordan'];
    expect(users.getUserList('React course')).toEqual(correctArray);
    expect(users.getUserList('React course').length).toBe(1);
  });

  it('should delete user', () => {
    let deletedUser = users.removeUser('3');
    let jordan = {
      id: '3',
      name: 'Jordan',
      room: 'React course'
    };
    expect(deletedUser).toEqual(jordan);
    expect(users.usersArray.length).toBe(2);
  });

  it('should not delete user', () => {
    let deletedUser = users.removeUser('5');
    expect(deletedUser).toBeFalsy();
    expect(users.usersArray.length).toBe(3);
  });

  it('should fetch user by id', () => {
    expect(users.getUser('3')).toEqual(users.usersArray[2]);
  });

  it('should not fetch user by id', () => {
    expect(users.getUser('5')).toBeFalsy();
  });

});
