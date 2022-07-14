import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const deleteUserService = async (userId: string): Promise<Object> => {
  const userRepository = AppDataSource.getRepository(User);
  const userToDelete = await userRepository.delete({ id: userId });

  if (!!userToDelete) {
    throw new AppError("User not found!");
  }
  return userToDelete;
};

export default deleteUserService;
