const addStaffValidationRules = {
  name: 'required|name',
  salary: 'required|numeric|min:1',
  currency: 'required|string',
  on_contract: 'boolean',
  department: 'required|string',
  sub_department: 'required|string',
};

export { addStaffValidationRules };
