import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserUpdate } from "../../interfaces/user";
import * as bcrypt from "bcryptjs";

const updateInfoUserService = async (
  userId: string,
  data: IUserUpdate
): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (data.email) {
    const users = await userRepository.find();

    const emailAlreadyExist = users.find((el) => el.email === data.email);

    if (emailAlreadyExist) {
      throw new AppError("Email already exists");
    }
  }

  if (data.password) {
    data.password = bcrypt.hashSync(data.password, 10);
  }

  await userRepository
    .createQueryBuilder()
    .update(User)
    .set(data)
    .where("id = :id", { id: userId })
    .execute();

  const userUpdated = await userRepository.findOneBy({ id: userId });

  if (!userUpdated) {
    throw new AppError("User not found", 404);
  }

  return userUpdated;
};

export default updateInfoUserService;
