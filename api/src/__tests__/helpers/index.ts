export async function expectError(response: any, error:any){
  expect.assertions(2);
  expect(response.statusCode).toBe(422);
  expect(response.text).toMatch(error);
}