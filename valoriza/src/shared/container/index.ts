import { container } from "tsyringe";

import { ITagsRepository, TagsRepository } from "@modules/tags/infra/repositories/tagRepository";
import { IUsersRepository, UsersRepository } from "@modules/users/infra/repositories/userRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ITagsRepository>(
  "TagsRepository",
  TagsRepository
);
