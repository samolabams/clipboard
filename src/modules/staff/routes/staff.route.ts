import { FastifyPluginAsync } from 'fastify';
import { container } from 'tsyringe';
import StaffController from '../controllers/staff.controller';
import { addStaffValidationRules } from '../validations/add-staff.validation';
import authMiddleware from '@shared/middlewares/auth.middleware';
import removeContentTypeHeader from '@shared/middlewares/remove-content-type-header.middleware';
import validate from '@shared/middlewares/validator.middleware';

const staffController = container.resolve(StaffController);

const staffRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: 'POST',
    url: '/staffs',
    onRequest: authMiddleware,
    preValidation: [validate(addStaffValidationRules)],
    handler: staffController.addNewStaff,
  });

  fastify.route({
    method: 'DELETE',
    url: '/staffs/:id',
    onRequest: [removeContentTypeHeader, authMiddleware],
    handler: staffController.deleteStaff,
  });
};

export default staffRoute;
