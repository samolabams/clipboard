import { singleton } from 'tsyringe';
import { groupBy } from 'lodash';
import staffSeeder from '../data/staff-seeder';
import Staff from '../models/staff.model';

@singleton()
class StaffRepo {
  private staffs: Map<string, Staff>;

  constructor() {
    this.staffs = new Map<string, Staff>();

    this.loadData();
  }

  loadData() {
    for (const staff of staffSeeder) {
      this.staffs.set(staff.id, staff);
    }
  }

  save(staff: Staff) {
    this.staffs.set(staff.id, staff);

    return staff;
  }

  getAll() {
    return Array.from(this.staffs.values()) || [];
  }

  getContractStaffs() {
    return this.getAll().filter((staff) => staff.on_contract === true);
  }

  getByDepartments() {
    return groupBy(this.getAll(), 'department');
  }

  delete(id: string) {
    return this.staffs.delete(id);
  }
}

export default StaffRepo;
