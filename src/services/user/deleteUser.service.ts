import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const deleteUserService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { id: id } });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await userRepository.delete(user!.id);
};

export default deleteUserService;
