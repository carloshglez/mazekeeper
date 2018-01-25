import { render } from 'react-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import App from './App';
import * as actions from './appStateStore/actions'

function mapState(state, props) {
	return {
		state: state
	};
}

function mapDispatch(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(mapState, mapDispatch)(App);
