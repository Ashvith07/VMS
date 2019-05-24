import React,{Component} from 'react'
import { Loader } from '../../../../components/loader';

import { compose } from 'redux';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../vmsStyles.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ToastMessage } from '../../../ToastMessage/ToastMessage';
import axios from 'axios'

class IdCard extends Component{

  state = {
    messasge:'',
    visitorImgUrl:'',
    visitorSigUrl:''
  }

  componentDidMount(){

    const {token} = this.props.visitor

    console.log('componentdidmount');
    axios.post('http://142.93.57.132/Goodworks-VMS-php/visitor/card',{
      entry_token:token
    }).then((res) => {
      console.log(res);
      const {visitor_image,visitor_signature} = res.data.result

      this.setState({
        visitorImgUrl:visitor_image,
        visitorSigUrl:visitor_signature
      })
      
    }).catch((err) => {
      console.log(err);
      
    })
  }

  static getDerivedStateFromProps(props){
    


    const {error ,requesting,view} = props.visitor
    if(error && !requesting && view === "idCard"){
      props.history.push(`/visit_terms_condition}`)     
    }

    return null
 }

  handleError(error,errorType){
    return(
      <ToastMessage error={error}  errorType = {errorType}/>
    )
  }

  printId(divName){
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }
   
 
  render(){

    const {requesting,errorType,error,firstName,lastName,company,email,location,mobile,visitPurpose} = this.props.visitor
    const {messasge,visitorImgUrl,visitorSigUrl} = this.state


    if (requesting) {
        return(
          <div className={"midContentPanel"}><Loader /></div>
        )
    } else {
      return(
        <div className={"midContentPanel"}>
		        <section className={"formUi"}>
                    <div className={"idCard"} id="printableArea">
                        <h2>Visitor</h2>
                        <div className={"idCont"}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <img src={visitorImgUrl} alt="#" className={"idImg"} /> 
                                    <img src={visitorSigUrl} alt="" class="id-img no-bdr" />                          
                                </div>
                                <div className="col-sm-8">
                                    <p><span>{firstName} {lastName}</span></p>
                                    <p>{mobile}</p>
                                    <p>{email}</p>
                                    <p>{company}</p>
                                    <p>{location}</p>
                                </div>
                            </div>
                        </div>
                        <div className={"idPurpose"}>
                            <p>
                                <span>Purpose of visit : </span>
                                <span><strong>{visitPurpose}</strong></span>
                            </p>
                            <p>
                                <span></span>
                                <span><strong>{company}</strong></span>
                            </p>
                        </div> 
                    </div>
                    <div className="row">
                          <div className="col-sm-6">
                                <button className="btn-blue full"><i className="glyphicon glyphicon-print"></i> Print</button>
                            </div>
                            <div className="col-sm-6">
                                <button className="btn-green full">Next</button>
                            </div>
                        </div>
                        <button className="btn-orange full">Add new visitor</button>
                    {/* <button onClick = {() => this.printId('printableArea')} className={classNames("btnGreen", "full")}><i className="glyphicon glyphicon-print"></i> Print</button>
                    <Link onClick={(e) => this.handleSubmit(e)} to="/idcard_generate"><button  className={classNames("btnGreen", "full")}>Next</button></Link> */}

                </section>

                    <div style={{ height : "30px", lineHeight : "30px"}}>
                     <span>{messasge}</span>
                   <span>{error ? this.handleError(error,errorType) :null}</span>
                   </div>          
		                </div>  
      )
      
    }
  }
}

function mapStateToProps (state)  {

  // console.log('mstp',state);
 
   return {
       visitor: state.visitor
   }
 }

 function mapDispatchToProps(dispatch) {
  return {
  //  sendImage : (token,imageData,uploadType) => dispatch(sendImage(token,imageData,uploadType))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(IdCard);