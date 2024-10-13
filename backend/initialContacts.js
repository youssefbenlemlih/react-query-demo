const { faker } = require("@faker-js/faker");
const initialContacts = [];

for (let index = 0; index < 100; index++) {
  initialContacts.push({
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.phone.number(),
    address: faker.location.secondaryAddress(),
  });
}
module.exports = initialContacts;
