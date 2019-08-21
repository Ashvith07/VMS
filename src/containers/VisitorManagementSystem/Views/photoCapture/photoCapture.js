import React,{Component} from 'react'
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../vmsStyles.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ToastMessage } from '../../../ToastMessage/ToastMessage';
import { Loader } from '../../../../components/loader';
import Webcam from "react-webcam";
import { VisitorImage } from '../../../../components/visitorImage';
import { sendImage } from '../../actions';

class PhotoCapture extends Component{

  state = {
    message:'',
    captureImage:true,
    imageData:'',
    captureDisabled:false,
    retryDisabled:true,
    captureBtnOpacity:'1',
    retryBtnOpacity:'0.7'
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

 setRef = webcam => {
  this.webcam = webcam;
  };

  capture = () => {
  const imageSrc = this.webcam.getScreenshot();

  this.setState({
    imageData:imageSrc,
    captureImage:false,
    captureDisabled : true,
    retryDisabled:false,
    captureBtnOpacity:'0.7',
    retryBtnOpacity:'1',
    message:"Retry if your image is unclear"

  })

   // this.fetchUserPhoto()
  
  };

  handleRetry = () => {
    
    this.setState({
      imageData:'',
      captureImage:true,
      retryDisabled : true,
      captureDisabled:false,
      captureBtnOpacity:'1',
      retryBtnOpacity:'0.7',
      message:""

    })
  }

  handleSubmit(e){
    const {token} = this.props.visitor
    const imageData = this.state.imageData
    const uploadType = "photo"

    if (imageData !== "" && token) {
      this.props.sendImage(token,imageData,uploadType)

    }else{

      this.setState({
        message:'Please capture image'
      })
      e.preventDefault()
    }
  }

  render(){

    const videoConstraints = {
      width: 300,
      height: 300,
      facingMode: "user"
    };

    const {requesting,errorType,error} = this.props.visitor
    const {message,captureImage,imageData,retryDisabled,captureDisabled,captureBtnOpacity,retryBtnOpacity} = this.state

   // {btnDisabled ? btnStyle = {opacity : '0.7'} : styles = {backGroundColor : '1'} }
    if (requesting) {
      return(
        <div className={"midContentPanel"}><Loader /></div>
      )
    } else {
      return(
        <div className={"midContentPanel"}>

        <section className={"formUi"}>
                <div className={"captureImage"}>
                {captureImage ? <Webcam
                  audio={false}
                  height={300}
                  ref={this.setRef}
                  screenshotFormat="image/jpeg"
                  width={300}
                  videoConstraints={videoConstraints}
                /> :  <VisitorImage 
                      imageData = {imageData}
                      />
              }
                
                </div>

                
                <button   style = {{opacity: captureBtnOpacity}} disabled = {captureDisabled} onClick={this.capture}  className={classNames("btnGreen", "full")}><i className={classNames("glyphicon", "glyphiconCamera")}></i> Capture</button>
                <button  style = {{opacity: retryBtnOpacity}}  disabled = {retryDisabled} onClick={this.handleRetry}  className={classNames("btnGreen", "full")}><i className={classNames("glyphicon", "glyphiconCamera")}></i> Retry</button>
                <Link onClick = {(e) => this.handleSubmit(e)} to="/visit_terms_condition"><button className={classNames("btnGreen", "full")}><i className={classNames("glyphicon", "glyphiconCamera")}></i> Next</button></Link>
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


PhotoCapture.propTypes = {
 sendImage: PropTypes.func.isRequired,
};

function mapStateToProps (state)  {

 
   return {
       visitor: state.visitor
   }
 }

 function mapDispatchToProps(dispatch) {
  return {
    sendImage : (token,imageData,uploadType) => dispatch(sendImage(token,imageData,uploadType))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PhotoCapture);