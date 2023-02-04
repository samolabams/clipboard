import { FastifyReply, FastifyRequest } from 'fastify';
import { injectable } from 'tsyringe';
import httpStatus from 'http-status';
import StaffService from '../services/staff.service';
import AddStaffDto from '../dtos/add-staff.dto';
import { SuccessResponse } from '@shared/utils/response.util';

@injectable()
class StaffController {
  constructor(private readonly staffService: StaffService) {}

  addNewStaff = (req: FastifyRequest<{ Body: AddStaffDto }>, res: FastifyReply) => {
    const staff = this.staffService.addNewStaff(req.body);

    res.code(httpStatus.CREATED).send(SuccessResponse('New staff successfully added', staff));
  };

  deleteStaff = (req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) => {
    const id = this.staffService.deleteStaff(req.params.id);

    res.send(SuccessResponse(`Staff successfully deleted`, { id }));
  };
}

export default StaffController;
