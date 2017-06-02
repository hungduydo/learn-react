import axios from 'axios';
const GETLIST_ACTION = 'GetList';
const GET_ACTION = 'Get';
const ADD_ACTION = 'Add';
const EDIT_ACTION = 'Edit';
const DELETE_ACTION = 'Delete';
const DELETELIST_ACTION = 'DeleteList';

class BaseDataProvider {
	constructor() {
		this.basicUrlApi = {};
	}

	executePromise(url, params = {}, options = {}) {
		var typeRequestData = 'params';
		var method = options.method ? options.method.toUpperCase() : 'GET';

		if (method !== 'GET') {
			typeRequestData = 'data';
		}

		// Add :id into url query
		if ((method === 'GET' || method === 'PUT'
			|| method === 'DELETE') && options.hasOwnProperty('id')) {
			url += '/' + options.id;
		}

		var objRequest = {
					method: method,
					url: url,
					headers: options.headers || {},
					timeout: options.timeout || 10000,
					responseType: options.responseType || 'json'
				};

		objRequest[typeRequestData] = params;
		return axios(objRequest);
	}

	executeBasicAction(action = GETLIST_ACTION, params = {}, options = {}) {
		var url = '';

		switch(action) {
			case(GETLIST_ACTION): {
				url = options.url || this.basicUrlApi.GetList;
				break;
			}
			case(GET_ACTION): {
				url = options.url || this.basicUrlApi.Get;
				break;
			}
			case(ADD_ACTION): {
				url = options.url || this.basicUrlApi.Add;
				break;
			}
			case(EDIT_ACTION): {
				url = options.url || this.basicUrlApi.Edit;
				break;
			}
			case(DELETE_ACTION): {
				url = options.url || this.basicUrlApi.Delete;
				break;
			}
			case(DELETELIST_ACTION): {
				url = options.url || this.basicUrlApi.DeleteList;
				break;
			}
			default: break;
		}

		return this.executePromise(url, params, options);
	}

	get GETLIST_ACTION() {
		return GETLIST_ACTION;
	}

	get GET_ACTION() {
		return GET_ACTION;
	}

	get EDIT_ACTION() {
		return EDIT_ACTION;
	}

	get DELETE_ACTION() {
		return DELETE_ACTION;
	}

	get DELETELIST_ACTION() {
		return GETLIST_ACTION;
	}

	getList() {
	let self = this;
	return this.executeBasicAction(GETLIST_ACTION)
		.then(function(res) {
			return self.getListDataTable(res.data.hits);
		});
	}

	get(id) {
		let self = this;
		return this.executeBasicAction(GET_ACTION, {},
				{
					id: id
				})
			.then(function(res) {
				if (self.fieldsTable) {
					return self.parseData(self.fieldsTable, res.data);	
				} else {
					return  res.data;
				}
				
			});
	}

	add(Data) {
		return this.executeBasicAction(ADD_ACTION, Data,
				{
					method: "POST",
				});
	}

	update(id, Data) {
		return this.executeBasicAction(EDIT_ACTION, Data,
				{
					method: "PUT",
					id: id
				});
	}

	delete(id) {
		return this.executeBasicAction(DELETE_ACTION, {},
				{
					method: "DELETE",
					id: id
				});
	}

	parseData(keysMap, dataObj, reverse = false) {
		let mapDataObj = {};

		if (dataObj) {
			if (!reverse) {
				Object.keys(keysMap).forEach(function(key) {
					if (dataObj.hasOwnProperty(key)) {
						mapDataObj[keysMap[key]] = dataObj[key];
					}
				});
			} else {
				Object.keys(keysMap).forEach(function(key) {
					let value = keysMap[key];
					if (dataObj.hasOwnProperty(value)) {
						mapDataObj[key] = dataObj[value];
					}
				});
			}
		}

		return mapDataObj;
	}

	getListDataTable(data) {
		let self = this;
		return data.map(function(obj, idx) {
			return self.parseData(self.fieldsTable, obj);
		});
	}

	addListActionTable(keyId, rowsData, callbackRender) {
		return rowsData.map(function(rowObj, idx) {
			if (rowObj.hasOwnProperty(keyId)) {
				rowObj["action"] = callbackRender(rowObj[keyId]);
			}
			return rowObj;
		});
	}
}

export default BaseDataProvider;
