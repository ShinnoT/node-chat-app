const expect = require('expect');

// import isRealString function from utils/validations.js
const {isRealString} = require('./validations');


describe('isRealString', () => {
  rightString = 'blah blah';
  nonString = '     ';
  emptyString = '';

  it('should reject non-string values', () => {
    expect(isRealString(emptyString)).toBeFalsy();
  });

  it('should reject string with only spaces', () => {
    expect(isRealString(nonString)).toBeFalsy();
  });

  it('should allow string with non-space characters', () => {
    expect(isRealString(rightString)).toBeTruthy();
  });
});
