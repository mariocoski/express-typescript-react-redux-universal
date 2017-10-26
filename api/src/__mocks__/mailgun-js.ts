module.exports = jest.fn((options)=>{
  return {
    messages: jest.fn(() => {
      return {
        send: jest.fn()
      }
    })
  }
})