import React,{Component} from 'react'
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../vmsStyles.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ToastMessage } from '../../../ToastMessage/ToastMessage';
import { Loader } from '../../../../components/loader';



class PhotoCapture extends Component{

  state = {
    message:'hello'
  }

  static getDerivedStateFromProps(props){
  
    const {error ,requesting,view,visitDetailPage} = props.visitor
    if(error && !requesting && view === "capturePhoto"){
      props.history.push(`/purposeDetail/${visitDetailPage}`)     
    }

    return null
 }

 handleError(error,errorType){
   return(
     <ToastMessage error={error}  errorType = {errorType}/>
   )
 }

  render(){
    const {requesting,errorType,error} = this.props.visitor
    const {message} = this.state


    if (requesting) {
      return(
        <div className={"midContentPanel"}><Loader /></div>
      )
    } else {
      return(
        <div style={{ height : "30px", lineHeight : "30px"}}>
        <span>{message}</span>
        <span>{error ? this.handleError(error,errorType) :null}</span>
      </div>
      )
    }
   
  }
}


PhotoCapture.propTypes = {
 // sendVisitPurpose: PropTypes.func.isRequired,
};

function mapStateToProps (state)  {

  // console.log('mstp',state);
 
   return {
       visitor: state.visitor
   }
 }

 function mapDispatchToProps(dispatch) {
  return {
   // sendVisitPurpose : (visitPurpose,token) => dispatch(sendVisitPurpose(visitPurpose,token))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PhotoCapture);