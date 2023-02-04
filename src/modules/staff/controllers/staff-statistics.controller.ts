import { FastifyReply, FastifyRequest } from 'fastify';
import { injectable } from 'tsyringe';
import StaffStatisticsService from '../services/staff-statistics.service';
import { SuccessResponse } from '@shared/utils/response.util';

@injectable()
class StaffStatisticsController {
  constructor(private readonly staffStatisticsService: StaffStatisticsService) {}

  getAllStaffsStatistics = (req: FastifyRequest, res: FastifyReply) => {
    const statistics = this.staffStatisticsService.calculateSummaryStatisticsForAllStaffs();

    res.send(SuccessResponse('All staffs summary statistics', statistics));
  };

  getContractStaffsStatistics = (req: FastifyRequest, res: FastifyReply) => {
    const statistics = this.staffStatisticsService.calculateSummaryStatisticsForContractStaffs();

    res.send(SuccessResponse('Contract staffs summary statistics', statistics));
  };

  getDepartmentsStatistics = (req: FastifyRequest, res: FastifyReply) => {
    const statistics = this.staffStatisticsService.calculateSummaryStatisticsByDepartment();

    res.send(SuccessResponse('Departments summary statistics', statistics));
  };

  getSubDepartmentsStatistics = (req: FastifyRequest, res: FastifyReply) => {
    const statistics = this.staffStatisticsService.calculateSummaryStatisticsBySubDepartment();

    res.send(SuccessResponse('Sub Departments summary statistics', statistics));
  };
}

export default StaffStatisticsController;
