import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/DateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
)