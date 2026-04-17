// src/utils/validation.js

/**
 * Validasi format email menggunakan RegEx
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

/**
 * Validasi nomor HP: hanya angka dan minimal 10 digit
 * @param {string} phone
 * @returns {boolean}
 */
export const validatePhone = (phone) => {
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 10;
};

/**
 * Validasi apakah dua password cocok
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {boolean}
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * Validasi form Login
 * @param {string} email
 * @param {string} password
 * @returns {{ isValid: boolean, errors: object }}
 */
export const validateLoginForm = (email, password) => {
  const errors = {};

  if (!email.trim()) {
    errors.email = 'Email wajib diisi';
  } else if (!validateEmail(email)) {
    errors.email = 'Format email tidak valid';
  }

  if (!password) {
    errors.password = 'Password wajib diisi';
  } else if (password.length < 6) {
    errors.password = 'Password minimal 6 karakter';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

/**
 * Validasi form Register
 * @param {{ name, email, phone, password, confirmPassword }} form
 * @returns {{ isValid: boolean, errors: object }}
 */
export const validateRegisterForm = ({ name, email, phone, password, confirmPassword }) => {
  const errors = {};

  if (!name.trim()) {
    errors.name = 'Nama wajib diisi';
  } else if (name.trim().length < 2) {
    errors.name = 'Nama minimal 2 karakter';
  }

  if (!email.trim()) {
    errors.email = 'Email wajib diisi';
  } else if (!validateEmail(email)) {
    errors.email = 'Format email tidak valid';
  }

  if (!phone) {
    errors.phone = 'Nomor HP wajib diisi';
  } else if (!/^\d+$/.test(phone)) {
    errors.phone = 'Nomor HP hanya boleh angka';
  } else if (!validatePhone(phone)) {
    errors.phone = 'Nomor HP minimal 10 digit';
  }

  if (!password) {
    errors.password = 'Password wajib diisi';
  } else if (password.length < 6) {
    errors.password = 'Password minimal 6 karakter';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Konfirmasi password wajib diisi';
  } else if (!validatePasswordMatch(password, confirmPassword)) {
    errors.confirmPassword = 'Password tidak cocok!';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};
