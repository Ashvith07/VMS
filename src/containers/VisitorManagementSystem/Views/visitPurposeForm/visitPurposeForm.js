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


class CheckList extends Component{

  state={
    meetingRooms : [],
    officeSpaces : [],
    others : []
  }

  handleMeetingRooms(e){

    let meetingRoomsList = this.state.meetingRooms; //meetingRoomsList
    let check = e.target.checked;
    let checked_room = e.target.value;
    if(check){
        this.setState({
          meetingRooms: [...this.state.meetingRooms, checked_room]
        })
    }else{ 
        var index = meetingRoomsList.indexOf(checked_room);
        if (index > -1) {
            meetingRoomsList.splice(index, 1);
            this.setState({
              meetingRooms: meetingRoomsList
            })
        } 
    }
  }
  
  handleOfficeSpaces(e){

    let officeSpacesList = this.state.officeSpaces; //officeSpacesList
    let check = e.target.checked;
    let checked_office_space = e.target.value;
    if(check){
        this.setState({
          officeSpaces: [...this.state.officeSpaces, checked_office_space]
        })
    }else{ 
        var index = officeSpacesList.indexOf(checked_office_space);
        if (index > -1) {
          officeSpacesList.splice(index, 1);
            this.setState({
              officeSpaces: officeSpacesList
            })
        } 
    }
  }

    
  handleOthers(e){

    let othersList = this.state.others; //othersList
    let check = e.target.checked;
    let checked_other = e.target.value;
    if(check){
        this.setState({
          others: [...this.state.others, checked_other]
        })
    }else{ 
        var index = othersList.indexOf(checked_other);
        if (index > -1) {
          othersList.splice(index, 1);
            this.setState({
              others: othersList
            })
        } 
    }
  }

  handleSubmit(){
    const token = this.props.visitor.token

    const {meetingRooms,officeSpaces,others} = this.state

    this.props.sendCheckList(token,meetingRooms,officeSpaces,others)

  }
  handleError(error,errorType){
    return(
      <ToastMessage error={error}  errorType = {errorType}/>
    )
  }

  render(){

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
                      <input id="m20" name="m20" type="checkbox" value="m20" onChange={(e) => this.handleMeetingRooms(e)} />
                      <label htmlFor="m20"></label>
                      <span>20 Seater </span>
                  </div>
              </label>
              <label>
                  <div className="imageCheckbox">
                      <input id="m10" name="m10" type="checkbox" value="m10" onChange={(e) => this.handleMeetingRooms(e)} />
                      <label htmlFor="m10"></label>
                      <span>10 Seater </span>
                  </div>
              </label>
              <label>
                  <div className="imageCheckbox">
                      <input id="m8" name="m8" type="checkbox" value="m8" onChange={(e) => this.handleMeetingRooms(e)} />
                      <label htmlFor="m8"></label>
                      <span>8 Seater </span>
                  </div>
              </label>

              <h3>Office space</h3>
              <label>
                  <div className="imageCheckbox">
                      <input id="o20" name="o20" type="checkbox" value="o20" onChange={(e) => this.handleOfficeSpaces(e)} />
                      <label htmlFor="o20"></label>
                      <span>20 Seater </span>
                  </div>
              </label>
              <label>
                  <div className="imageCheckbox">
                      <input id="o10" name="o10" type="checkbox" value="o10" onChange={(e) => this.handleOfficeSpaces(e)} />
                      <label htmlFor="o10"></label>
                      <span>10 Seater </span>
                  </div>
              </label>
              <label>
                  <div className="imageCheckbox">
                      <input id="o6" name="o6" type="checkbox" value="o6" onChange={(e) => this.handleOfficeSpaces(e)} />
                      <label htmlFor="o6"></label>
                      <span>6 Seater </span>
                  </div>
              </label>
              <label>
                  <div className="imageCheckbox">
                      <input id="o4" name="o4" type="checkbox" value="o4" onChange={(e) => this.handleOfficeSpaces(e)} />
                      <label htmlFor="o4"></label>
                      <span>4 Seater </span>
                  </div>
              </label>

              <h3>Others </h3>
              <label>
                  <div className="imageCheckbox">
                      <input id="pod" name="pod" type="checkbox" value="pod" onChange={(e) => this.handleOthers(e)} />
                      <label htmlFor="pod"></label>
                      <span>Individual Cubical/Pod </span>
                  </div>
              </label>
              <label>
                  <div className="imageCheckbox">
                      <input id="cafe" name="cafe" type="checkbox" value="cafe" onChange={(e) => this.handleOthers(e)} />
                      <label htmlFor="cafe"></label>
                      <span>Cafeteria </span>
                  </div>
              </label>
              <label>
                  <div className="imageCheckbox">
                      <input id="wr" name="wr" type="checkbox" value="wr" onChange={(e) => this.handleOthers(e)} />
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
    sendCheckList : (token,meetingRooms,officeSpaces,others) => dispatch(sendCheckList(token,meetingRooms,officeSpaces,others))
   };
 }
 
 const withConnect = connect(
   mapStateToProps,
   mapDispatchToProps,
 );
 
 export default compose(withConnect)(CheckList);