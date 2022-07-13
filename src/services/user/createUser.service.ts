import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/user";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/appError";

const createUserService = async ({
  user_name,
  email,
  password,
  is_adm,
}: IUser): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const emailAlreadyExist = users.find((user) => user.email === email);

  if (emailAlreadyExist) {
    throw new AppError("Email already exists!");
  }

  const user = new User();

  const hashedPassword = await hash(password, 10);

  user.user_name = user_name;
  user.email = email;
  user.password = hashedPassword;
  user.is_adm = is_adm;

  userRepository.create(user);
  await userRepository.save(user);

  delete user.password;

  return user;
};

export default createUserService;
