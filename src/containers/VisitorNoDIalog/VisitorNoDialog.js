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
    mobile:''
  }

  handleVisitorMobile(e){

    this.setState({
      mobile:e.target.value
    })
  }

  handleSubmit(){
    const mobile = this.state.mobile
    this.props.sendVisitorId(mobile) //here mobile number is identity of visitor
  }

  render() {
    const mobile = this.state.mobile
    
    const {isActive,closeSnack} = this.props;
    return (
      <div className = {isActive ? ["vidsnackbar", "show"].join(" ") : "vidsnackbar"}>
        <div>Mobile Number</div>
        <input style={{color:'black',background:'rgba(255, 255, 255, 1)'}} value={mobile} onChange={(e) => {this.handleVisitorMobile(e)}}/>
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
    sendVisitorId : (mobile) => dispatch(sendVisitorId(mobile)) //here mobile number is identity of visitor
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(VisitorNoDialog);