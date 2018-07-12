import validation from '@/config/validation';

export const validateAcc = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please Enter Email'));
  } else if (!validation.email.test(value)) {
    callback(new Error('Invalid Email'));
  } else {
    callback();
  }
};

export const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please Enter Passwrod'));
  } else {
    callback();
  }
};

export const validateDisplayName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please Enter Your Display Name'));
  } else {
    callback();
  }
};
export const validatePhoneNumber = (rule, value, callback) => {
  if (!value) {
    callback(new Error('Please Enter Your Phone Number'));
  } else if (!Number.isInteger(+value)) {
    callback(new Error('Wrong Phone Number'));
  } else {
    callback();
  }
};
