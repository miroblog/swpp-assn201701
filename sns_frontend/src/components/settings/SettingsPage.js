import React from 'react';
import SettingsForm from './SettingsForm';
import reactCSS from 'reactcss';
class SettingsPage extends React.Component {
  render() {
      const styles = reactCSS({
          'default': {
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
          }
      });
    //console.log('here is SettingsPage');
    return (
      <div style={styles.backgroundCover} className="row">
          <SettingsForm />
      </div>
    );
  }
}

export default SettingsPage;
