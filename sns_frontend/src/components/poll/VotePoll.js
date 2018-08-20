import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions'
import reactCSS from 'reactcss'

class VotePoll extends Component {
    constructor(props){
        super(props);
        var poll = this.props.poll;
        this.state = {
            question: poll.question,
            pollOptions: poll.options,
            loading: false,
            error: false,
            checkedOptionID: ''
        };
        this.createVote = this.createVote.bind(this);
        this.checkedOption = this.checkedOption.bind(this);
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

        const { question, pollOptions, loading, error } = this.state
        return (
            <div className='panel panel-default' style={styles.panel}>
                            <h3 className='text-center'>VOTE!</h3>
                            <div className='panel-body'>
                                <h5 style={{fontSize: 18}} className='text-center'>TOPIC: </h5>
                                <h3 className='text-center' style={{marginTop: 0}}>{question}</h3>
                                {error ? <h5 className='text-center' style={{color: 'red'}}>Cannot find poll</h5> : null}
                                <form onSubmit={this.createVote.bind(this)}>
                                    {!loading ? pollOptions.map((pollOption, i) => {
                                        const { id, text } = pollOption
                                        return (
                                            <div key={i} className='radio text-center' style={{margin: 12}}>
                                                <label style={{fontSize: 18}}>
                                                    <input
                                                        type='radio'
                                                        onClick={(event) => this.checkedOption(event) }
                                                        id ={this.props.post_id +"_"+"option_"+i}
                                                        name='option'
                                                        value={id}
                                                        style={{marginTop: 10}}
                                                    /> {text}
                                                </label>
                                            </div>
                                        )
                                    }) : null}
                                    <div className='row'>
                                        <div className='col-sm-4 col-sm-offset-4'>
                                            {!error ? <button id={this.props.post_id+"_"+"vote"} className='btn btn-block btn-primary center-block' type='submit'>Vote</button> : null}
                                        </div>
                                    </div>
                                </form>
                            </div>

            </div>
        )
    }

    createVote (event) {
        event.preventDefault()
        if (!this.state.checkedOptionID) {
            return alert('Please select an option.')
        }
        var poll_id = this.props.poll_id;
        var option_id = this.state.checkedOptionID;
        var owner = null;
        var currentPath = this.props.location.pathname;
        if(currentPath.indexOf("wall/") != -1){ // only pass owner when at wall page
            // wall owner
            owner = currentPath.split("/").pop();
        }
        const payload = {poll_id, option_id, owner};
        this.props.dispatch(actions.updateVote(payload));
    }

    checkedOption (event) {
        this.setState({checkedOptionID: event.target.value})
    }
}


function mapDispatchToProps(dispatch) {
    return{
        dispatch
    };
};

export default connect(mapDispatchToProps)(VotePoll);
