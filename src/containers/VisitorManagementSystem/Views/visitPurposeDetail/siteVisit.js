import React,{Component} from 'react'
import { GwlLogo } from '../../../../components/gwlLogo';
import { Loader } from '../../../../components/loader';
import { ToastMessage } from '../../../ToastMessage/ToastMessage';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import classNames from 'classnames';
import { FormField } from '../../../../components/formField';
import { TextAreaField } from '../../../../components/textAreaField';
import { sendVisitPurposeDetails } from '../../actions';

class SiteVisit extends Component {

  state  = {
    message:'',

    requirements:'',
    seats:'1-10',
    aboutUs:''
  }

  static getDerivedStateFromProps(props){
  
    const {error ,requesting,view} = props.visitor
    if(error && !requesting && view === "purposeDetail"){
      props.history.push(`/visit_purpose`)
    }

    return null
 }

  handleError(error,errorType){
    return(
      <ToastMessage error={error}  errorType = {errorType}/>
    )
  }

  handleFormFields(e,fieldId){
    switch (fieldId) {
      case 1:
           this.setState({
             requirements:e.target.value,
             message:''
           })
        break;

       case 2:
        this.setState({
          seats:e.target.value,
          message:''
       })
       break;
       case 3:
        this.setState({
          aboutUs:e.target.value,
           message:''
       })
       break;

      default:
        break;
    }
  }

  isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
  }

  handleSubmit(e){
     const {requirements, seats,aboutUs} = this.state
     const {token} = this.props.visitor
     
 
     if(token && requirements && seats && aboutUs){
     //  const isValid = this.isNumeric(seats)
       if(true){
         const formId = "SiteVisit"
         this.props.sendVisitPurposeDetails(token,requirements,seats,aboutUs,formId)
         
       }else{
         e.preventDefault();
         this.setState({
           message: 'Seat number should be number'
         })
       }
     }else{
       this.setState({
         message: 'Fields should not be empty'
       })
       e.preventDefault();
     }
 
    }

  render(){

    const {requesting,errorType,error} = this.props.visitor
    const {message,requirements,aboutUs,seats} = this.state

    if (requesting) {
      return(
        <div className={"midContentPanel"}><Loader /></div>
      )
    }else{
      return(
        <div className={"midContentPanel"}>
              <GwlLogo />
              <section className={"formUi"}>
                      <TextAreaField 
                        fieldTitle = "What are your requirements?"
                        value = {requirements}
                        changeHandle = {(e) => this.handleFormFields(e,1)}
                      />
                      {/* <FormField 
                        fieldTitle = "For how many seaters?"
                        value = {seats}
                        changeHandle = {(e) => this.handleFormFields(e,2)}
                      /> */}

                      <label>Team Size options - </label>
                        <div className="styledSelect">
                        <select value= {seats} onChange={(e) => this.handleFormFields(e,2)}>
                            <option value="1-10">1-10</option>
                            <option value="10-50">10-50</option>
                            <option value="50-100">50-100</option>
                            <option value="100+">100+</option>
                        </select>
                         </div>
                      <FormField 
                        fieldTitle = "From where did you come to know about us?"
                        value = {aboutUs}
                        changeHandle = {(e) => this.handleFormFields(e,3)}
                      />
                      <Link onClick = {(e) => this.handleSubmit(e)} to="/photo_capture"><button className={classNames("btnGreen", "full")}>Next</button></Link>
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

SiteVisit.propTypes = {
  sendVisitPurposeDetails: PropTypes.func.isRequired,
};

function mapStateToProps (state)  {

 
   return {
       visitor: state.visitor
   }
 }

 function mapDispatchToProps(dispatch) {
  return {
    sendVisitPurposeDetails : (token,requirements,seats,aboutUs,formId) => dispatch(sendVisitPurposeDetails(token,requirements,seats,aboutUs,formId))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SiteVisit);
