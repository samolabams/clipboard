import { injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import httpStatus from 'http-status';
import Staff from '../models/staff.model';
import StaffRepo from '../repositories/staff.repo';
import AddStaffDto from '../dtos/add-staff.dto';
import AppError from '@shared/error/app.error';

@injectable()
class StaffService {
  constructor(private readonly staffRepo: StaffRepo) {}

  addNewStaff(dto: AddStaffDto): Staff {
    const staff = new Staff();

    staff.id = uuidv4();
    staff.name = dto.name;
    staff.currency = dto.currency;
    staff.salary = dto.salary;
    staff.on_contract = dto.on_contract || false;
    staff.department = dto.department;
    staff.sub_department = dto.sub_department;

    return this.staffRepo.save(staff);
  }

  deleteStaff(id: string) {
    const staffDeleted = this.staffRepo.delete(id);

    if (!staffDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, 'A staff with this id does not exist');
    }

    return id;
  }
}

export default StaffService;
