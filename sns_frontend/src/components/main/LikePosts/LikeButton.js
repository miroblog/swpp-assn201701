/**
 * Created by swpp on 06/05/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import ToggleButton from 'react-toggle-button';
import {Check, X, Like, UnLike} from './icons';

class LikeButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            value : this.props.btn_value
        };
        this.onToggle = this.onToggle.bind(this);

    }

    onToggle(e){
        this.setState({
            value: !this.state.value, // doesn't update state.value instantly
        });

        var payload = {
            post_id : this.props.post_id,
            up :  !(this.state.value)
        }
        this.props.dispatch({
            type: "UPDATE_LIKE",
            payload
        });
    }

    //onClick={this.onLike}
    render(){
        var default_color = {
            active: {
                base: `rgb(0,113,170)`,
                hover: `rgb(0,113,170)`,
            },
            inactive: {
                base: `rgb(184, 195, 211)`,
                hover: `rgb(184, 195, 211)`,
            },
            activeThumb: {
                base: `rgb(250,250,250)`,
                hover: `rgb(250,250,250)`,
            },
            inactiveThumb: {
                base: `rgb(250,250,250)`,
                hover: `rgb(250,250,250)`,
            },
        };
        var like_btn_id = "like_"+this.props.post_id;
        var like_ctn_id = "like_cnt_"+this.props.post_id;
        return(

            <div>
                <div className="single_counter p-y-2 m-t-1">
                    <i className="fa fa-heart m-b-1"></i>
                    <h2 className="statistic-counter">like :<text id = {like_ctn_id}>{this.props.like_count}</text> </h2>
                </div>
                <span id={like_btn_id} onClick={this.onToggle}>
                    <ToggleButton
                        inactiveLabel={<UnLike/>}
                        activeLabel={<Like/>}
                        colors = {default_color}
                        value={this.state.value}
                        onToggle={this.onToggle} />
                </span>
            </div>

            /*
             {(value) => {
             this.setState({
             value: !value,
             })
             }}
             */

// Material Design example...
// Different labels example...
        );
    }
}

function mapDispatchToProps(dispatch) {
    return{
        dispatch
    };
}

export default connect(mapDispatchToProps)(LikeButton);


ToggleButton.propTypes = {
    //
    //
    // REQUIRED PROPS
    //
    //

    value: React.PropTypes.bool.isRequired,
    /**
     * Called during onClick
     * 1. triggers 'focus' and 'click' on internal checkbox
     * 2. calls onToggle(this.props.active)
     */
    onToggle: React.PropTypes.func.isRequired,

    //
    //
    // OPTIONAL PROPS
    //
    //
    /**
     * Object with four properties { active, inactive, activeThumb, inactiveThumb }
     *
     * each property should have a 'base' key and a 'hover' key
     * ( if hover is undefined, that property will use the base value )
     *
     */
    colors: React.PropTypes.object,


    /**
     * The label used inside the track, can also take a component
     *
     * activeLabel (defaultValue: 'ON')
     * inactiveLabel (defaultValue: 'OFF')
     */
    activeLabel: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object,
    ]),
    inactiveLabel: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object,
    ]),


    /**
     * These props specify style,
     * hover style is used during mouseOver event
     *
     *
     */
    activeLabelStyle: React.PropTypes.object,
    activeLabelStyleHover: React.PropTypes.object,
    activeThumbStyle: React.PropTypes.object,
    activeThumbStyleHover: React.PropTypes.object,
    inactiveLabelStyle: React.PropTypes.object,
    inactiveLabelStyleHover: React.PropTypes.object,
    thumbStyle: React.PropTypes.object,
    thumbStyleHover: React.PropTypes.object,
    trackStyle: React.PropTypes.object,
    trackStyleHover: React.PropTypes.object,


    /**
     * These props take a function that receives a real number [0, 1] and
     * returns an interpolated style.
     *
     * No Hover -> Hover :  0 -> 1 : No Toggle -> Toggle
     */
    animateThumbStyleHover: React.PropTypes.func,
    animateTrackStyleHover: React.PropTypes.func,
    animateTrackStyleToggle: React.PropTypes.func,
    animateThumbStyleToggle: React.PropTypes.func,


    /**
     * passes through internal spring settings for react-motion
     * { stiffness, damping }
     */
    internalSpringSetting: React.PropTypes.object,
    internalHoverSpringSetting: React.PropTypes.object,


    /**
     * Optional if one wants an icon inside the thumb, take a string or component
     */
    thumbIcon: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object,
    ]),

    /**
     * The range to move the thumb on toggle [starting, ending]
     */
    thumbAnimateRange: React.PropTypes.array,

    /**
     * If you want to put some props on the underlying <input> element
     * you can pass them through this prop.
     *
     * Example:
     *
     *  passThroughInputProps={{
   *   	onChange: () => console.log('Hello!')
   *  }}
     *
     */
    passThroughInputProps: React.PropTypes.object,

}
