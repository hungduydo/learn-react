const HOST_API = "http://192.168.197.179:8888";
// const HOST_API = "http://localhost:3000";
const URL_API = {
		Candidate: {
			Get: "",
			GetList: "",
			Add: "",
			Edit: "",
			Delete: "",
			DeleteList: ""
		},
		Checklist: {
			Get: HOST_API + "/api/Checklist-templates",
			GetList: "",
			Add: "",
			Edit: "",
			Delete: "",
			DeleteList: ""
		},
		Checkpoint: {
			Get: HOST_API + "/api/checkpoints",
			GetList: HOST_API + "/api/checkpoints",
			Add: HOST_API + "/api/checkpoints",
			Edit: HOST_API + "/api/checkpoints",
			Delete: HOST_API + "/api/checkpoints",
			DeleteList: HOST_API + "/api/checkpoints",
		},
		Exercise: {
			Get: "",
			GetList: "",
			Add: "",
			Edit: "",
			Delete: "",
			DeleteList: ""
		},
		InterviewSession: {
			Get: "",
			GetList: "",
			Add: "",
			Edit: "",
			Delete: "",
			DeleteList: ""
		},
		KnowledgeArea: {
			Get: HOST_API + "/api/knowledge-areas",
			GetList: HOST_API + "/api/knowledge-areas",
			Add: HOST_API + "/api/knowledge-areas",
			Edit: HOST_API + "/api/knowledge-areas",
			Delete: HOST_API + "/api/knowledge-areas",
			DeleteList: HOST_API + "/api/knowledge-areas",
		},
		Question: {
			Get: "",
			GetList: "",
			Add: "",
			Edit: "",
			Delete: "",
			DeleteList: ""
		},
		RecruitPosition: {
			Get: "",
			GetList: "",
			Add: "",
			Edit: "",
			Delete: "",
			DeleteList: ""
		},
		User: {
			Get: HOST_API + "/api/users",
			GetList: HOST_API + "/api/users",
			Add: HOST_API + "/api/users",
			Edit: HOST_API + "/api/users",
			Delete: HOST_API + "/api/users",
			DeleteList: HOST_API + "/api/users",
			GetRoleList: HOST_API + "/api/roles",
		}
	}

	export default URL_API;
