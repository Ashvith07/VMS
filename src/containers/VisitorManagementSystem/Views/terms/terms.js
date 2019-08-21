import React,{Component} from 'react'
import { Loader } from '../../../../components/loader';
import { GwlLogo } from '../../../../components/gwlLogo';

import { compose } from 'redux';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../vmsStyles.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ToastMessage } from '../../../ToastMessage/ToastMessage';
import SignatureCanvas from 'react-signature-canvas'
import { sendImage } from '../../actions';


class Terms extends Component{
  
  state = {
    message:'',
    signatureData:null,
    isChecked : false,
    nextDisabled:true,
    nxtBtnOpacity:'0.7'
  //  btnDisable:true
  }
  sigPad = {}

  

  static getDerivedStateFromProps(props){
    


    const {error ,requesting,view} = props.visitor
    if(error && !requesting && view === "termsForm"){
      props.history.push(`/photo_capture}`)     
    }

    return null
 }

 handleError(error,errorType){
   return(
     <ToastMessage error={error}  errorType = {errorType}/>
   )
 }

  clear = () => {
  this.sigPad.clear()
  this.setState({
    signatureData: '',
   // btnDisable:false,
    message:'',
    nextDisabled:true,
    nxtBtnOpacity:'0.7',
    isChecked:false
  })
  }



  handleCheck(){
    const {isChecked} = this.state
   

    

    if(isChecked){
      this.setState({
            nextDisabled:true,
            nxtBtnOpacity:'0.7',
            isChecked:!this.state.isChecked,
          })
    }else{
      const isBox =this.sigPad.isEmpty()

      if(isBox){
        this.setState({
          signatureData: '',
            isChecked:!this.state.isChecked,
            nextDisabled:false,
            nxtBtnOpacity:'1',
        })
      }else{
        this.setState({
          signatureData: this.sigPad.getTrimmedCanvas()
          .toDataURL('image/jpg'),
          isChecked:!this.state.isChecked,
          nextDisabled:false,
          nxtBtnOpacity:'1',
        })
      }
    }   
  }

  handleSubmit(e){
    const {token} = this.props.visitor
    const {signatureData,isChecked} = this.state
    const uploadType = "signature"


    if (signatureData !== "" && isChecked && token) {
      this.props.sendImage(token,signatureData,uploadType)
    }else{
      this.setState({
        message:'Signature is mandatory,Please sign on the white box'
      })
      e.preventDefault()
    }
 
    
  }

  render(){
    const {message,isChecked,nextDisabled,nxtBtnOpacity} = this.state
    const {requesting,errorType,error} = this.props.visitor

      if(requesting){
        return(
          <div className={"midContentPanel"}><Loader /></div>
        )
      }else{
        return(
<div className={"midContentPanel"}>
        <GwlLogo />
        <section className={"formUi"}>
                <div className={"terms"}>
                    <ul>
                        <li><span>1</span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li><span>2</span>Maecenas hendrerit risus in ornare mollis.</li>
                        <li><span>3</span>Mauris tempor dui vel ipsum eleifend, ut sodales ex feugiat.</li>
                        <li><span>4</span>Phasellus varius orci id bibendum varius.</li>
                        <li><span>5</span>Mauris eleifend ex et mi porttitor vulputate.</li>
                        <li><span>6</span>Nullam vulputate orci eu quam aliquet, non condimentum velit consequat.</li>
                        <li><span>7</span>Pellentesque in nisl nec risus mattis posuere.</li>
                        <li><span>8</span>Nunc tempor dui sit amet sagittis interdum.</li>
                        <li><span>9</span>Pellentesque sollicitudin urna sit amet justo mattis, quis scelerisque tortor luctus.</li>
                    </ul>
                    <div className={"signature"}>
                    <SignatureCanvas 
                     penColor='black'
                     canvasProps={{width: 302,
                     height: 102,
                     className: 'sigCanvas'}} 
                     ref={(ref) => { this.sigPad = ref }}
                     />
                    </div>
                    <label>
                        <div className={"imageCheckbox"}>
                            <input id="terms-accept" name="filter-buy-lease" type="checkbox" value="terms" checked={isChecked} onChange = {() => this.handleCheck()}/>
                            <label htmlFor="terms-accept"></label>
                            <span>I accept terms and condition </span>
                        </div>
                    </label>  
                </div>
                <button onClick={this.clear} className={classNames("btnGreen", "full")}>Clear</button>
                <Link onClick={(e) => this.handleSubmit(e)} to="/idcard_generate"><button style= {{opacity:nxtBtnOpacity}} disabled={nextDisabled} className={classNames("btnGreen", "full")}>Next</button></Link>
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

Terms.propTypes = {
  // sendImage: PropTypes.func.isRequired,
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

export default compose(withConnect)(Terms);