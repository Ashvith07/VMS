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
import axios from 'axios'
import _ from 'lodash'




class CheckList extends Component{

  state={
    checklists:[],
    tempArr:[],
    currentHeading:''
  }


  componentDidMount(){
    axios.post('http://142.93.57.132/Goodworks-VMS-php/checklist',{
     // entry_token:token
    }).then((res) => {
      const {checklist} = res.data.result
      
      this.setState({
        checklists:checklist,
      })
      
    }).catch((err) => {
      console.log(err);
      
    })
  }

  handleMeetingRooms(e){


   console.log(e.target);

   
    const {target:{name,value,id}} = e

    console.log(name,value,id);
    
     let arr = this.state.tempArr
     let newArray

     if(id !== this.state.currentHeading && this.state[id] === undefined){
        newArray = []
        arr = []
     }

    if(arr.includes(value)){
      const index = arr.indexOf(value)

      newArray = update(arr, {$splice: [[index, 1]]})
      console.log(newArray);
      
    }else{
      newArray = update(arr, {$push: [value]}); // => [1, 2, 3, 4]
      console.log(newArray);
    }

    console.log('ppppppppp',this.state.checklists);
    
    this.setState({
        tempArr:newArray,

    },() => {           
        this.setState({
            [id]:newArray,
            currentHeading:id
        })
       
    })
  }

  handleSubmit(){

    console.log('qqqqqqqqqq',this.state);
    const {state} = this

    const checklist =_.omit(state,['checklists','currentHeading','tempArr'])
    console.log('send',checklist); 
    
    const token = this.props.visitor.token
    this.props.sendCheckList(token,checklist)



  }
  handleError(error,errorType){
    return(
      <ToastMessage error={error}  errorType = {errorType}/>
    )
  }


  render(){
    
    const{requesting,error,errorType} = this.props.visitor

    const {checklists} = this.state    

    console.log(this.state);
    
    if(requesting){
      return    <div className={"midContentPanel"}><Loader /></div>

    }
    return(
      <div className="midContentPanel">
      <GwlLogo />
      <section className="formUi">
          <div className="terms">
            
            {
                checklists.map((checklist,index) => 
                    (
                        <div key={checklist.heading + index}>
                            <h3 >{checklist.heading}</h3>
                                {checklist.item.map(item => 
                               ( <div  key={item + checklist.heading} >
                                    <label  >
                                        <div  className="imageCheckbox" >
                                        <input  id={checklist.heading} name={checklist.heading} type="checkbox" value={item} onChange={(e) => this.handleMeetingRooms(e)} />
                                        <label  htmlFor="m20"></label>
                                        <span  >{item}</span>
                                        </div>
                                    </label>
                                </div>)
                                  
                                )}
                               
                        </div>
                    )
                )
            }

              {/* <h3>Meeting room</h3>
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
              </label> */}

              {/* <h3>Office space</h3>
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
              </label> */}

          </div>
          <Link onClick={() => this.handleSubmit()} to="/"><button className="btn-green full" data-toggle="modal" data-target="#myModal">Finish</button></Link>
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