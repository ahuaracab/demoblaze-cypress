import { faker } from "@faker-js/faker";

export function userData() {
  return {
    name: faker.finance.accountName(),
    country: faker.location.country(),
    city: faker.location.city(),
    creditCard: faker.finance.creditCardNumber(),
    month: faker.number.int({ min: 1, max: 12 }),
    year: faker.number.int({
      min: new Date().getFullYear(),
      max: new Date().getFullYear() + 5,
    }),
  };
}

export function loginData() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };
}
