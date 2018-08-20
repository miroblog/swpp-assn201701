import React from 'react';
import {connect} from 'react-redux';
import {
	BrowserRouter as Router,
	Route,
	Link, Switch, Redirect
} from 'react-router-dom';

import UsersForm from './UsersForm';
import GroupsForm from './GroupsForm';
import reactCSS from 'reactcss';

class UsersPage extends React.Component {
	constructor(){
		super();
		this.state = { show: true} ;
	}
	onClickGroup(e){
		e.preventDefault();
		this.setState({show: false})
        this.props.dispatch({
            type: "GET_GROUPS"
        });
	}
	onClickUser(e){
		e.preventDefault();
		this.setState({show: true})
	}
  render() {
		const styles = reactCSS({
			'default': {
				/*
				background: {
					//backgroundColor: '#fafafa',
					//backgroundSize: 'cover',
					//width: '100%',
					//height: '100%',
					//padding: '0',
					//margin: '0',
					backgroundImage: `url(http://www.spyderonlines.com/images/two_cups_mood_smiley_face_73663.jpg)`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundAttachment: 'fixed',
					position: 'fixed',
					overflowY: 'auto',
					width: '100%',
					height: '100%',
					padding: '0',
					margin: '0',
					left: '0',
				},
				*/
                background: {
                    backgroundImage: `url(https://cdn.elegantthemes.com/blog/wp-content/uploads/2013/09/bg-10-full.jpg)`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    position: 'fixed',
                    overflowY: 'auto',
                    width: '100%',
                    height: '100%',
                    padding: '0',
                    margin: '0',
                    left: '0',
                },
				/*backgroundCover: {
					backgroundColor: 'rgba( 255, 255, 255, 0.1)',
					backgroundSize: 'cover',
					backgroundAttachment: 'fixed',
					position: 'fixed',
					overflowY: 'auto',
					width: '100%',
					height: '100%',
					padding: '0',
					margin: '0',
					left: '0',
				},*/
				backgroundCover: {
					//backgroundColor: 'rgba( 255, 255, 255, 0.3)',
					backgroundColor: '#eee',
					//backgroundColor: '#476a30',
					backgroundSize: 'cover',
					backgroundAttachment: 'fixed',
					position: 'fixed',
					overflowY: 'auto',
					width: '100%',
					height: '100%',
					padding: '0',
					margin: '0',
					left: '0',
				},

				container: {
					margin: 'auto',
				},
				media_well: {
          margin: 'auto',
					marginTop: '50px',
          width: '60%',
					paddingTop: '30px',
					paddingLeft: '30px',
					paddingRight: '30px',
					paddingBottom: '20px',
					backgroundColor: '#fff'
				},
				row: {
					display: 'flex',
				},
				personal: {
					flex: '1',
					textAlign: 'center',
				},
				group: {
					flex: '1',
					textAlign: 'center',
				},
			}
		});

    return (
			<div style={styles.background}>
				<div style={styles.backgroundCover}>
					<div className="container" style={styles.container}>
						<div className="media well" style={styles.media_well}>


						<div className={this.state.show?'hide':'show'}>
						    <GroupsForm groups={this.props.groups}/> </div>
						<div className={this.state.show?'show':'hide'}>
							<UsersForm users={this.props.users}/> </div>
						<div className="row" style={styles.row}>

							<div className="col-sm-4" style={styles.personal}>
							<button id='userchat'
								className={this.state.show?"btn btn-success btn-lg":"btn btn-secondary btn-lg"}
								onClick={this.onClickUser.bind(this)} >
								Personal Chat </button> </div>
							<div className="col-sm-4" style={styles.group}>
							<button id='groupchat'
								className={this.state.show?"btn btn-secondary btn-lg":"btn btn-success btn-lg"}
								onClick={this.onClickGroup.bind(this)} >
								GroupChat </button> </div>

						</div>

				</div>
			</div>
		</div>
			</div>
    );
  }
}

function mapStateToProps(state){
	return{
		isAuthenticated: state.auth.isAuthenticated,
		hash: state.auth.hash,
    users: state.get_users.users,
		groups: state.get_groups.groups,
	};
}
function mapDispatchToProps(dispatch){
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
