import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDom from 'react-dom';


class CreatePoll extends Component {
    constructor(props){

        super(props);
        this.state = {optionsCount:2};
        this.createPoll = this.createPoll.bind(this);
        this.createOptions = this.createOptions.bind(this);
        this.removeOption = this.removeOption.bind(this);
        this.addOption = this.addOption.bind(this);

    }

    render(){
        const options = this.createOptions()
        return (
            <div>
              <div className="panel panel-default">
                <div className="panel-body">
                  <h2 className='text-center'>Create Poll</h2>
                    <form onSubmit={this.createPoll}>
                      <div className='form-group'>
                        <label>Topic:</label>
                        <input id="poll_topic" placeholder='Enter a topic...' className='form-control' ref='question' /> <br />
                      </div>
                      {options}
                      <div className='row'>
                        <div className='col-sm-4 col-sm-offset-4'>
                          <button id="poll_create" className='btn btn-block btn-primary center-block' type='submit'>Create</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
            </div>
        )
    }

    createOptions () {
        const { optionsCount } = this.state;
        let options = [];

        for (var i = 0; i < optionsCount; i++) {
            const index = i + 1;
            let addOption;
            let removeOption;

            if (i === optionsCount - 1) {
                addOption = this.addOption;
            }
            if (i === optionsCount - 2) {
                removeOption = this.removeOption;
            }

            const optionElement = (
                <div key={index} className='form-group'>
                    <label>Options {index}</label>
                    <input
                        id ={"poll_option_"+index}
                        className='form-control'
                        placeholder={`Enter option ${index}...`}
                        ref={`option${index}`}
                        onFocus={addOption}
                        onBlur={removeOption}
                    />
                </div>
            );
            options.push(optionElement)
        }
        return options
    };

    addOption () {
        const { optionsCount } = this.state;
        this.setState({optionsCount: optionsCount + 1})
    };

    removeOption () {
        const { optionsCount } = this.state;
        const lastOption = this.refs[`option${optionsCount - 1}`];
        if (!lastOption.value && optionsCount > 2) {
            this.setState({optionsCount: optionsCount - 1})
        }
    };

    createPoll (e) {
        e.preventDefault();
        const { question } = this.refs;

        let data = {
            question: question.value.trim(),
            options: []
        };

        for (let option in this.refs) {
            if(option != null){
                let optionValue = this.refs[option].value.trim();
                if (option !== 'question' && optionValue) {
                    data.options.push(optionValue)
                }
            }
        }

        const checkValidPoll = this.validatePoll(data);
        if (checkValidPoll) {
            return alert(checkValidPoll)
        }
        this.props.onPostPoll(data);
    };

    validatePoll (pollData) {
        if (pollData.question.length <= 8) {
            return 'Your topic must be longer than 8 characters.'
        }
        if (pollData.options.length < 2) {
            return 'You topic enter at least 2 options.'
        }
        if (pollData.options.length > 16) {
            return 'You cannot enter more than 16 options.'
        }
    }
}


function mapDispatchToProps(dispatch) {
    return{
        dispatch
    };
};

export default connect(mapDispatchToProps)(CreatePoll);
