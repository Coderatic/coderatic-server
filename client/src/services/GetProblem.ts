import Api from "./Api";

 async function getProblem(problem_id:string){
	return await Api().get("/api/judge/get-problem-data", {
		params:{
			problem_id: problem_id
		}
	 });
}
export default getProblem;