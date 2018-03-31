import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ExpansionPanel, {
	ExpansionPanelSummary,
	ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import * as actions from '../actions/activityActions';

class Activities extends Component {
	handleClick = () => {
		this.props.addActivity({
			title: 'My Project',
			url: 'www.notreal.com',
			activity: 'Basic Project',
		});
		this.props.fetchActivities('aaronmassey45');
	};

	handleDelete = id => {
		this.props.deleteActivity(id);
		this.props.fetchActivities('aaronmassey45');
	};

	handleUpdate = id => {
		const urls = [
			'www.yamama.com',
			'https://whosthere.com',
			'http://speedstudy.herokuapp.com',
		];
		const titles = ['The Greatest Project', 'Meh', 'I Did This'];
		const projectType = [
			'Basic Project',
			'Physical Activity',
			'Tutorial Course',
		];

		const getRandomNum = max => Math.floor(Math.random() * Math.floor(max));

		this.props.modifyActivity(id, {
			url: urls[getRandomNum(2)],
			title: titles[getRandomNum(2)],
			activity: projectType[getRandomNum(2)],
		});
		this.props.fetchActivities('aaronmassey45');
	};

	componentDidMount() {
		this.props.fetchActivities('aaronmassey45');
	}

	renderActivities = () => {
		return this.props.activities.map((action, i) => {
			const { title, points, dateCompleted, activity, url, _id } = action;
			return (
				<ExpansionPanel key={i}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography style={{ width: '100%' }}>
							<b style={{ float: 'left' }}>{title}</b>
							<b style={{ float: 'right' }}>{points} points</b>
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails style={{ display: 'block' }}>
						<p>
							Completed {activity} on{' '}
							{new Date(dateCompleted).toLocaleDateString()}
						</p>
						<p>{url}</p>
						<button onClick={() => this.handleDelete(_id)}>
							Delete Activity
						</button>
						<button onClick={() => this.handleUpdate(_id)}>
							Update Activity
						</button>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			);
		});
	};

	render() {
		const { user: { totalPoints, userName }, activities } = this.props;
		return totalPoints ? (
			<React.Fragment>
				<p>Your total points are {totalPoints}</p>
				<button onClick={this.handleClick}>Add Activity</button>
				<hr />
				{activities ? (
					<React.Fragment>
						<h2>Activities</h2>
						{this.renderActivities()}
					</React.Fragment>
				) : null}
			</React.Fragment>
		) : userName ? (
			<button onClick={this.handleClick}>Add Activity</button>
		) : (
			<p>You are not logged in</p>
		);
	}
}

const mapStateToProps = state => ({
	user: state.authReducer,
	activities: state.activities,
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ ...actions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
