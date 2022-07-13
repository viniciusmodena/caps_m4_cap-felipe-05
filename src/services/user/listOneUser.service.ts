import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const listOneUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.findOneBy({ id: id });

  if (!user) {
    throw new AppError("User not found!");
  }

  return user;
};

export default listOneUserService;
