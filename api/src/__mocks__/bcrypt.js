module.exports = {
  hash: jest.fn(()=>{
    return Promise.resolve('hashedpassword');
  }),
  compare: jest.fn((password)=>{
    if(password === 'password'){
      return Promise.resolve(true);
    }else{
      return Promise.reject(false);
    } 
  })
}