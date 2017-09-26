const uuid = jest.genMockFromModule('uuid');
uuid.v4 = jest.fn(() => {
  return 1;
});
module.exports = uuid;