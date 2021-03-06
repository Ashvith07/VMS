//Actions trigering from Containers

import { 
  SEND_MOBILE_NUMBER_REQ,
  SEND_OTP_REQ,
  SEND_VISITOR_INFO_REQ,
  SEND_VISIT_PURPOSE_REQ,
  SEND_PURPOSE_DETAIL_REQ,
  SEND_POST_IMG_REQ,
  ADD_NEW_VISITOR,
  SEND_FEEDBACK_REQ,
  SEND_CHECKLIST_REQ,
  SEND_VISITOR_ID_REQ
 } from './constants';

export function sendMobileNumber(mobileNo) {

  

  return {
    type: SEND_MOBILE_NUMBER_REQ,
    payload: { mobile_no: mobileNo },
  };
}


export function sendOtpNumber(otp,token) {

  return {
    type: SEND_OTP_REQ,
    payload: { otp , token },
  };
}


export function sendVisitorInfo(token,firstName,lastName,location,companyName,email) {


  return {
    type: SEND_VISITOR_INFO_REQ,
    payload: { token,firstName,lastName,location,companyName,email},
  };
}

export function sendVisitPurpose(visitPurpose,token,building,floor,wing) {


  return {
    type: SEND_VISIT_PURPOSE_REQ,
    payload: { token,visitPurpose,building,floor,wing},
  };
}

export function sendVisitPurposeDetails(token,f1,f2,f3,formId) {  //where f is field from all details form


  return {
    type: SEND_PURPOSE_DETAIL_REQ,
    payload: { token,f1,f2,f3,formId},
  };
}


export function sendImage(token,imageData,uploadType) {  //where f is field from all details form

  return {
    type: SEND_POST_IMG_REQ,
    payload: {token,imageData,uploadType},
  };
}

export function addNewVisitor(){
  return{
    type:ADD_NEW_VISITOR
  }
}

export function sendFeedback(token,rating,suggestions){
  return{
    type:SEND_FEEDBACK_REQ,
    payload:{token,rating,suggestions}
  }
}

export function sendCheckList(token,checklist){
  return{
    type:SEND_CHECKLIST_REQ,
    payload:{token,checklist}
  }
}

export function sendVisitorId(mobile){  //here mobile number is identity of visitor
  return{
    type:SEND_VISITOR_ID_REQ,
    payload:{mobile}
  }
}