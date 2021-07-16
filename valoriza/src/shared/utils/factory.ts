import faker from "faker";
import factory from "factory-girl";

factory.define(
  'User',
  {},
  {
    name: faker.name.findName,
    email: faker.internet.email,
    password: faker.internet.password,
    admin: faker.datatype.boolean,
  }
);
factory.define(
  'Tag',
  {},
  {
    name: faker.lorem.word,
  }
);
factory.define(
  'Compliment',
  {},
  {
    tag_id: faker.datatype.uuid,
    user_sender: faker.datatype.uuid,
    user_receiver: faker.datatype.uuid,
    message: faker.lorem.sentence,
  }
);
export { factory };
