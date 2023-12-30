import { check, body, query } from "express-validator";

const submissionValidator = [
	body("problem_id").not().isEmpty().withMessage("Problem ID is required"),
	body("source_code").not().isEmpty().withMessage("Code is required"),
	body("lang").not().isEmpty().withMessage("Language is required"),
	body("lang.name")
		.not()
		.isEmpty()
		.withMessage("Language name not specified"),
	check("lang.name")
		.isIn([
			"C",
			"C++ 11",
			"C++ 14",
			"C++ 17",
			"C++ 20",
			"Java 8",
			"Java 11",
			"Python 2",
			"Python 3",
			"JavaScript",
			"TypeScript",
			"Kotlin",
			"Golang",
			"Rust",
			"C#",
			"Scala",
			"Haskell",
			"Zig",
			"PHP",
		])
		.withMessage("Invalid language"),
];

const mySubmissionsValidator = [
	query("problem_id").not().isEmpty().withMessage("Problem ID is required"),
	query("startingRow")
		.not()
		.isEmpty()
		.withMessage("Starting row is required")
		.isNumeric()
		.withMessage("Starting row must be a number")
		.isInt({ min: 0 })
		.withMessage("Starting row must be greater than 0"),
	query("count")
		.not()
		.isEmpty()
		.withMessage("Count is required")
		.isNumeric()
		.withMessage("Count must be a number")
		.isInt({ min: 1 })
		.withMessage("Count must be greater than 0"),
];

export { submissionValidator, mySubmissionsValidator };
