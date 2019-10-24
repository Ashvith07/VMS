import axios from 'axios';
import { baseUrl } from '../../utils/config';

export function sendMobile(mobile) {  

  return axios({
    method: "post",
    url: `${baseUrl}/visitor/mobile`,
    data: {
      phone_no: mobile,
    },
  
  });
}

export function getUserInfo(token) {  


  return axios({
    method: "post",
    url: `${baseUrl}/visitor/card`,
    data: {
      entry_token: token,
    },
  
  });
}

export function sendOtp(otp,token) {  

  return axios({
    method: "post",
    url: `${baseUrl}/visitor/otp`,
    data: {
      entry_token: token,
      otp:otp
    },
  
  });
}

export function sendVisitorId(visitorId) {  //here mobile number is identity of visitor

  return axios({
    method: "post",
    url: `${baseUrl}/visitor/check_feedback`,
    data: {
      mobile_no: visitorId,
    },
  
  });
}

export function sendVisitorInfo(token,firstName,lastName,location,companyName,email) {  

  return axios({
    method: "post",
    url: `${baseUrl}/visitor/entry`,
    data: {
      entry_token: token,
      first_name:firstName,
      last_name:lastName,
      company_name:companyName,
      location:location,
      email:email
    },
  
  });
}

export function sendVisitPurpose(visitPurpose,token,building,floor,wing) {  

  return axios({
    method: "post",
    url: `${baseUrl}/visitor/purpose`,
    data: {
      entry_token: token,
      purpose_of_visit:visitPurpose,
      building,
      floor,
      wing
    },
  
  });
}

export function sendImage(token,imageData,uploadType) {  


  return axios({
    method: "post",
    url: `${baseUrl}/visitor/upload_document`,
    data: {
      entry_token: token,
      image_name:imageData,
      upload_type:uploadType
    },
  
  });
}

export function sendCheckList(token,checklist) {  


  return axios({
    method: "post",
    url: `${baseUrl}/visitor/checklist`,
    data: {
      entry_token: token,
      checklist
    },
  
  });
}

export function sendFeedback(token,rating,suggestions) {  

  return axios({
    method: "post",
    url: `${baseUrl}/visitor/feedback`,
    data: {
      entry_token: token,
      how_was_your_visit:rating,
      any_suggestions:suggestions
    },
  
  });
}


export function sendPurposeDetail(token,f1,f2,f3,formId) {  

  if(formId === "SiteVisit"){

    return axios({
      method: "post",
      url: `${baseUrl}/visitor/purpose_visit`,
      data: {
        entry_token: token,
        your_requirements:f1,
        how_many_seaters:f2,
        where_did_you_come_to_know_about_us:f3
      },
    
    });

  }else if(formId === "meeting"){

    return axios({
      method: "post",
      url: `${baseUrl}/visitor/purpose_meeting`,
      data: {
        entry_token: token,
        contact_person:f1,
        which_company:f2,
        meeting_purpose:f3
      },
    
    });

  }else{
    return axios({
      method: "post",
      url: `${baseUrl}/visitor/purpose_event`,
      data: {
        entry_token: token,
        contact_person:f1,
        which_company:f2,
        about_event:f3
      },
    
    });
  }
  
}
