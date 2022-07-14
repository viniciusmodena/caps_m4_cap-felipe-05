import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const listUserReviewsService = async (user_id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  console.log(user_id);
  const reviews = await userRepository.findOne({
    relations: {
      reviews: true,
    },
    where: { id: user_id },
  });

  return reviews;
};

export default listUserReviewsService;
