import BaseDataProvider from './BaseDataProvider';
import UrlApi from './UrlApiConstant';

class CheckpointDataProvider extends BaseDataProvider {
	constructor() {
		super();
		this.fieldsTable = {
			_id: 'id',
			knowledgeArea: 'knowledgeArea',
			title: 'title',
			comment: 'comment'
		};
		this.basicUrlApi = UrlApi.Checkpoint;
	}
}

export default CheckpointDataProvider;
