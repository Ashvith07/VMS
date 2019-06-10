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
  SEND_PURPOSE_DETAIL_SUCCESS,
  SEND_POST_IMG_REQ,
  SEND_POST_IMG_SUCCESS,
  SEND_FEEDBACK_REQ,
  SEND_FEEDBACK_SUCCESS,
  SEND_CHECKLIST_REQ,
  SEND_CHECKLIST_SUCCESS,
  SEND_VISITOR_ID_REQ,
  SEND_VISITOR_ID_SUCCESS
 } from './constants';
//import { SendMobile } from '../VisitorManagementSystem/api';
import * as api from './api';

function* sendMobile(action) {

const response = yield call(() => api.sendMobile(action.payload.mobile_no));
const navigateTo = "otp"

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
  const response = yield call(() => api.sendOtp(otp,token));
  const navigateTo = "entryForm"
    if(response.data.error_flag === "false"){
      const is_recurring = response.data.result.is_recurring;

      if (is_recurring === "true") {
        const token = response.data.result.entry_token
        const userInfo = yield call(() => api.getUserInfo(token));

        const {company_name, email,first_name,last_name,location} = userInfo.data.result

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
      

      const error = response.data.error_flag;
      const errorType = response.data.message 
      yield put({ type: HANDLE_FAILURE, error,errorType,navigateTo });
    }
  }


  function* sendVisitorInfo(action) {

    const {token,firstName,lastName,location,companyName,email} = action.payload
    const response = yield call(() => api.sendVisitorInfo(token,firstName,lastName,location,companyName,email));
    const navigateTo = "visitPurpose"
      if(response.data.error_flag === "false"){
        const {first_name,last_name,company_name,location,email} = response.data.result;
        yield put({type:SEND_VISITOR_INFO_SUCCESS,first_name,last_name,company_name,location,email})
      }else{
        
  
        const error = response.data.error_flag;
        const errorType = response.data.message 
        yield put({ type: HANDLE_FAILURE, error,errorType,navigateTo });
      }
    }


    function* sendVisitPurpose(action) {

      const {visitPurpose,token,building,floor,wing} = action.payload
      const response = yield call(() => api.sendVisitPurpose(visitPurpose,token,building,floor,wing));
      const navigateTo = "purposeDetail"
        if(response.data.error_flag === "false"){
          yield put({type:SEND_VISIT_PURPOSE_SUCCESS,visitPurpose})
        }else{
          const error = response.data.error_flag;
          const errorType = response.data.message 
          yield put({ type: HANDLE_FAILURE, error,errorType,navigateTo });
        }
      }   
      
      function* sendPurposeDetail(action) {

        const {token,f1,f2,f3,formId} = action.payload
        const response = yield call(() => api.sendPurposeDetail(token,f1,f2,f3,formId));
        const navigateTo = "capturePhoto"
          if(response.data.error_flag === "false"){
            yield put({type:SEND_PURPOSE_DETAIL_SUCCESS})
          }else{
            const error = response.data.error_flag;
            const errorType = response.data.message 
            yield put({ type: HANDLE_FAILURE, error,errorType,navigateTo,formId });
          }
        }   
        
        
        function* sendImage(action) {

          const {token,imageData,uploadType} = action.payload
          let navigateTo
          if(uploadType === "userPhoto"){
            navigateTo = "termsForm"
          }else{
            navigateTo = "idCard"
          }
          const response = yield call(() => api.sendImage(token,imageData,uploadType));
        //  const navigateTo = "termsForm"
            if(response.data.error_flag === "false"){
              yield put({type:SEND_POST_IMG_SUCCESS})
            }else{
              const error = response.data.error_flag;
              const errorType = response.data.message 
              yield put({ type: HANDLE_FAILURE, error,errorType,navigateTo });
            }
          } 

          function* sendFeedback(action) {

            const {token,rating,suggestions} = action.payload
            let navigateTo = "preEntry"
           
            const response = yield call(() => api.sendFeedback(token,rating,suggestions));
          //  const navigateTo = "termsForm"
              if(response.data.error_flag === "false"){
                yield put({type:SEND_FEEDBACK_SUCCESS})
              }else{
                const error = response.data.error_flag;
                const errorType = response.data.message 
                yield put({ type: HANDLE_FAILURE, error,errorType,navigateTo });
              }
            } 


          function* sendCheckList(action) {

          //  const {token,checklist} = action.payload
         //   let navigateTo = "feedback"
           
        //    const response = yield call(() => api.sendCheckList(token,checklist));
          //  const navigateTo = "termsForm"
          //    if(response.data.error_flag === "false"){
                yield put({type:SEND_CHECKLIST_SUCCESS})
            //  }else{
            //    const error = response.data.error_flag;
            //    const errorType = response.data.message 
            //    yield put({ type: HANDLE_FAILURE, error,errorType,navigateTo });
            //  }
            } 

            function* sendVisitorId(action) { //here mobile number is identity of visitor

              debugger
              const {mobile} = action.payload
              let navigateTo = "feedback"
             
              const response = yield call(() => api.sendVisitorId(mobile));
             
            //  const navigateTo = "termsForm"
                if(response.data.error_flag === "false"){
                  const {entry_token,visitor_ID_no,phone_no} = response.data.result
                  
                  yield put({type:SEND_VISITOR_ID_SUCCESS,entry_token,visitor_ID_no,phone_no})
                }else{
                  const error = response.data.error_flag;
                  const errorType = response.data.message 
                  yield put({ type: HANDLE_FAILURE, error,errorType,navigateTo });
                }
              } 

export default function* visitorManagementSystemSaga() {

  yield takeLatest(SEND_MOBILE_NUMBER_REQ, sendMobile);
  yield takeLatest(SEND_OTP_REQ, sendOtp);
  yield takeLatest(SEND_VISITOR_INFO_REQ,sendVisitorInfo)
  yield takeLatest(SEND_VISIT_PURPOSE_REQ,sendVisitPurpose)
  yield takeLatest(SEND_PURPOSE_DETAIL_REQ,sendPurposeDetail)
  yield takeLatest(SEND_POST_IMG_REQ,sendImage)
  yield takeLatest(SEND_FEEDBACK_REQ,sendFeedback)
  yield takeLatest(SEND_CHECKLIST_REQ,sendCheckList)
  yield takeLatest(SEND_VISITOR_ID_REQ,sendVisitorId)


}