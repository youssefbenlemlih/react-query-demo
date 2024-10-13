const { faker } = require("@faker-js/faker");
const initialUsers = [];

for (let index = 0; index < 100; index++) {
  initialUsers.push({
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.phone.number(),
    address: faker.location.secondaryAddress(),
  });
}
module.exports = initialUsers;
