import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { User } from "../../../entities/user.entity";
import createUserService from "../../../services/user/createUser.service";
import deleteUserService from "../../../services/user/deleteUser.service";
import listOneUserService from "../../../services/user/listOneUser.service";
import listUsersService from "../../../services/user/listUsers.service";
import updateInfoUserService from "../../../services/user/updateInfoUser.service";

describe("Create an user", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.createQueryBuilder().delete().from(User).execute();

    await connection.destroy();
  });

  test("Should insert the information of the new user in the database", async () => {
    const user_name = "teste1";
    const email = "teste1@mail.com";
    const password = "1234";
    const is_adm = true;

    const userData = { user_name, email, password, is_adm };

    const newUser = await createUserService(userData);

    expect(newUser).toEqual(
      expect.objectContaining({
        user_name,
        email,
      })
    );
  });

  test("Should list all registered users", async () => {
    const userList = await listUsersService();

    expect(userList).toHaveProperty("map");
  });

  test("Should list a specifc user", async () => {
    const userList = await listUsersService();

    const id = userList[0].id;

    const oneUser = await listOneUserService(id);

    expect(oneUser.id).toEqual(id);
  });

  test("Should update a specifc user", async () => {
    const userList = await listUsersService();

    const id = userList[0].id;

    const email = "fulano@mail.com";

    const userData = { email };

    const res = await updateInfoUserService(id, userData);

    expect(res.email).toEqual(email);
  });

  test("Should delete a specific user", async () => {
    const userList = await listUsersService();
    const id = userList[0].id;

    await deleteUserService(id);

    const newUserList = await listUsersService();
    const res = newUserList.find((user) => user.id === id);

    expect(res).toEqual(undefined);
  });
});
