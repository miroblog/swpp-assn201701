import React from 'react'
import _ from 'lodash'
import { FacebookCounter, FacebookSelector} from '../'
import {connect} from 'react-redux';

export class LikePost extends React.Component {
    state = {
        counters: this.props.like_list,
        user: this.props.uname,
        showSelector: false,
    }

    handleAdd = () => {
        let showSelector = !(this.state.showSelector);
        this.setState({ showSelector: showSelector });
    }


    handleSelect = (emoji) => {
        const index = _.findIndex(this.state.counters, { by: this.state.user })
        if (index > -1) {
            if(emoji ==  this.state.counters[index].emoji) {
                this.setState({
                    counters: [
                        ...this.state.counters.slice(0, index),
                        ...this.state.counters.slice(index + 1),
                    ],
                    showSelector: false,
                })
            }else{
                this.setState({
                    counters: [
                        ...this.state.counters.slice(0, index),
                        { emoji, by: this.state.user },
                        ...this.state.counters.slice(index + 1),
                    ],
                    showSelector: false,
                })
            }
        } else {
            this.setState({
                counters: [...this.state.counters, { emoji, by: this.state.user }],
                showSelector: false,
            })
        }
        var payload = {
            post_id : this.props.post_id,
            emoji : emoji,
            by : this.state.user
        }
        this.props.dispatch({
            type: "UPDATE_LIKE",
            payload
        });
    };

    render() {
        return (
            <div style={{ position: 'relative' }}>
                <FacebookCounter
                    like_btn_id={"like_post_btn_"+this.props.post_id}
                    counters={ this.state.counters }
                    user={ this.state.user }
                    onClick={ this.handleAdd }
                    bg="#ededff"
                    important={ [] }
                />

                { this.state.showSelector ? (
                    <div style={{ position: 'absolute', bottom: '100%', marginBottom: '10px' }}>
                        <FacebookSelector like_id={"like_post_"+this.props.post_id} onSelect={ this.handleSelect } />
                    </div>
                ) : null }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return{
        dispatch
    };
}

export default connect(null, mapDispatchToProps)(LikePost);
