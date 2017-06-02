import BaseDataProvider from './BaseDataProvider';
import UrlApi from './UrlApiConstant';

class UserDataProvider extends BaseDataProvider {
	constructor() {
		super();
		this.fieldsTable = {
			_id: 'id',
			name: 'name',
			email: 'email',
			level: 'title',
			username: 'username',
			gcsId: 'gcsid',
			role: 'role',
			password: 'password'
		};
		this.basicUrlApi = UrlApi.User;
	}

	getRoleList() {
		return this.executePromise(this.basicUrlApi.GetRoleList);
	}

}

export default UserDataProvider;
