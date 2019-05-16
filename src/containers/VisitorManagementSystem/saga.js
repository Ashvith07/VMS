// import { take, call, put, select } from 'redux-saga/effects';
import { call, takeLatest, put } from 'redux-saga/effects';
//import { push } from 'react-router-dom'
//import axios from 'axios';
import { 
  SEND_MOBILE_NUMBER_REQ,
  SEND_MOBILE_NUMBER_SUCCESS,
  HANDLE_FAILURE,
  SEND_OTP_REQ,
  SEND_OTP_SUCCESS,
  SEND_VISITOR_INFO_REQ,
  SEND_VISITOR_INFO_SUCCESS,
  SEND_VISIT_PURPOSE_REQ,
  SEND_VISIT_PURPOSE_SUCCESS,
  SEND_PURPOSE_DETAIL_REQ,
  SEND_PURPOSE_DETAIL_SUCCESS
 } from './constants';
//import { SendMobile } from '../VisitorManagementSystem/api';
import * as api from './api';

function* sendMobile(action) {

//  console.log('pay',action.payload);
const response = yield call(() => api.sendMobile(action.payload.mobile_no));
const navigateTo = "otp"
console.log(response);

  if(response.data.error_flag === "false"){
    const mobile = response.data.result.phone_no;
    const token = response.data.result.entry_token 
    yield put({type:SEND_MOBILE_NUMBER_SUCCESS, mobile,token})
  }else{
    const error = response.data.error_flag;
    const errorType = response.data.message 
    yield put({ type: HANDLE_FAILURE, error,errorType,navigateTo });
  }
}


function* sendOtp(action) {

  const {otp,token} = action.payload
  //  console.log('pay',action.payload);
  const response = yield call(() => api.sendOtp(otp,token));
  const navigateTo = "entryForm"
  console.log('ooooooooooooooooooo',response);
    if(response.data.error_flag === "false"){
      const is_recurring = response.data.result.is_recurring;

      if (is_recurring === "true") {
        const token = response.data.result.entry_token
        const userInfo = yield call(() => api.getUserInfo(token));

        const {company_name, email,first_name,last_name,location} = userInfo.data.result
        console.log(response);

        yield put({type:SEND_OTP_SUCCESS,is_recurring,first_name,last_name,company_name,location,email})
      }else{
        const first_name = ''
        const last_name = ''
        const company_name = ""
        const location = ""
        const email = ""
        yield put({type:SEND_OTP_SUCCESS,is_recurring,first_name,last_name,company_name,location,email})
      }

     
    }else{
      console.log('error');
      

      const error = response.data.error_flag;
      const errorType = response.data.message 
      yield put({ type: HANDLE_FAILURE, error,errorType,navigateTo });
    }
  }


  function* sendVisitorInfo(action) {

    const {token,firstName,lastName,location,companyName,email} = action.payload
    //  console.log('pay',action.payload);
    const response = yield call(() => api.sendVisitorInfo(token,firstName,lastName,location,companyName,email));
    const navigateTo = "visitPurpose"
    console.log('ooooooooooooooooooo',response);
      if(response.data.error_flag === "false"){
        const {first_name,last_name} = response.data.result;
        yield put({type:SEND_VISITOR_INFO_SUCCESS,first_name,last_name})
      }else{
        console.log('error');
        
  
        const error = response.data.error_flag;
        const errorType = response.data.message 
        yield put({ type: HANDLE_FAILURE, error,errorType,navigateTo });
      }
    }


    function* sendVisitPurpose(action) {

      const {visitPurpose,token} = action.payload
      //  console.log('pay',action.payload);
      const response = yield call(() => api.sendVisitPurpose(visitPurpose,token));
      const navigateTo = "purposeDetail"
        if(response.data.error_flag === "false"){
          yield put({type:SEND_VISIT_PURPOSE_SUCCESS,visitPurpose})
        }else{
          console.log('error');
          const error = response.data.error_flag;
          const errorType = response.data.message 
          yield put({ type: HANDLE_FAILURE, error,errorType,navigateTo });
        }
      }   
      
      function* sendPurposeDetail(action) {

        const {token,f1,f2,f3,formId} = action.payload
        //  console.log('pay',action.payload);
        const response = yield call(() => api.sendPurposeDetail(token,f1,f2,f3,formId));
        const navigateTo = "capturePhoto"
          if(response.data.error_flag === "false"){
            yield put({type:SEND_PURPOSE_DETAIL_SUCCESS})
          }else{
            console.log('error');
            const error = response.data.error_flag;
            const errorType = response.data.message 
            yield put({ type: HANDLE_FAILURE, error,errorType,navigateTo,formId });
          }
        }    

export default function* visitorManagementSystemSaga() {

  yield takeLatest(SEND_MOBILE_NUMBER_REQ, sendMobile);
  yield takeLatest(SEND_OTP_REQ, sendOtp);
  yield takeLatest(SEND_VISITOR_INFO_REQ,sendVisitorInfo)
  yield takeLatest(SEND_VISIT_PURPOSE_REQ,sendVisitPurpose)
  yield takeLatest(SEND_PURPOSE_DETAIL_REQ,sendPurposeDetail)


}