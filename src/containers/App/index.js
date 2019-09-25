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

import React,{Component} from 'react';
import { HashRouter,Switch, Route,Link } from 'react-router-dom';
import classNames from 'classnames';
import './App.css'
import MobileEntry from '../VisitorManagementSystem/Views/mobileEntry/mobileEntry';
import MobileOtp from '../VisitorManagementSystem/Views/mobileOtp/mobileOtp';
import VisitorEntryForm from '../VisitorManagementSystem/Views/visitorEntryForm/visitorEntryForm';
import VisitPurposeForm from '../VisitorManagementSystem/Views/visitPurposeForm/visitPurposeForm';
import Events from '../VisitorManagementSystem/Views/visitPurposeDetail/event';
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

class  App extends Component {


    componentDidMount(){
      document.title = "VMS - GoodWork CoWork"
    }


    render(){
      const currentPath = window.location.pathname;

      return (
        <HashRouter>

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
                          <li className={(currentPath === '/aboutUs') ? "active" : ''}>
                            {/* <Link to="/aboutUs" >About Us</Link> */}
                            <a href = "https://www.goodworkscowork.com" target = "blank">About Us</a>
                          </li>
                          {/* <li className={(currentPath === '/termsCondition') ? "active" : ''}>
                            <Link to="/termsCondition" >Terms &amp; Conditions</Link>
                          </li> */}
                          <li className={(currentPath === '/contactUs') ? "active" : ''}>
                            <Link to="/contactUs" >Contact Us</Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
          <Switch>
            <Route path="/mobile_entry" component={MobileEntry} />
            <Route path="/visitor_otp" component={MobileOtp} />
            <Route path="/entry_form" component={VisitorEntryForm} />
            <Route path="/visit_purpose" component={VisitPurposeForm} />
            <Route path="/photo_capture" component={PhotoCapture} />

            <Route path="/purposeDetail/Event" component={Events} />
            <Route path="/purposeDetail/Meeting" component={Meeting} />
            <Route path="/purposeDetail/Site Visit" component={SiteVisit} />

            <Route path="/visit_terms_condition" component={Terms} />
            <Route path="/idcard_generate" component={IdCard} />
            <Route path="/feedback" component={FeedbackForm} />
            <Route path="/checklist" component={Checklist} />



            <Route path="/aboutUs" component={About} />
            <Route path="/termsCondition" component={GeneralTermsConditions} />
            <Route path="/contactUs" component={ContactUs} />

            <Route extact path="/" component={PreEntry} />



          </Switch>

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
        </HashRouter>
      );
    }
    }




export default App
