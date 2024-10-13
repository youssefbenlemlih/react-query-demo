const { faker } = require("@faker-js/faker");
const countryCodesMap = require("./countryCodesMap.js");
const initialContacts = [];
for (let index = 0; index < 100; index++) {
  initialContacts.push({
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: phoneNumber(),
    address: faker.location.secondaryAddress(),
  });
}
function get_random(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function phoneNumber() {
  const code = get_random(countryCodesMap).dialCode;
  return `(${code}) ${faker.number
    .int({
      min: 0,
      max: 999,
    })
    .toString()
    .padStart(3, "0")}-${faker.number
    .int({ min: 0, max: 999 })
    .toString()
    .padStart(3, "0")}`;
}
module.exports = initialContacts;
