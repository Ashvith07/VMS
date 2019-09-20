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

import Logo from '../../images/Coworks_logo_black.svg';

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

  // printId(divName){
  //   var printContents = document.getElementById(divName).innerHTML;
  //   var originalContents = document.body.innerHTML;

  //   document.body.innerHTML = printContents;

  //   window.print();

  //   document.body.innerHTML = originalContents;

  //   window.close();
  // }

  printId() {
    let printContents, popupWin;
    printContents = document.getElementById('printableArea').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <style>

        @media print{
        .idCont {
          padding: 15px;
          background: #dddddd !important;
          -webkit-print-color-adjust: exact !important;
          width:50%;
      }
    }
  .idCard{
    border-radius: 10px;
    /* background: #fff url(../images/cowork-logo.png) 98% 0% no-repeat;*/
    // background-size: 50%; 
    color: #333;
}
.idhead{
  background: #ffffff;
  padding: 10px 5px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  display: grid;
    grid-template-columns: 36% auto;
}
.idCard p{
    margin-bottom: 5px;
    font-size: 15px;
    word-wrap: break-word;
}

.idCard p span{font-weight: bold;}
.idImg{
    border-radius: 10px;
    max-width: 100%;
    margin-bottom: 15px;
    height:100px;
    text-align:center;
}
.idCard > h2{
    padding: 15px;
    margin: 0;
    font-size: 13px !important;
    // font-weight: bold;
    text-transform: uppercase;
    // background: #fff url(./images/Coworks_logo_black.svg) 94% 50% no-repeat;
    background-size: 90px;
    color: #333;
    border-radius: 10px 10px 0 0;
    border-bottom: rgba(0, 0, 0, .2) 1px solid;
}
.htext{
  font-size:15px !important;
}
.idCont{
  padding: 15px;
  background:#dddddd;
}
.idPurpose{
    // border-top: rgba(0, 0, 0, .2) 1px solid;
    padding: 7px 15px;
    background: #fff;
    border-radius: 0 0 15px 15px;
}
.idPurpose p{
    font-size: 12px;
    margin-bottom: 0;
    display: grid;
    grid-template-columns: 12% auto;
}
.idPurpose p span{font-weight: normal;}

.imageCheckbox input[type=radio] {display:none;}
.imageCheckbox input[type=radio] + label{
    background: url(./images/check-deselected.png) no-repeat 0 0;
    height: 40px;
    width: 19px;
    display:inline-block;
  line-height:40px;
  padding-left:15px;
    vertical-align: middle;
    background: rgba(0, 0, 0, .2);
    border: rgba(255, 255, 255, .5) 1px solid;
    color: rgba(255, 255, 255, .5);
    font-size: 14px;
    cursor: pointer;
    width: 100%;
}
          
        </style>
        </head>
        <style>

        </style>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
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
                      <div className={"idhead"}>
                        <span className={"htext"}>Visitor : {mobileNumber}</span>
                        <img src={Logo} alt="logo" style={{    height: '22px',
    float: 'right',
    padding: '0px'}} />
                      </div>
                        <div className={"idCont"}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <img src={visitorImgUrl} alt="#" className={"idImg"} />
                                     <br/>
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