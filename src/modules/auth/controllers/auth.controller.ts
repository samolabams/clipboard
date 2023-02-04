import { FastifyReply, FastifyRequest } from 'fastify';
import { injectable } from 'tsyringe';
import LoginService from '../services/auth.service';
import LoginDto from '../dtos/login.dto';
import { SuccessResponse } from '@shared/utils/response.util';

@injectable()
class AuthController {
  constructor(private readonly authService: LoginService) {}

  login = async (req: FastifyRequest<{ Body: LoginDto }>, res: FastifyReply) => {
    const response = await this.authService.login(req.body);

    res.send(SuccessResponse('Login successful', response));
  };

  logout = (req: FastifyRequest, res: FastifyReply) => {
    this.authService.logout((req as any).user.id);

    res.send(SuccessResponse('Logout successful'));
  };
}

export default AuthController;
