export interface ICreateCustomer {
  name: string;
  email: string;
  birthdate: string;
  cellphone: string;
  active: 1 | 0;
}

export interface IReadCustomer {
  form: string;
  parameter: string;
}

export interface IUpdateCustomer {
  name: string;
  email: string;
  birthdate: string;
  cellphone: string;
  active: 1 | 0;
  form: string;
  parameter: string;
}
