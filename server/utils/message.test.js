const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');



describe('generate message', () => {
  it('should generate correct message object', () => {
    let testMessage = generateMessage("john", "hey whats up");
    // expect(testMessage.from).toBe("john");
    // expect(testMessage.text).toBe("hey whats up");
    expect(testMessage).toMatchObject({
      from: "john",
      text: "hey whats up"
    });
    expect(testMessage.createdAt).toBeTruthy();
  });
});


describe('generate location message', () => {
  it('should generate correct message object', () => {
    let testLocationMessage = generateLocationMessage("michael", "53.33345", "-53589838");
    expect(testLocationMessage).toMatchObject({
      from: "michael",
      url: "https://www.google.com/maps?q=53.33345,-53589838"
    });
    expect(testLocationMessage.createdAt).toBeTruthy();
  });
});
