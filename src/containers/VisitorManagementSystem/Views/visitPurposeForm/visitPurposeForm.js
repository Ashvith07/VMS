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
import { FormField } from '../../../../components/formField';
import axios from 'axios'

class VisitPurposeForm extends Component{

  state = {
    visitPurpose:undefined,
    message:'',
    building:'',
    floor:'',
    wing:'',

    locations:[] //newly added from api cowork
  }

  componentDidMount(){
    axios.post('http://142.93.57.132/Goodworks-VMS-php/cowork_locations',{
     // entry_token:token
    }).then((res) => {
      const {result} = res.data
      
      this.setState({
        locations:result,
      })
      
    }).catch((err) => {
      console.log(err);
      
    })
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
    const visitPurpose = e.target.value
    if (visitPurpose === "Site Visit") {
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
    const {visitPurpose,building,floor,wing} = this.state
    const { token  } = this.props.visitor
    if(visitPurpose === undefined){
      e.preventDefault()

      this.setState({
        message:'Please select your visit purpose'
      })
    }else{

      this.props.sendVisitPurpose(visitPurpose,token,building,floor,wing)
      
    }
  }

  handleFormFields(e,fieldId){
    switch (fieldId) {
      case 1:
           this.setState({
            building:e.target.value,
             message:''
           })
        break;

       case 2:
        this.setState({
          floor:e.target.value,
          message:''
       })
       break;
       case 3:
        this.setState({
          wing:e.target.value,
           message:''
       })
       break;

      default:
        break;
    }
  }

  render(){

    const {requesting,errorType,error} = this.props.visitor
    const {visitPurpose,message,building,floor,wing,locations} = this.state

    console.log(locations,'aaaaaaaaaaa');
    

    if (requesting) {
      return(
        <div className={"midContentPanel"}><Loader /></div>
      )
    } else {
      return(
        <div className={"midContentPanel"}>
              <GwlLogo />  
              <section className={"formUi"}>
                      
                      <div>
                         {/* <FormField 
                          fieldTitle="Building"
                          value = {building}
                          changeHandle = {(e) => this.handleFormFields(e,1)}
                          /> */}

                        <label>Building</label>
                        <div className="styledSelect">
                        <select value= {building} onChange={(e) => this.handleFormFields(e,1)}>
                            {locations.map(location => 
                             <option key = {location} value={location}>{location}</option>
                            )}
                            {/* <option value="Official">Official</option>
                            <option value="Interview">Interview</option>
                            <option value="Personal">Personal</option> */}
                        </select>
                         </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <label>Floor </label>
                                <input type="text" value={floor} onChange = {(e) => this.handleFormFields(e,2)}/>
                            </div>
                            <div className="col-sm-6">
                                <label>Wing </label>
                                <input type="text"  value={wing} onChange = {(e) => this.handleFormFields(e,3)} />
                            </div>
                        </div>

                         {/* {Sample use off formfield} */}

                          {/* <FormField 
                          fieldTitle="Which floor? "
                          value = {floor}
                          changeHandle = {(e) => this.handleFormFields(e,2)}
                          />
                          <FormField 
                          fieldTitle="Which wing? "
                          value = {wing}
                          changeHandle = {(e) => this.handleFormFields(e,3)}
                          /> */}
                        <label>Purpose of visit : </label>
                          <SelectField 
                            id="site-visit"
                            value = "Site Visit"
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

 
   return {
       visitor: state.visitor
   }
 }

 function mapDispatchToProps(dispatch) {
  return {
    sendVisitPurpose : (visitPurpose,token,building,floor,wing) => dispatch(sendVisitPurpose(visitPurpose,token,building,floor,wing))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VisitPurposeForm);