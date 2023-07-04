import { AuthModel } from "src/app/modules/auth/models/auth.model";

export class UserModel {
    id: number;
    username: string;
    email: string;
    password: string;
    token: string;

    setUser(_user: unknown) {
        const user = _user as UserModel;
        this.id = user.id;
        this.username = user.username || '';
        this.password = user.password || '';
        this.email = user.email || '';
        this.token = user.token || '';
  }
  
  
}