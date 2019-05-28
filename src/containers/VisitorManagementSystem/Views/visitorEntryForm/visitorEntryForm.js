import React,{Component} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { ToastMessage } from '../../../ToastMessage/ToastMessage';
import '../../vmsStyles.css';
import { GwlLogo } from '../../../../components/gwlLogo';
import classNames from 'classnames';
import { FormField } from '../../../../components/formField';
import { sendVisitorInfo } from '../../actions';
import { Loader } from '../../../../components/loader';
class VisitorEntryForm extends Component{


  state = {
    firstName:'',
    lastName:'',
    location:'',
    email:'',
    companyName:'',
    message:''
  }

  componentDidMount(){
    const currentLocation = window.location.href

    window.history.pushState(null,null,currentLocation)
    window.onpopstate = function(){
      window.history.go(1)
    }
  }

  static getDerivedStateFromProps(props){
  
    const {error ,requesting,view,is_recurring} = props.visitor

    if(is_recurring === "true"){
      props.history.push('/visit_purpose')

     
    }

    if(error && !requesting && view === "entryForm"){
      props.history.push('/visitor_otp')

     
    }

    return null
   }

   handleError(error,errorType){
     return(
       <ToastMessage error={error}  errorType = {errorType}/>
     )
   }

   checkEmailValid(email){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

      if(reg.test(email) === false){
        return false
      }

      return true
   }

   handleSubmit(e){
    const {firstName, lastName,location,email,companyName} = this.state
    const {token} = this.props.visitor
    

    if(token && firstName && lastName && location && email && companyName){
      const isValid = this.checkEmailValid(email)
      if(isValid){
        this.props.sendInfo(token,firstName,lastName,location,companyName,email)
        
      }else{
        e.preventDefault();
        this.setState({
          message: 'Invalid email format'
        })
      }
    }else{
      this.setState({
        message: 'Fields should not be empty'
      })
      e.preventDefault();
    }

   }


   handleFormFields(e,fieldId){
     switch (fieldId) {
       case 1:
            this.setState({
              firstName:e.target.value,
              message:''
            })
         break;

        case 2:
         this.setState({
          lastName:e.target.value,
          message:''
        })
        break;
        case 3:
         this.setState({
          email:e.target.value,
          message:''
        })
        break;
        case 4:
         this.setState({
          companyName:e.target.value,
          message:''
        })
        break;
        case 5:
         this.setState({
          location:e.target.value,
          message:''
        })
        break;
     
       default:
         break;
     }
   }

  render(){

    const {requesting,errorType,error} = this.props.visitor
    const {message} = this.state
   // const currentView = "visitorEntryForm"

    if (requesting) {
      return(
        <div className={"midContentPanel"}><Loader /></div>
      )
    } else {
      return(
          <div className={"midContentPanel"}>
             <GwlLogo />
              <section className={"formUi"}>
                      <FormField 
                        fieldTitle="First Name :"
                        value={this.state.firstName}
                        changeHandle =  {(e) => this.handleFormFields(e,1)}
                      />
                      <FormField 
                        fieldTitle="Last Name :"
                        value={this.state.lastName}
                        changeHandle =  {(e) => this.handleFormFields(e,2)}
                      />
                      <FormField 
                        fieldTitle="Email :"
                        value={this.state.email}
                        changeHandle =  {(e) => this.handleFormFields(e,3)}
                      />
                      <FormField 
                        fieldTitle="Company Name : "
                        value={this.state.companyName}
                        changeHandle =  {(e) => this.handleFormFields(e,4)}
                      />
                      <FormField 
                        fieldTitle="Location :"
                        value={this.state.location}
                        changeHandle =  {(e) => this.handleFormFields(e,5)}
                      />
                      <Link onClick = {(e) => this.handleSubmit(e)} to="/visit_purpose"><button className={classNames("btnGreen", "full")}>Next</button></Link>
                  </section>

                  <div style={{ height : "30px", lineHeight : "30px"}}>
                    <span>{message}</span>
                    <span>{error ? this.handleError(error,errorType) :null}</span>
                  </div>
          </div>         
      );
    }
    
  }

}



VisitorEntryForm.propTypes = {
  sendInfo: PropTypes.func.isRequired,
};

function mapStateToProps (state)  {

 
   return {
       visitor: state.visitor
   }
 }

 function mapDispatchToProps(dispatch) {
  return {
   sendInfo : (token,firstName,lastName,location,companyName,email) => dispatch(sendVisitorInfo(token,firstName,lastName,location,companyName,email))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VisitorEntryForm);
