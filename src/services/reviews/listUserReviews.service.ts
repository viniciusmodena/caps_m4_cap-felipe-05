import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const listUserReviewsService = async (user_id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = userRepository.findOne({ where: { id: user_id } });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const reviews = await userRepository.findOne({
    relations: {
      reviews: true,
    },
    where: { id: user_id },
  });

  return reviews;
};

export default listUserReviewsService;
