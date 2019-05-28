import React,{Component} from 'react'
import { Loader } from '../../../../components/loader';

import { compose } from 'redux';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../vmsStyles.css';
import { Link } from 'react-router-dom';
import { ToastMessage } from '../../../ToastMessage/ToastMessage';
import { GwlLogo } from '../../../../components/gwlLogo';
import { sendCheckList } from '../../actions';
import update from 'react-addons-update'; // ES6



class CheckList extends Component{

  state={
    meetingRooms : [],
    officeSpaces : [],
    others : [],
    checklists:{
      // Meeting_room:[],
      // Office_space:[],
      // Others:[]
    },

    tempMeetingarray : [],
    tempOfficearray : [],
    tempOthers:[]
  }

  handleMeetingRooms(e){

   // debugger
    const {target:{name,value}} = e

   // console.log(name,value);
    
    console.log(name,value);
    const arr = this.state.tempMeetingarray
    let newArray

    if(arr.includes(value)){
      const index = arr.indexOf(value)

      newArray = update(arr, {$splice: [[index, 1]]})
      console.log(newArray);
      
    }else{
      newArray = update(arr, {$push: [value]}); // => [1, 2, 3, 4]
      console.log(newArray);
    }

    this.setState({
      tempMeetingarray:newArray
    },() => {
      this.setState(prevState => ({
        checklists: {
            ...prevState.checklists,
            [name]: this.state.tempMeetingarray
        }
    }))
    })
  }
  
  handleOfficeSpaces(e){

    // debugger
    const {target:{name,value}} = e

   // console.log(name,value);
    
    console.log(name,value);
    const arr = this.state.tempOfficearray
    let newArray

    if(arr.includes(value)){
      const index = arr.indexOf(value)

      newArray = update(arr, {$splice: [[index, 1]]})
      console.log(newArray);
      
    }else{
      newArray = update(arr, {$push: [value]}); // => [1, 2, 3, 4]
      console.log(newArray);
    }

    this.setState({
      tempOfficearray:newArray
    },() => {
      this.setState(prevState => ({
        checklists: {
            ...prevState.checklists,
            [name]: this.state.tempOfficearray
        }
    }))
    })
  }

    
  handleOthers(e){

    const {target:{name,value}} = e

    // console.log(name,value);
     
     console.log(name,value);
     const arr = this.state.tempOthers
     let newArray
 
     if(arr.includes(value)){
       const index = arr.indexOf(value)
 
       newArray = update(arr, {$splice: [[index, 1]]})
       console.log(newArray);
       
     }else{
       newArray = update(arr, {$push: [value]}); // => [1, 2, 3, 4]
       console.log(newArray);
     }
 
     this.setState({
      tempOthers:newArray
     },() => {
       this.setState(prevState => ({
         checklists: {
             ...prevState.checklists,
             [name]: this.state.tempOthers
         }
     }))
     })
  }

  handleSubmit(){
    const token = this.props.visitor.token

    const {checklists} = this.state

    this.props.sendCheckList(token,checklists)

  }
  handleError(error,errorType){
    return(
      <ToastMessage error={error}  errorType = {errorType}/>
    )
  }

  render(){

    console.log('rrrrr',this.state.somearray);
    console.log('rrrrr',this.state.checklists);

    
    const{requesting,error,errorType} = this.props.visitor

    

    if(requesting){
      return    <div className={"midContentPanel"}><Loader /></div>

    }
    return(
      <div className="midContentPanel">
      <GwlLogo />
      <section className="formUi">
          <div className="terms">
              <h3>Meeting room</h3>
              <label>
                  <div className="imageCheckbox">
                      <input id="m20" name="Meeting_room" type="checkbox" value="m11" onChange={(e) => this.handleMeetingRooms(e)} />
                      <label htmlFor="m20"></label>
                      <span>20 Seater </span>
                  </div>
              </label>
              <label>
                  <div className="imageCheckbox">
                      <input id="m10" name="Meeting_room" type="checkbox" value="m10" onChange={(e) => this.handleMeetingRooms(e)} />
                      <label htmlFor="m10"></label>
                      <span>10 Seater </span>
                  </div>
              </label>
              <label>
                  <div className="imageCheckbox">
                      <input id="m8" name="Meeting_room" type="checkbox" value="m8" onChange={(e) => this.handleMeetingRooms(e)} />
                      <label htmlFor="m8"></label>
                      <span>8 Seater </span>
                  </div>
              </label>

              <h3>Office space</h3>
              <label>
                  <div className="imageCheckbox">
                      <input id="o20" name="Office_space" type="checkbox" value="o20" onChange={(e) => this.handleOfficeSpaces(e)} />
                      <label htmlFor="o20"></label>
                      <span>20 Seater </span>
                  </div>
              </label>
              <label>
                  <div className="imageCheckbox">
                      <input id="o10" name="Office_space" type="checkbox" value="o10" onChange={(e) => this.handleOfficeSpaces(e)} />
                      <label htmlFor="o10"></label>
                      <span>10 Seater </span>
                  </div>
              </label>
              <label>
                  <div className="imageCheckbox">
                      <input id="o6" name="Office_space" type="checkbox" value="o6" onChange={(e) => this.handleOfficeSpaces(e)} />
                      <label htmlFor="o6"></label>
                      <span>6 Seater </span>
                  </div>
              </label>
              <label>
                  <div className="imageCheckbox">
                      <input id="o4" name="Office_space" type="checkbox" value="o4" onChange={(e) => this.handleOfficeSpaces(e)} />
                      <label htmlFor="o4"></label>
                      <span>4 Seater </span>
                  </div>
              </label>

              <h3>Others </h3>
              <label>
                  <div className="imageCheckbox">
                      <input id="pod" name="Others" type="checkbox" value="pod" onChange={(e) => this.handleOthers(e)} />
                      <label htmlFor="pod"></label>
                      <span>Individual Cubical/Pod </span>
                  </div>
              </label>
              <label>
                  <div className="imageCheckbox">
                      <input id="cafe" name="Others" type="checkbox" value="cafe" onChange={(e) => this.handleOthers(e)} />
                      <label htmlFor="cafe"></label>
                      <span>Cafeteria </span>
                  </div>
              </label>
              <label>
                  <div className="imageCheckbox">
                      <input id="wr" name="Others" type="checkbox" value="wr" onChange={(e) => this.handleOthers(e)} />
                      <label htmlFor="wr"></label>
                      <span>Washrooms </span>
                  </div>
              </label>

          </div>
          <Link onClick={() => this.handleSubmit()} to="/feedback"><button className="btn-green full" data-toggle="modal" data-target="#myModal">Next</button></Link>
      </section>
      <div style={{ height : "30px", lineHeight : "30px"}}>
                    {/* <span>{message}</span> */}
                    <span>{error ? this.handleError(error,errorType) :null}</span>
                     </div>  
      
  </div>
    )
  }
}


CheckList.propTypes = {
  // sendVisitPurpose: PropTypes.func.isRequired,
 };
 
 function mapStateToProps (state)  {
 
  
    return {
        visitor: state.visitor
    }
  }
 
  function mapDispatchToProps(dispatch) {
   return {
    sendCheckList : (token,checklists) => dispatch(sendCheckList(token,checklists))
   };
 }
 
 const withConnect = connect(
   mapStateToProps,
   mapDispatchToProps,
 );
 
 export default compose(withConnect)(CheckList);