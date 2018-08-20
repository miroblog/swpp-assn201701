import React from 'react';
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link, Switch, Redirect
} from 'react-router-dom';
import ScheduleList from '../calendar/ScheduleList'

import Logout from '../logout/Logout';
import PostText from './postText/PostText';
import ReadPosts from './readPosts/ReadPosts';
import ChatButton from './chatButton/ChatButton';
import SettingsButton from './settingsButton/SettingsButton';
import reactCSS from 'reactcss';

class MainPage extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
      const styles = reactCSS({
        'default': {
          background: {
            //backgroundColor: '#fafafa',
            //backgroundSize: 'cover',
            //width: '100%',
            //height: '100%',
            //padding: '0',
            //margin: '0',
            backgroundImage: `url(http://slowalk.co.kr/wp-content/uploads/2014/12/01_%EC%B1%85%EC%83%81%EC%9C%84%EB%8B%AC%EB%A0%A5.jpg)`,
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
            paddingLeft: '100px'
          },

            /*backgroundCover: {
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
            },*/
        }
      });

        if(this.props.isAuthenticated ==false){
            return <Redirect to="login/"/>
        }
        return (
        <div style={styles.backgroundCover}>
				<div className="container-fluid row" >
				<div className="col-lg-3 col-centered">
					<ScheduleList schedules={this.props.schedules} page="main" location={this.props.location} history={this.props.history}/></div>
				<div className="col-lg-6">

						<PostText wall={false} owner="universe" />

						<ReadPosts posts={this.props.posts} location={this.props.location} history = {this.props.history}/>

				</div>
				<div className="col-lg-3"></div>
			</div>
			</div>
        );
    }
}

function mapStateToProps(state){
    return{
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        posts: state.get_posts.posts,
        hash: state.auth.hash,
        chatstate: state.chat.valid,
	schedules: state.schedule.schedules
    };
}

function mapDispatchToProps(dispatch){
    return{
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
