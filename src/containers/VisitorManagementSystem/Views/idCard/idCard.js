import React,{Component} from 'react'
import { Loader } from '../../../../components/loader';

import { compose } from 'redux';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../vmsStyles.css';
import { Link } from 'react-router-dom';
import { ToastMessage } from '../../../ToastMessage/ToastMessage';
import axios from 'axios'
import { addNewVisitor } from '../../actions';
class IdCard extends Component{

  state = {
    messasge:'',
    visitorImgUrl:'',
    visitorSigUrl:'',
    visitorIDNo:'',
    mobileNumber:''
  }

  componentDidMount(){

    const {token} = this.props.visitor

    axios.post('https://vmsbe.goodworkscowork.com/visitor/card',{
      entry_token:token
    }).then((res) => {
      const {visitor_image,visitor_signature,visitor_ID_no,phone_no} = res.data.result

      this.setState({
        visitorImgUrl:visitor_image,
        visitorSigUrl:visitor_signature,
        visitorIDNo:visitor_ID_no,
        mobileNumber:phone_no
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

    window.close();
  }

  addNewVisitorHandler(){
    this.props.addNewVisitor()
  }
   
 
  render(){

    const {requesting,errorType,error,firstName,lastName,company,email,location,visitPurpose} = this.props.visitor
    const {messasge,visitorImgUrl,visitorSigUrl,mobileNumber} = this.state
    let visitTo
    visitPurpose === "Site Visit" ? visitTo = "/checklist" : visitTo = "/feedback"

    if (requesting) {
        return(
          <div className={"midContentPanel"}><Loader /></div>
        )
    } else {
      return(
        <div className={"midContentPanel"}>
		        <section className={"formUi"}>
                    <div className={"idCard"} id="printableArea">
                        <h2>Visitor : {mobileNumber}</h2>
                        <div className={"idCont"}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <img src={visitorImgUrl} alt="#" className={"idImg"} /> 
                                    <img src={visitorSigUrl} alt="" className="id-img no-bdr" />                          
                                </div>
                                <div className="col-sm-8">
                                    <p><span>{firstName} {lastName}</span></p>
                                    <p>{mobileNumber}</p>
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
                                <button onClick = {() => this.printId('printableArea')} className="btn-blue full"><i className="glyphicon glyphicon-print"></i> Print</button>
                            </div>
                            <div className="col-sm-6">
                                <Link to={`${visitTo}` }><button className="btn-green full">Next</button></Link>
                            </div>
                        </div>
                        <Link onClick = {() => this.addNewVisitorHandler()}to='/preEntry'><button className="btn-orange full">Add new visitor</button></Link>
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

 
   return {
       visitor: state.visitor
   }
 }

 function mapDispatchToProps(dispatch) {
  return {
  //  sendImage : (token,imageData,uploadType) => dispatch(sendImage(token,imageData,uploadType))
  addNewVisitor : () => dispatch(addNewVisitor())

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(IdCard);