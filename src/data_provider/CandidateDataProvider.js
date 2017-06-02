import BaseDataProvider from './BaseDataProvider';
import UrlApi from './UrlApiConstant';

class CandidateDataProvider extends BaseDataProvider {
	constructor() {
		super();
		this.basicUrlApi = UrlApi.Candidate;
	}
}

export default CandidateDataProvider;
