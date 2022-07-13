import { UpdateResult } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const updateInfoUserService = async (userId: string, data: any) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found!");
  }

  //   user.password =

  //   userRepository.()
};
