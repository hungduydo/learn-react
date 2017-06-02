import BaseDataProvider from './BaseDataProvider';
import UrlApi from './UrlApiConstant';

class InterviewSessionDataProvider extends BaseDataProvider {
	constructor() {
		super();
		this.basicUrlApi = UrlApi.InterviewSession;
	}
}


export default InterviewSessionDataProvider;
