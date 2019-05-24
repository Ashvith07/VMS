/*
 *
 * VisitorManagementSystem reducer
 *
 */
import produce from 'immer';
import { 
  SEND_MOBILE_NUMBER_REQ,
  SEND_MOBILE_NUMBER_SUCCESS,
  HANDLE_FAILURE,
  SEND_OTP_SUCCESS,
  SEND_OTP_REQ,
  SEND_VISITOR_INFO_REQ,
  SEND_VISITOR_INFO_SUCCESS,
  SEND_VISIT_PURPOSE_REQ,
  SEND_VISIT_PURPOSE_SUCCESS,
  SEND_PURPOSE_DETAIL_REQ,
  SEND_PURPOSE_DETAIL_SUCCESS,
  SEND_POST_IMG_SUCCESS,
  SEND_POST_IMG_REQ
 } from './constants';
export const initialState = {
  mobile: " ",
  requesting: false,
  error:false,
  token:'',
  is_recurring:false,
  view:"",

  firstName:'',
  lastName:'',
  email:'',
  location:'',
  company:'',

  visitPurpose:'',
  visitDetailPage:''
};

/* eslint-disable default-case, no-param-reassign */
const visitorManagementSystemReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
  console.log('actionssssssss', action)
    switch (action.type) {
      case SEND_MOBILE_NUMBER_REQ:
        return {
          ...state,
          requesting: true,
        //  error:false
        };

      case SEND_MOBILE_NUMBER_SUCCESS:
        return {
          ...state,
          requesting: false,
          error:false,
          mobile:action.mobile,
          token:action.token
        };

      case HANDLE_FAILURE:
        return {
          ...state,
          mobile: " ",
          requesting: false,
          error:true,
          errorType:action.errorType,
          view:action.navigateTo,
          visitDetailPage:action.formId
        };

      case SEND_OTP_REQ:
        return{
          ...state,
          requesting:true
        };

      case SEND_OTP_SUCCESS:
        return{
          ...state,
          is_recurring:action.is_recurring,
          requesting: false,
          error:false,
          firstName:action.first_name,
          lastName:action.last_name,
          location:action.location,
          email:action.email,
          company:action.company_name
        }

      case SEND_VISITOR_INFO_REQ:
        return{
          ...state,
          requesting:true
        };

      case SEND_VISITOR_INFO_SUCCESS:
        return{
          ...state,
          firstName:action.first_name,
          lastName:action.last_name,
          company:action.company_name,
          location:action.location,
          email:action.email,
          requesting: false,
          error:false,
        }


      case SEND_VISIT_PURPOSE_REQ:
        return{
          ...state,
          requesting:true
        };

      case SEND_VISIT_PURPOSE_SUCCESS:
        return{
          ...state,
          requesting: false,
          error:false,
          visitPurpose:action.visitPurpose
        }

      case SEND_PURPOSE_DETAIL_REQ:
        return{
          ...state,
          requesting:true,
        };

      case SEND_PURPOSE_DETAIL_SUCCESS:
        return{
          ...state,
          requesting: false,
          error:false,
        }

      case SEND_POST_IMG_REQ:
        return{
          ...state,
          requesting: true,
        }

      case SEND_POST_IMG_SUCCESS:
        return{
          ...state,
          requesting: false,
          error:false,
        }
  
      default:
        return state;
    }
  });

export default visitorManagementSystemReducer;
