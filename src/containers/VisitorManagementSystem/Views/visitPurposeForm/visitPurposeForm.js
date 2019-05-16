import React,{Component} from 'react'
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../vmsStyles.css';
import { GwlLogo } from '../../../../components/gwlLogo';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ToastMessage } from '../../../ToastMessage/ToastMessage';
import { Loader } from '../../../../components/loader';
import {sendVisitPurpose} from '../../actions'
import { SelectField } from '../../../../components/selectField';
class VisitPurposeForm extends Component{

  state = {
    visitPurpose:undefined,
    message:''
  }

  static getDerivedStateFromProps(props){
  
     const {error ,requesting,view} = props.visitor
     if(error && !requesting && view === "visitPurpose"){
       props.history.push('/entry_form')

      
     }

     return null
  }

  handleError(error,errorType){
    return(
      <ToastMessage error={error}  errorType = {errorType}/>
    )
  }

  handleRadioInput(e){
    alert(e.target.value)
    const visitPurpose = e.target.value
    if (visitPurpose === "SiteVisit") {
      this.setState({
        visitPurpose,
        message:''
      })
    } else if(visitPurpose === "Meeting") {
      this.setState({
        visitPurpose,
        message:''
      })
    }else{
      this.setState({
        visitPurpose,
        message:''
      })
    }
  }

  handleSubmit(e){
    const {visitPurpose} = this.state
    const { token  } = this.props.visitor
    if(visitPurpose === undefined){
      e.preventDefault()

      this.setState({
        message:'Please select your visit purpose'
      })
    }else{
      console.log('navigatge');

      this.props.sendVisitPurpose(visitPurpose,token)
      
    }
  }

  render(){

    const {requesting,errorType,error} = this.props.visitor
    const {visitPurpose,message} = this.state

    if (requesting) {
      return(
        <div className={"midContentPanel"}><Loader /></div>
      )
    } else {
      return(
        <div className={"midContentPanel"}>
              <GwlLogo />  
              <section className={"formUi"}>
                      <label>Purpose of visit : </label>
                      <div>
                          <SelectField 
                            id="site-visit"
                            value = "SiteVisit"
                            forr="site-visit"
                            changeRadioInput =  {(e) => this.handleRadioInput(e)}
                          />
                          <SelectField 
                            id="meeting"
                            value = "Meeting"
                            forr="meeting"
                            changeRadioInput =  {(e) => this.handleRadioInput(e)}
                          />
                          <SelectField 
                            id="event"
                            value = "Event"
                            forr="event"
                            changeRadioInput =  {(e) => this.handleRadioInput(e)}
                          />
                      </div>
                      <Link onClick = {(e) => this.handleSubmit(e)}  to={`/purposeDetail/${visitPurpose}`}><button className={classNames("btnGreen", "full")}>Next</button></Link>
                  </section>

                  <div style={{ height : "30px", lineHeight : "30px"}}>
                    <span>{message}</span>
                    <span>{error ? this.handleError(error,errorType) :null}</span>
                  </div>
          </div>   
      )
    }   
  }
 
}


VisitPurposeForm.propTypes = {
  sendVisitPurpose: PropTypes.func.isRequired,
};

function mapStateToProps (state)  {

  // console.log('mstp',state);
 
   return {
       visitor: state.visitor
   }
 }

 function mapDispatchToProps(dispatch) {
  return {
    sendVisitPurpose : (visitPurpose,token) => dispatch(sendVisitPurpose(visitPurpose,token))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VisitPurposeForm);