import Api from "./Api"

async function  submitCode(problem_id:string,user_id:string,source_code:string,lang:object){
	return await Api().post("/api/judge/submit-code", {
		problem_id: problem_id,
		user_id: user_id,
		source_code: source_code,
		lang: lang
	});
};

export default submitCode;