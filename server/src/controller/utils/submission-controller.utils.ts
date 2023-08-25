const langExtension = (lang) => {
	const ext_map = {
		C: "c",
		"C++ 11": "cpp",
		"C++ 17": "cpp",
		"C++ 20": "cpp",
		"C#": "cs",
		dart: "dart",
		Golang: "go",
		Haskell: "hs",
		"Java": "java",
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
		Rust: "rs",
		scala: "scala",
		typescript: "ts",
	};
	return ext_map[lang];
};

const isCompiled = (lang) => {
	return [
		"C",
		"C++ 11",
		"C++ 14",
		"C++ 17",
		"C++ 20",
		"Java 8",
		"Java 11",
		"Golang",
		"Kotlin",
		"Rust",
	].includes(lang);
};

export { langExtension, isCompiled };
