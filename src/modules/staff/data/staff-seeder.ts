import { v4 as uuidv4 } from 'uuid';
import Staff from '../models/staff.model';

const staffSeeder: Staff[] = [
  {
    id: uuidv4(),
    name: 'Abhishek',
    salary: '145000',
    currency: 'USD',
    department: 'Engineering',
    sub_department: 'Platform',
  },
  {
    id: uuidv4(),
    name: 'Anurag',
    salary: '90000',
    currency: 'USD',
    department: 'Banking',
    on_contract: true,
    sub_department: 'Loan',
  },
  {
    id: uuidv4(),
    name: 'Himani',
    salary: '240000',
    currency: 'USD',
    department: 'Engineering',
    sub_department: 'Platform',
  },
  {
    id: uuidv4(),
    name: 'Yatendra',
    salary: '30',
    currency: 'USD',
    department: 'Operations',
    sub_department: 'CustomerOnboarding',
  },
  {
    id: uuidv4(),
    name: 'Ragini',
    salary: '30',
    currency: 'USD',
    department: 'Engineering',
    sub_department: 'Platform',
  },
  {
    id: uuidv4(),
    name: 'Nikhil',
    salary: '110000',
    currency: 'USD',
    on_contract: true,
    department: 'Engineering',
    sub_department: 'Platform',
  },
  {
    id: uuidv4(),
    name: 'Guljit',
    salary: '30',
    currency: 'USD',
    department: 'Administration',
    sub_department: 'Agriculture',
  },
  {
    id: uuidv4(),
    name: 'Himanshu',
    salary: '70000',
    currency: 'EUR',
    department: 'Operations',
    sub_department: 'CustomerOnboarding',
  },
  {
    id: uuidv4(),
    name: 'Anupam',
    salary: '200000000',
    currency: 'INR',
    department: 'Engineering',
    sub_department: 'Platform',
  },
];

export default staffSeeder;
