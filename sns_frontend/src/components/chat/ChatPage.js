import React from 'react';
import {connect} from 'react-redux';
import {
	BrowserRouter as Router,
	Route,
	Link, Switch, Redirect
} from 'react-router-dom';
import reactCSS from 'reactcss'

import ChatForm from './ChatForm';

class ChatPage extends React.Component {
  render() {
		const styles = reactCSS({
			'default': {
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
				backgroundCover: {
					//backgroundColor: 'rgba( 255, 255, 255, 0.3)',
					backgroundColor: '#fff',
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
          width: '80%',
					backgroundColor: '#fff',
					padding: '0',
				},
			}
		});

    return (
      <div style={styles.backgroundCover}>
				<div className="container" style={styles.container}>
					<div className="media well" style={styles.media_well}>
        <ChatForm messages={this.props.messages} valid={this.props.valid}/>
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
    messages: state.chat.messages,
	valid: state.chat.valid,
	};
}
function mapDispatchToProps(dispatch){
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
