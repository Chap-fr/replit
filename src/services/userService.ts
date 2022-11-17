import { Repository } from "typeorm";
import { User } from "../models/user.model";
import { dataSource } from "../tools/utils";
import * as argon2 from "argon2";

const repository: Repository<User> = dataSource.getRepository(User);

export default {
  /**
   * Return the user relative to the given email
   * @param email user email
   * @returns
   */
  getByEmail: async (email: string) => {
    return await repository.findOneByOrFail({ email });
  },

  getAll: async (): Promise<User[]> => {
    return await repository.find()
  },

  /**
   * Create a new user in the database.
   * @param email user email
   * @param password user password
   * @returns
   */
  create: async (email: string, password: string): Promise<User> => {
    const newUser = new User();
    newUser.email = email;

    newUser.password_hash = await argon2.hash(password);
    newUser.login = "login";
    return await repository.save(newUser);
  },
};