import React from 'react'
import reactCSS from 'reactcss'
import _ from 'lodash'
import { listOfNames } from '../../helpers/strings'
import {PopOver} from '../../helpers/popover'
import FacebookCounterReaction from './FacebookCounterReaction'

export const FacebookCounter = ({like_btn_id, counters, user, important, onClick, bg }) => {
  const styles = reactCSS({
    'default': {
      counter: {
        display: 'flex',
        cursor: 'pointer',
        color: '#365899',
        fontFamily: `"San Francisco", -apple-system, BlinkMacSystemFont,
          ".SFNSText-Regular", sans-serif`,
        fontSize: '14px',
        fontWeight: '500',
          marginBottom: '10px',
          float:'left',
      },
      name: {
        paddingLeft: '20px',
        marginTop: '8px',
        fontSize: '16px',
      },
        iconbtn:{
            width: "35px",
            height: "35px",
            border: "2px solid #88b04b",
            lineHeight: "35px", /* adjust line height to align vertically*/
            padding:"0",
            borderRadius: "50%",
            float:"left",
            backgroundColor: "#88b04b"
        },
        btnglyphicon: {
          fontSize: '20px',
          padding:'8px',
          background:'#ffffff',
          marginRight:'4px',
        },
        box:{
            float: 'auto',
            width: '50%',
            padding: '10px',
        },
        dottedLine:{
          marginTop:'0px',
          borderTop: '2px dotted black',
        }
    },
  });

  const groups = _.groupBy(counters, 'emoji')
  const names = _.map(counters, 'by')

  const nameString = []
  if (_.includes(names, user)) {
    nameString.push('You')
  }
  if (important.length) {
    if (_.includes(names, important[0])) {
      nameString.push(important[0])
    }
    if (_.includes(names, important[1])) {
      nameString.push(important[1])
    }
  }
  if(names.length - nameString.length != 0){
      var other = (names.length - nameString.length == 1)? "other" : "others";
      nameString.push(`${ names.length - nameString.length } `+ other);
  }

    const showPopup = () => {
        alert(names.join(", "));
    };

        return (
      <div>
          <div style={styles.box}>
              <div style={ styles.counter }>
                  <a id={like_btn_id} onClick={ onClick }><span className="glyphicon glyphicon-thumbs-up" style={{"fontSize": "25px"}}></span></a>
              </div>
              { _.map(_.keys(groups), (reaction, i, reactions) => {
                  return (
                      <FacebookCounterReaction
                          key={ i }
                          reaction={ reaction }
                          index={ reactions.length - i }
                          bg={ bg }
                      />
                  )
              }) }
              <div onClick={showPopup} style={styles.name}>
                  <pre style={{
                    "display": "inline",
                    "fontFamily":"Helvetica Neue",
                    "fontSize":"14px",
                    "lineHeight":"22px",
                    "border":"0px",
                    "marginLeft": "0px",
                    "backgroundColor":"transparent",
                    "padding": "0px",
                  }}><b>{listOfNames(nameString)+" like this!"}</b></pre>
              </div>
          </div>
      </div>
  )
};

FacebookCounter.defaultProps = {
  important: [],
  bg: '#fff',
};

export default FacebookCounter
