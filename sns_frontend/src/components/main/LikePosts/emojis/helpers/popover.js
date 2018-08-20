/**
 * Created by swpp on 12/05/17.
 */
import Popover from 'react-simple-popover';
import React, { Component } from 'react';

class PopOver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleClick(e) {
        this.setState({open: !this.state.open});
    }

    handleClose(e) {
        this.setState({open: false});
    }

    render() {
        return (
            <div>
                <a
                    href="#"
                    className="button"
                    ref="target"
                    onClick={this.handleClick.bind(this)}>Popover</a>
                <Popover
                    placement='left'
                    container={this}
                    target={this.refs.target}
                    show={this.state.open}
                    onHide={this.handleClose.bind(this)} >
                    <p>This is popover</p>
                </Popover>
            </div>
        );
    }
}

export default PopOver;
