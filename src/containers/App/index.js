/**
 *
 * App.js
 *
\
/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { BrowserRouter,Switch, Route,Link } from 'react-router-dom';
import classNames from 'classnames';
import './App.css'
import MobileEntry from '../VisitorManagementSystem/Views/mobileEntry/mobileEntry';
import MobileOtp from '../VisitorManagementSystem/Views/mobileOtp/mobileOtp';
import VisitorEntryForm from '../VisitorManagementSystem/Views/visitorEntryForm/visitorEntryForm';
import VisitPurposeForm from '../VisitorManagementSystem/Views/visitPurposeForm/visitPurposeForm';
import Event from '../VisitorManagementSystem/Views/visitPurposeDetail/event';
import Meeting from '../VisitorManagementSystem/Views/visitPurposeDetail/meeting';
import SiteVisit from '../VisitorManagementSystem/Views/visitPurposeDetail/siteVisit';
import PhotoCapture from '../VisitorManagementSystem/Views/photoCapture/photoCapture';
import Terms from '../VisitorManagementSystem/Views/terms/terms';
import IdCard from '../VisitorManagementSystem/Views/idCard/idCard';
import FeedbackForm from '../VisitorManagementSystem/Views/feedbackForm/feedbackForm';
import Checklist from '../VisitorManagementSystem/Views/checkList/checkList';
import PreEntry from '../VisitorManagementSystem/Views/preEntry/preEntry';

import ContactUs from '../../components/contactUs';
import GeneralTermsConditions from '../../components/generalTermsConditions';
import About from '../../components/about';

export default function App() {
  const currentPath = window.location.pathname;

//  console.log('cp',currentPath);
  

  return (

    <div className="app">
      <div className="siteWrapper" >
        <div className="siteWrapperInner">
          <div className={classNames("coverContainer", 'marginTopLandingPages')} >
            <div className={classNames("masthead", 'clearfix')} > 
              <div className="inner">
                <div className="headInner">
                  {/* <Link to="/">
                    <h3 className={styles.mastheadBrand}>
                      <img className="mb-4" src="../../src/images/GoodWorks_CoWork-logo-sq.png" alt="" width="60" height="60" />
                    </h3>
                  </Link> */}
                  <nav>
                    <ul className={classNames('nav', "mastheadNav")}>
                      <li className={(currentPath === '/') ? "active" : ''}>
                        <Link to="/" >New Visitor</Link>
                      </li>
                      <li className={(currentPath === '/about_us') ? "active" : ''}>
                        <Link to="/about_us" >About Us</Link>
                      </li>
                      <li className={(currentPath === '/terms_condition') ? "active" : ''}>
                        <Link to="/terms_condition" >Terms &amp; Conditions</Link>
                      </li>
                      <li className={(currentPath === '/contact_us') ? "active" : ''}>
                        <Link to="/contact_us" >Contact Us</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/mobile_entry" component={MobileEntry} />
        <Route exact path="/visitor_otp" component={MobileOtp} />
        <Route exact path="/entry_form" component={VisitorEntryForm} />
        <Route exact path="/visit_purpose" component={VisitPurposeForm} />
        <Route exact path="/photo_capture" component={PhotoCapture} />

        <Route extact path="/purposeDetail/Event" component={Event} />
        <Route extact path="/purposeDetail/Meeting" component={Meeting} />
        <Route extact path="/purposeDetail/SiteVisit" component={SiteVisit} />

         <Route extact path="/visit_terms_condition" component={Terms} />
         <Route extact path="/idcard_generate" component={IdCard} />
         <Route extact path="/feedback" component={FeedbackForm} />
         <Route extact path="/checklist" component={Checklist} />

          <Route extact path="/" component={PreEntry} />

          <Route exact path="/about_us" component={About} />
          <Route exact path="/terms_condition" component={GeneralTermsConditions} />
          <Route exact path="/contact_us" component={ContactUs} />
         


      </Switch>
    </BrowserRouter>
            <div className="mastfoot">
              <div className="inner">
                <p>
                  All Rights Reserved. © <a href="https://www.goodworkscowork.com/" target="_blank" rel="noopener noreferrer" className="footerLink"> GoodWorks Spaces Pvt. Ltd.</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <GlobalStyle /> */}
    </div>
  );
}
