//Actions trigering from Containers

import { 
  SEND_MOBILE_NUMBER_REQ,
  SEND_OTP_REQ,
  SEND_VISITOR_INFO_REQ,
  SEND_VISIT_PURPOSE_REQ,
  SEND_PURPOSE_DETAIL_REQ
 } from './constants';

export function sendMobileNumber(mobileNo) {

 // console.log('InsideActions',mobileNo);
  

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

export function sendVisitPurpose(visitPurpose,token) {


  return {
    type: SEND_VISIT_PURPOSE_REQ,
    payload: { token,visitPurpose},
  };
}

export function sendVisitPurposeDetails(token,f1,f2,f3,formId) {  //where f is field from all details form


  return {
    type: SEND_PURPOSE_DETAIL_REQ,
    payload: { token,f1,f2,f3,formId},
  };
}