import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider";
import { DayjsDateProvider } from "./implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
)
