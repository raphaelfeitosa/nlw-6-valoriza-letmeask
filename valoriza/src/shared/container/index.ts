import { container } from "tsyringe";

import { ITagsRepository, TagsRepository } from "@modules/tags/infra/repositories/tagRepository";
import { IUsersRepository, UsersRepository } from "@modules/users/infra/repositories/userRepository";
import { ComplimentsRepository, IComplimentRepository } from "@modules/compliments/infra/repositories";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ITagsRepository>(
  "TagsRepository",
  TagsRepository
);

container.registerSingleton<IComplimentRepository>(
  "ComplimentsRepository",
  ComplimentsRepository
);
