import React from 'react'
import _ from 'lodash'
import reactCSS from 'reactcss'
import { FacebookCounter, FacebookSelector} from '../'
import {connect} from 'react-redux';
import {updateLikeComment} from '../../../../../actions'
import { bindActionCreators } from 'redux'

export class LikeComment extends React.Component {

    state = {
        counters: this.props.like_list,
        user: this.props.uname,
        showSelector: false,
    };

    handleAdd = () => {
        let showSelector = !(this.state.showSelector);
        this.setState({ showSelector: showSelector });
    };

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
            comment_id : this.props.comment_id,
            emoji : emoji,
            by : this.state.user
        };

        console.log(payload);
        this.props.dispatch({
            type: "UPDATE_LIKE_COMMENT",
            payload
        });
    };

    render() {
        return (
            <div>
                <FacebookCounter
                    like_btn_id={"like_comment_btn_"+this.props.comment_id}
                    counters={ this.state.counters }
                    user={ this.state.user }
                    onClick={ this.handleAdd }
                    bg="#ededff"
                    important={ [] }
                />

                { this.state.showSelector ? (
                    <div style={{ position: 'relative', bottom: '100%', marginBottom: '10px' }}>
                        <FacebookSelector like_id={"like_comment_"+this.props.comment_id} onSelect={ this.handleSelect.bind(this) } />
                    </div>
                ) : null }
            </div>
        )
    }
}

export default LikeComment;
