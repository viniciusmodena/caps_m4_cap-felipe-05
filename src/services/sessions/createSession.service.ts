import { AppDataSource } from "../../data-source";
import { IUserLogin } from "../../interfaces/user";
import { User } from "../../entities/user.entity";
import "dotenv/config";

import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";

const createSessionService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 403);
  }

  console.log('user.password: ', user.password)

  if (user.password) {
    const passwordCheck = await compare(password, user.password);

    if (!passwordCheck) {
      throw new AppError("Invalid email or password", 403);
    }
  }

  const token = jwt.sign(
    { id: user.id, adm: user.is_adm },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return token;
};

export default createSessionService;
