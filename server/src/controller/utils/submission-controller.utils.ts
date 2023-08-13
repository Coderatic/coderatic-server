const langExtension = (lang) => {
	const ext_map = {
		c: "c",
		cpp: "cpp",
		csharp: "cs",
		dart: "dart",
		golang: "go",
		haskell: "hs",
		java: "java",
		javascript: "js",
		julia: "jl",
		kotlin: "kt",
		lisp: "el",
		lua: "lua",
		octave: "m",
		perl: "pl",
		php: "php",
		py3: "py",
		python: "py",
		R: "r",
		ruby: "rb",
		rust: "rs",
		scala: "scala",
		typescript: "ts",
	};
	return ext_map[lang];
};

const isCompiled = (lang) => {
	return ["c", "csharp", "cpp", "golang", "java", "kotlin", "rust"].includes(
		lang
	);
};

export { langExtension, isCompiled };
