import BaseDataProvider from './BaseDataProvider';
import UrlApi from './UrlApiConstant';

class ChecklistDataProvider extends BaseDataProvider {
	constructor() {
		super();
		this.basicUrlApi = UrlApi.Checklist;
	}

	// get(id) {
	// 	return this.executeBasicAction(this.GET_ACTION, {},
	// 			{
	// 				id: id
	// 			});
	// }
}

export default ChecklistDataProvider;
