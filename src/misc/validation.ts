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

export const blogSanitization = () => {
	const rules = [
		body('title')
			.notEmpty()
			.withMessage('Blog title must be provided')
			.bail()
			.escape()
			.isLength({ min: 3, max: 50 })
			.withMessage('Blog title must be between 3 and 50 characters long'),
		body('content')
			.notEmpty()
			.withMessage('Blog body must be provided')
			.bail()
			.escape()
			.isLength({ min: 15 })
			.withMessage('Blog body must be at least 15 characters long'),
	];

	return rules;
};


export const commentSanitization = () => {
	const rules = [
		body('content')
			.notEmpty()
			.withMessage('Comment body must be provided')
			.bail()
			.escape()
			.isLength({ min: 3, max: 150 })
			.withMessage('Comment body must be between 3 and 150 characters long'),
	];

	return rules;
};