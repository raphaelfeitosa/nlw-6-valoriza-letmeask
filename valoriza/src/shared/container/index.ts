import { container } from "tsyringe";

import { ITagsRepository, TagsRepository } from "@modules/tags/infra/repositories/tagRepository";
import { IUsersRepository, UsersRepository } from "@modules/users/infra/repositories/userRepository";
import { IComplimentRepository, ComplimentsRepository } from "@modules/compliments/infra/repositories";
import { IDateProvider, DaysJSDateProvider } from "@shared/container/providers/dateProvider";
import { IUsersTokensRepository, UsersTokensRepository } from "@modules/users/infra/repositories/userToken";

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
container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);
container.registerSingleton<IDateProvider>(
  "DaysJSDateProvider",
  DaysJSDateProvider
);
