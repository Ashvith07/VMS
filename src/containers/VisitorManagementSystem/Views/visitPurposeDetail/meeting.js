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
import { sendVisitPurposeDetails } from '../../actions';

class Meeting extends Component {

  state  = {
    contactPerson:'',
    company:'',
    meetingPurpose:'Official',
    message:''
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
            contactPerson:e.target.value,
             message:''
           })
        break;

       case 2:
        this.setState({
          company:e.target.value,
          message:''
       })
       break;
       case 3:
        this.setState({
          meetingPurpose:e.target.value,
           message:''
       })
       break;

      default:
        break;
    }
  }

  handleSubmit(e){
     const {contactPerson,company ,meetingPurpose} = this.state
     const {token} = this.props.visitor
     
 
     if(token && contactPerson && company && meetingPurpose){
      
       const formId = "Meeting"
       this.props.sendVisitPurposeDetails(token,contactPerson,company,meetingPurpose,formId)
      
     }else{
       this.setState({
         message: 'Fields should not be empty'
       })
       e.preventDefault();
     }
 
    }

  render(){

    const {requesting,errorType,error} = this.props.visitor
    const {message,contactPerson,meetingPurpose,company} = this.state    

    if (requesting) {
      return(
        <div className={"midContentPanel"}><Loader /></div>
      )
    }else{
      return(
                <div className="midContentPanel">
                  <GwlLogo />
                    <section className="formUi">

                    <FormField 
                          fieldTitle="Who are you meeting?"
                          value = {contactPerson}
                          changeHandle = {(e) => this.handleFormFields(e,1)}
                    />
                    
                    <FormField 
                          fieldTitle="Which Organisation? "
                          value = {company}
                          changeHandle = {(e) => this.handleFormFields(e,2)}
                    />

                    
                    <label>Meeting purpose </label>
                        <div className="styledSelect">
                        <select value={meetingPurpose} onChange={(e) => this.handleFormFields(e,3)}>
                            <option value="Official">Official</option>
                            <option value="Interview">Interview</option>
                            <option value="Personal">Personal</option>
                        </select>
                         </div>
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

Meeting.propTypes = {
  sendVisitPurposeDetails: PropTypes.func.isRequired,
};

function mapStateToProps (state)  {

 
   return {
       visitor: state.visitor
   }
 }

 function mapDispatchToProps(dispatch) {
  return {
   sendVisitPurposeDetails : (token,contactPerson,company,meetingPurpose,formId) => dispatch(sendVisitPurposeDetails(token,contactPerson,company,meetingPurpose,formId))

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Meeting);
