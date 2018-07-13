import validation from '@/config/validationRegular';

let cachePassword = null;

// 檢查帳號
export const validateAcc = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please Enter Email'));
  } else if (!validation.email.test(value)) {
    callback(new Error('Invalid Email'));
  } else {
    callback();
  }
};

// 檢查密碼
export const validatePass = (rule, value, callback) => {
  cachePassword = value; // for 再次確認密碼 所以先把第一次輸入密碼存起來
  if (value === '') {
    callback(new Error('Please Enter Passwrod'));
  } else {
    callback();
  }
};

// 再次確認密碼
export const validateCheckpass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please Enter Passwrod Again'));
  } else if (value !== cachePassword) {
    callback(new Error('Passwrod Not Match'));
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
  } else if (!validation.twCellPhone.test(value)) {
    callback(new Error('Wrong Phone Number'));
  } else {
    callback();
  }
};
