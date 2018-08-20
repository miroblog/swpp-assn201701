import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Pie} from 'react-chartjs'
import Color from 'color'
import { getRandomPastelColor } from './utl.js'
import reactCSS from 'reactcss';

class ResultPoll extends Component {
    constructor(props){
        super(props);
        this.state = {
            question: this.props.poll.question,
            pollOptions: this.props.poll.options,
            loading: false,
            error: false,
        };
    }

    render () {
      const styles = reactCSS({
  			'default': {
  				panel: {
  					margin: '15px',
            marginTop: '15px',
  				},
  			}
  		});

        const chartData = this.state.pollOptions.map(pollOption => {
            const color = getRandomPastelColor();
            const vote = (pollOption.vote > 0 )? pollOption.vote: 0;
            return {
                value: pollOption.vote,
                label: pollOption.text,
                color: color,
                highlight: Color(color).lighten(0.05).hexString()
            }
        })
        const { question, pollOptions, loading, error } = this.state;
        return (
          <div className='panel panel-default' style={styles.panel}>
            <h3 className='text-center'>Poll Results</h3>
              <div className='panel-body text-center'>
                {error ? <h5 className='text-center' style={{color: 'red'}}>Cannot find poll.</h5> : null}
                <h4>{question}</h4>
                <Pie className='center-block' style={{marginTop: 16, marginBottom: 16}} data={chartData} width='300' height='220' />
                {!loading ? pollOptions.map((option, i) => {
                    const { text, vote } = option
                    return (
                      <div key={i} className='well well-sm'>
                        <h5>Option: {text}</h5>
                        <h5>Votes: {vote}</h5>
                      </div>
                    )
                  }) : null}
                </div>
          </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return{
        dispatch
    };
};

export default connect(mapDispatchToProps)(ResultPoll);
