// let date = new Date();
// console.log(date.getMonth());

let moment = require('moment');

let date = moment();
// date.add(1, 'year').subtract(1, 'months');
console.log(date.format('MMM Do, YYYY'));


console.log(date.format('h:m a'));


console.log('------------------');
let createdAt = new Date('January 10, 2006 03:24:00').getTime();
let newDate = moment(createdAt);
console.log(newDate.format('MMM Do, YYYY'));

console.log(newDate.format('h:m a'));


console.log('---------------');
console.log(moment().valueOf() === new Date().getTime());
