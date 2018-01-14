const expect = require('expect');
const {generateMessage} = require('./message');

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
