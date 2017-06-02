import BaseDataProvider from './BaseDataProvider';
import UrlApi from './UrlApiConstant';

class RecruitPositionDataProvider extends BaseDataProvider {
	constructor() {
		super();
		this.basicUrlApi = UrlApi.RecruitPosition;
	}
}

export default RecruitPositionDataProvider;
