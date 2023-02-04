import { FastifyPluginAsync } from 'fastify';
import { container } from 'tsyringe';
import StaffStatisticsController from '../controllers/staff-statistics.controller';
import authMiddleware from '@shared/middlewares/auth.middleware';

const staffStatisticsController = container.resolve(StaffStatisticsController);

const staffStatisticsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: 'GET',
    url: '/staffs/statistics',
    onRequest: authMiddleware,
    handler: staffStatisticsController.getAllStaffsStatistics,
  });

  fastify.route({
    method: 'GET',
    url: '/staffs/contract/statistics',
    onRequest: authMiddleware,
    handler: staffStatisticsController.getContractStaffsStatistics,
  });

  fastify.route({
    method: 'GET',
    url: '/staffs/department/statistics',
    onRequest: authMiddleware,
    handler: staffStatisticsController.getDepartmentsStatistics,
  });

  fastify.route({
    method: 'GET',
    url: '/staffs/sub-department/statistics',
    onRequest: authMiddleware,
    handler: staffStatisticsController.getSubDepartmentsStatistics,
  });
};

export default staffStatisticsRoute;
