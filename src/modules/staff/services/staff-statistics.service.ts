import { injectable } from 'tsyringe';
import { groupBy } from 'lodash';
import Staff from '../models/staff.model';
import StaffRepo from '../repositories/staff.repo';

@injectable()
class StaffStatisticsService {
  constructor(private readonly staffRepo: StaffRepo) {}

  calculateSummaryStatisticsForAllStaffs(): { mean: number; min: number; max: number } {
    const allStaffs = this.staffRepo.getAll();

    return this.calculateSummaryStatistics(allStaffs);
  }

  calculateSummaryStatisticsForContractStaffs(): { mean: number; min: number; max: number } {
    const contractStaffs = this.staffRepo.getContractStaffs();

    return this.calculateSummaryStatistics(contractStaffs);
  }

  calculateSummaryStatisticsByDepartment() {
    const statistics = {};
    const staffByDepartments = this.staffRepo.getByDepartments();

    for (const [key, value] of Object.entries(staffByDepartments)) {
      statistics[key] = this.calculateSummaryStatistics(value);
    }

    return statistics;
  }

  calculateSummaryStatisticsBySubDepartment() {
    const staffBySubDepartments = {};
    const statistics = {};
    const staffByDepartments = this.staffRepo.getByDepartments();

    for (const [key, value] of Object.entries(staffByDepartments)) {
      const subDepartmentGroup = groupBy(value, 'sub_department');
      staffBySubDepartments[key] = groupBy(value, 'sub_department');

      for (const [key, value] of Object.entries(subDepartmentGroup)) {
        statistics[key] = this.calculateSummaryStatistics(value);
      }
    }

    return statistics;
  }

  private calculateSummaryStatistics(staffs: Staff[]): { mean: number; min: number; max: number } {
    if (staffs.length === 0) return { mean: 0, min: 0, max: 0 };

    const indexSalary = Number(staffs[0].salary);
    const to2DP = (num: number): number => +num.toFixed(2);

    const mean =
      staffs.reduce((sum, staff) => {
        return sum + Number(staff.salary);
      }, 0) / staffs.length;

    const min = staffs.reduce((current, staff) => {
      return Math.min(current, Number(staff.salary));
    }, indexSalary);

    const max = staffs.reduce((current, staff) => {
      return Math.max(current, Number(staff.salary));
    }, indexSalary);

    return { mean: to2DP(mean), min: to2DP(min), max: to2DP(max) };
  }
}

export default StaffStatisticsService;
