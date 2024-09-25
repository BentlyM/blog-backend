import { body } from 'express-validator';

export const credentialValidators = () => {
  const rules = [
    body('username')
      .notEmpty()
      .withMessage('Username field must be filled')
      .bail()
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage('Special characters and spaces are not allowed'),
  ];

  return rules;
};
