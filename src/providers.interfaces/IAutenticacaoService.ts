import { LoginModel } from '../models/LoginModel';

export interface IAutenticacaoService {

    login(loginModel: LoginModel): boolean;
    logout(): void;
}