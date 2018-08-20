import React, { Component } from 'react';

import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import Greetings from './components/Greetings';
import MainPage from './components/main/MainPage';
import UsersPage from './components/users/UsersPage';
import ChatPage from './components/chat/ChatPage';
import SettingsPage from './components/settings/SettingsPage';
import GroupChatPage from './components/groupchat/GroupChatPage';
import CalendarPage from './components/calendar/CalendarPage';
import NavigationBar from './components/naviBar/NavigationBar'
import WallPage from './components/Wall/WallPage'

import {
    BrowserRouter as Router,
    Route,
    Link, Switch
} from 'react-router-dom';


class App extends Component {

    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <div>
                            <Route path="/" component={NavigationBar}/>
                            <Route exact path="/" component={Greetings}/>
                            <Route path="/wall/" component={WallPage}/>
                            <Route path="/main_page" style={{"backgroundColor": "#f0e3ce"}} component={MainPage}/>
                            <Route path="/signup" component={SignupPage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/users" component={UsersPage} />
                            <Route path="/chat" component={ChatPage} />
                            <Route path="/settings" component={SettingsPage} />
                            <Route path="/groupchat" component={GroupChatPage} />
                            <Route path="/calendar" component={CalendarPage} />
                        </div>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
