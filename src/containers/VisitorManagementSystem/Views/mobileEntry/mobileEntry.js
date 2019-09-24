/**
 *
 * VisitorManagementSystem
 *
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import ToastMessage from '../../../ToastMessage/ToastMessage'
// import {useInjectSaga} from 'utils/injectSaga';
// import {useInjectReducer} from 'utils/injectReducer';
// import makeSelectVisitorManagementSystem from '../../selectors';
// import reducer from '../../reducer';
// import saga from '../../saga';
import '../../vmsStyles.css';
import { sendMobileNumber } from '../../actions';
import { GwlLogo } from '../../../../components/gwlLogo';
import { Loader } from '../../../../components/loader';
export class MobileEntry extends Component{

state = {
  mobile:'----------', //local state
  message:''
}

 handleSubmit(mobile,e){

  const dashStatus = mobile.includes('-')

  if(!dashStatus){
    if(mobile[0] === '0'){
      this.setState({
        message:'Mobile number should not start with 0',
        mobile:'----------',
      })

      e.preventDefault();
    }else{
      this.props.sendNumber(mobile)
    }
   
  }else{
    this.setState({
      message:'Please Enter 10 digit mobile number',
      mobile:'----------',
    })

    e.preventDefault();

  }
  }

  handleNumber(number){
  
    const {mobile} = this.state

    const _position = mobile.indexOf('-')


    if(mobile.length < 11){
      
      const newMobile = this.replaceAt(mobile,_position,number)

      if(_position !== -1){
        this.setState({
          mobile:newMobile,
          message:''
        })
      }
     
    }
    
  }

  replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
  }

  backReplaceAt(string, index, replace) {
      const lastduplicateChar = string.lastIndexOf(index)
      
      return string.substring(0, lastduplicateChar) + replace + string.substring(lastduplicateChar + 1);
    }

  handlebackSpace(){
    const {mobile} = this.state

    if(mobile.includes('-')){
      const _position = mobile.indexOf('-')
      // console.log(_position);
     // const newMobile = mobile.replace(mobile[_position - 1], "-");
      if(_position > 0){
      const correctMobile = this.backReplaceAt(mobile,mobile[_position-1],'-')
      
      this.setState({
        mobile:correctMobile,
        message:''
      })
    }
    }else{
   
      const length = mobile.length
      const correctMobile = this.backReplaceAt(mobile,mobile[length-1],'-')
      this.setState({
        mobile:correctMobile,
        message:''
      })
    }
   
  }

  handleError(error,errorType){
    return(
      <ToastMessage error={error}  errorType = {errorType}/>
    )
  }

  render() {

    const {mobile , message} = this.state
    const {requesting,error,errorType} = this.props.visitor

    if(requesting){
     return  <div className={"midContentPanel"}><Loader /></div>

    }else{
      return (
        <div className="midContentPanel">
        <GwlLogo />
        <section>
            <div className="mobBox">
                <span className="country">
                    <img src={require("../../images/flag-india.png")} alt="India" />
                    +91
                </span>
                <span className="phNo">{mobile}</span>
            </div>
            <div className="numberPad">
                <ul>
                    <li><button onClick={() => this.handleNumber(1)}>1</button></li>
                    <li><button onClick={() => this.handleNumber(2)}>2</button></li>
                    <li><button onClick={() => this.handleNumber(3)}>3</button></li>
                    <li><button onClick={() => this.handleNumber(4)}>4</button></li>
                    <li><button onClick={() => this.handleNumber(5)}>5</button></li>
                    <li><button onClick={() => this.handleNumber(6)}>6</button></li>
                    <li><button onClick={() => this.handleNumber(7)}>7</button></li>
                    <li><button onClick={() => this.handleNumber(8)}>8</button></li>
                    <li><button onClick={() => this.handleNumber(9)}>9</button></li>
                    <li><button onClick={() => this.handlebackSpace()} className="icon"><img src={require("../../images/backspace.png")} alt="" /></button></li>
                    <li><button onClick={() => this.handleNumber(0)}>0</button></li>
                    <li><Link onClick={(e) => this.handleSubmit(mobile,e)} to="/visitor_otp"><button className="icon"><img src={require("../../images/tick.png")} alt=""/></button></Link></li>
                </ul>
            </div>
  
            <div>
              <span>{message}</span>
              <span>{error ? () => this.handleError(error,errorType) :null}</span>
            </div>
        </section>
    </div>  
      );  
    }

  
  }

}

MobileEntry.propTypes = {
  sendNumber: PropTypes.func.isRequired,
};

function mapStateToProps (state)  {  

  return {
      visitor: state.visitor
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendNumber : (mobilenumber) => dispatch(sendMobileNumber(mobilenumber))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MobileEntry);
