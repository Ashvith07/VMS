import React,{Component} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import '../../vmsStyles.css';
import { Link } from 'react-router-dom';
import { sendOtpNumber } from '../../actions';
import { ToastMessage } from '../../../ToastMessage/ToastMessage';
import { GwlLogo } from '../../../../components/gwlLogo';
import { Loader } from '../../../../components/loader';
class MobileOtp extends Component{


  state = {
    otp:'----',
    message:''
  }

 static getDerivedStateFromProps(props){
  
  const {error ,requesting,view} = props.visitor
  if(error && !requesting && view === "otp"){
    props.history.push('/')

   
  }

  return null
 }

 handleSubmit(otp,e){

    const token = this.props.visitor.token

    const dashStatus = otp.includes('-')

    if (dashStatus) {
      this.setState({
        message:'Please Enter 4 digit Otp number which is send to your mobile number'
      })

      e.preventDefault();
    }else{
      console.log('send otp');

      this.props.sendOtp(otp,token)
      
    }
  }

    handleNumber(number){
     
       const {otp} = this.state
   
       const _position = otp.indexOf('-')
   
       console.log('_position',_position);
   
       if(otp.length < 11){
         
         const newOtp = this.replaceAt(otp,_position,number)
   
         if(_position !== -1){
           this.setState({
            otp:newOtp,
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
         
         console.log('aaaaaaaaaa',string,index,replace);
         
         return string.substring(0, lastduplicateChar) + replace + string.substring(lastduplicateChar + 1);
       }
   
     handlebackSpace(){
       const {otp} = this.state
   
       if(otp.includes('-')){
         const _position = otp.indexOf('-')
         const correctOtp = this.backReplaceAt(otp,otp[_position-1],'-')
   
         this.setState({
           otp:correctOtp,
           message:''
         })
       }else{
     
         const length = otp.length
         const correctOtp = this.backReplaceAt(otp,otp[length-1],'-')
         this.setState({
           otp:correctOtp,
           message:''
         })
       }
      
     }
   
     handleError(error,errorType){
       return(
         <ToastMessage error={error}  errorType = {errorType}/>
       )
     }

  render(){
    console.log('sendotpsssssssss',this.props);
    const {mobile , requesting,errorType,error} = this.props.visitor

    const {otp , message} = this.state
    if(requesting){
      return(
        <div className={"midContentPanel"}><Loader /></div>
      )
    }else{
      return(
          <div className={"midContentPanel"}>
                      <GwlLogo />
                     <section>
                         <p className={"otpText"}>Please enter OTP sent to - <strong>{mobile}</strong></p>
                         <div className={"mobBox"}>
                            <span className="phNo">{otp}</span>
                         </div>
                         <div className={"numberPad"}>
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
                            <li><Link onClick={(e) => this.handleSubmit(otp,e)} to="/entry_form"><button className="icon"><img src={require("../../images/tick.png")} alt=""/></button></Link></li>
                             </ul>
                         </div>

                         <div>
                          <span>{message}</span>
                           <span>{error ? this.handleError(error,errorType) :null}</span>
                         </div>
                     </section>
                 </div>
      )
    }
  } 
}

MobileOtp.propTypes = {
  sendOtp: PropTypes.func.isRequired,
};

function mapStateToProps (state)  {

 // console.log('mstp',state);

  return {
      visitor: state.visitor
  }
}

function mapDispatchToProps(dispatch) {
  return {
   sendOtp : (otp,token) => dispatch(sendOtpNumber(otp,token))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MobileOtp);
