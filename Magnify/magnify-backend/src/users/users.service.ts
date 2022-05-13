import { Injectable, Session } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) { }

  async create(createUserInput: CreateUserInput,  @Session() session) {
    const createdUser = await this.userModel.create(createUserInput);
    session.username = createdUser.username;
    return createdUser;
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(email: String) {
    return this.userModel.findOne({ email: email });
  }

  async findEmailByUsername(username: string) {
    const user = await this.userModel
      .findOne({ username: username })
      .exec();

    if (!user) return null;
    return user.email;
  }


  async login({ email, password }: LoginUserInput, @Session() session) {
    const user = await this.userModel.findOne({ email });

    // Check that user exists
    // Compare input password with the user's hashed password
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid email or password');
    }

    session.username = user.username;
    console.log(session);
    console.log(session.id)
    return user;

  }

  async logout(session: Record<string, any>) {
    console.log("destroying the following:");
    console.log(session);
    console.log(session.id);
    session.destroy()
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.userModel.updateOne({ _id: id }, { $set: updateUserInput });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
