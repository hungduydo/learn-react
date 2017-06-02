import BaseDataProvider from './BaseDataProvider';
import UrlApi from './UrlApiConstant';

class QuestionDataProvider extends BaseDataProvider {
	constructor() {
		super();
		this.basicUrlApi = UrlApi.Question;
	}
}

export default QuestionDataProvider;
