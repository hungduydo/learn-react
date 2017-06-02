import BaseDataProvider from './BaseDataProvider';
import UrlApi from './UrlApiConstant';

class ExerciseDataProvider extends BaseDataProvider {
	constructor() {
		super();
		this.basicUrlApi = UrlApi.Exercise;
	}
}


export default ExerciseDataProvider;
