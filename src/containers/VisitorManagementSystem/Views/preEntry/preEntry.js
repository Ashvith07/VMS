import React,{Component} from 'react'
import { Loader } from '../../../../components/loader';

import { compose } from 'redux';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../vmsStyles.css';
import { Link } from 'react-router-dom';
import { ToastMessage } from '../../../ToastMessage/ToastMessage';
import { GwlLogo } from '../../../../components/gwlLogo';
import VisitorNoDialog from '../../../VisitorNoDIalog/VisitorNoDialog';
// import { VisitorNoDialog } from '../../../VisitorNoDIalog/VisitorNoDialog';

class PreEntry extends Component{

 // snackbarRef = React.createRef();

  // _showSnackbarHandler = () => {
  //  // e.preventDefault();
  //   this.snackbarRef.current.openSnackBar();
  // }
  static getDerivedStateFromProps(props){
  
    const {error ,requesting,view} = props.visitor
    if(error && !requesting && view === "preEntry"){
      props.history.push(`/feedback`)
    }

    return null
 }

  state={
    isActive : false
  }

  openSnackBar(){
    this.setState({
       isActive:true
    })
  }


  closeSnackBar(){
    this.setState({
      isActive:false
    })
  }

  handleError(error,errorType){
    return(
      <ToastMessage error={error}  errorType = {errorType}/>
    )
  }

  
  render(){
    const {isActive} = this.state
    const {requesting,error,errorType} = this.props.visitor

    if(requesting){
      return(
        <div className={"midContentPanel"}><Loader /></div>
      )
    }else{
      return(
        <div className="midContentPanel">
        <GwlLogo />
        <section className="formUi">
            <Link to="/mobile_entry" ><button className="btn-green full">New Visitor</button></Link>
            <button onClick = {() => this.openSnackBar()} className="btn-outline full">Visitor's FEEDBACK</button>
            <VisitorNoDialog  
            isActive={isActive}
            closeSnack = {() => this.closeSnackBar()}
            />
        </section>

          <div style={{ height : "30px", lineHeight : "30px"}}>
                    {/* <span>{message}</span> */}
            <span>{error ? this.handleError(error,errorType) :null}</span>
          </div>
        </div>
      )
    }
    
      
  }
}


PreEntry.propTypes = {
 // sendVisitPurposeDetails: PropTypes.func.isRequired,
};

function mapStateToProps (state)  {

 
   return {
       visitor: state.visitor
   }
 }

//  function mapDispatchToProps(dispatch) {
//   return {
//    // sendVisitPurposeDetails : (token,requirements,seats,aboutUs,formId) => dispatch(sendVisitPurposeDetails(token,requirements,seats,aboutUs,formId))
//   };
// }

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(PreEntry);
