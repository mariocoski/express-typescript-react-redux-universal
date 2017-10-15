module.exports = {
  hash: jest.fn(()=>{
    return Promise.resolve('hashedpassword');
  }),
  compare: jest.fn(()=>{
    return Promise.resolve(true);
  })
}