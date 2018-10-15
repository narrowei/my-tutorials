import * as types from './types'

const mutations = {
	[types.LOGIN]: (state, data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        state.id = data.id;
		state.token = data.token
	},
	[types.LOGOUT]: (state) => {
		localStorage.removeItem('token');
		state.token = null;
        localStorage.removeItem('username');
        state.username = null;
        localStorage.removeItem('id');
        state.id = null;
	},
	[types.USERNAME]: (state, data) => {
        localStorage.setItem('username', data);
		state.username = data
	}
}
export default mutations
