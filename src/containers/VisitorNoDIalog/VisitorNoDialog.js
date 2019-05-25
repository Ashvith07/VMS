import React, { PureComponent } from 'react';
import './VisitorNoDialog.css'
import '../VisitorManagementSystem/vmsStyles.css'

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { sendVisitorId } from '../VisitorManagementSystem/actions';
//import { sendVisitPurposeDetails } from '../../actions';
class VisitorNoDialog extends PureComponent {

  state={
    visitorId:''
  }

  handlevisitorId(e){

    this.setState({
      visitorId:e.target.value
    })
  }

  handleSubmit(){
    const visitorId = this.state.visitorId
    this.props.sendVisitorId(visitorId)
  }

  render() {
    const visitorId = this.state.visitorId
    
    const {isActive,closeSnack} = this.props;
    return (
      <div className = {isActive ? ["vidsnackbar", "show"].join(" ") : "vidsnackbar"}>
        <div>Visitor Card Id</div>
        <input style={{color:'black',background:'rgba(255, 255, 255, 1)'}} value={visitorId} onChange={(e) => {this.handlevisitorId(e)}}/>
        <div className="row">
            <div className="col-sm-6">
                <button onClick = {closeSnack} className="btn-orange full">Close</button>
             </div>
              <div className="col-sm-6">
                  <Link onClick={() => this.handleSubmit()} to='/feedback' ><button className="btn-blue full">Next</button></ Link>
              </div>
        </div>
      </div>
    )
  }
}

VisitorNoDialog.propTypes = {
 // sendVisitPurposeDetails: PropTypes.func.isRequired,
};


 function mapDispatchToProps(dispatch) {
  return {
    sendVisitorId : (visitorId) => dispatch(sendVisitorId(visitorId))
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(VisitorNoDialog);