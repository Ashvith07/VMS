import React, { Component } from 'react'
import { Loader } from '../../../../components/loader';
import { GwlLogo } from '../../../../components/gwlLogo';

import { compose } from 'redux';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../vmsStyles.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ToastMessage } from '../../../ToastMessage/ToastMessage';
import SignatureCanvas from 'react-signature-canvas'
import { sendImage } from '../../actions';

class Terms extends Component {

  state = {
    message: '',
    signatureData: null,
    isChecked: false,
  }
  sigPad = {}


  static getDerivedStateFromProps(props) {
    const { error, requesting, view } = props.visitor
    if (error && !requesting && view === "termsForm") {
      props.history.push(`/photo_capture}`)
    }
    return null
  }

  handleError(error, errorType) {
    return (
      <ToastMessage error={error} errorType={errorType} />
    )
  }

  clear = () => {
    this.sigPad.clear();
    this.setState({
      signatureData: '',
      message: '',
      isChecked: false
    })
  }


  handleCheck() {
    const { isChecked } = this.state
    this.setState({
      isChecked: !isChecked,
    })
  }

  singnatureHandler = () => {
    this.setState({
      signatureData: this.sigPad.getTrimmedCanvas()
        .toDataURL('image/jpg')
    })
    console.log("end triggered")
  }

  handleSubmit(e) {
    const { token } = this.props.visitor
    const { isChecked, signatureData } = this.state
    const uploadType = "signature"

    if (signatureData && isChecked && token) {
      this.props.sendImage(token, signatureData, uploadType)
    } else {
      this.setState({
        message: 'Please sign in the box below to acknowledge the Terms and Conditions'
      })
      e.preventDefault()
    }
  }

  render() {
    const { message, isChecked, nextDisabled, nxtBtnOpacity } = this.state
    const { requesting, errorType, error } = this.props.visitor
    const { singnatureHandler } = this;

    if (requesting) {
      return (
        <div className={"midContentPanel"}><Loader /></div>
      )
    } else {
      return (
        <div className={"midContentPanel"}>
          <GwlLogo />
          <section className={"formUi"}>
            <div className={"terms"}>


              <section className={"termcond"}>

                <div className={"singlePageContent "}>
                  <div className={"wrapper"}>
                    <div className={"singleMeta"}>
                      <h2>Privacy Policy For GoodWorks</h2>				
                    </div>
                    <div className={"singlePostWrap uni-clear"}>
                      <p><strong>Preamble</strong></p>
                      <p>GoodWorks Spaces
                      Pvt Ltd, a company incorporated under the Companies Act 1956, and herein after
                      referred in short “GoodWorks”. (Also referred as &#8220;us,&#8221; &#8220;we,&#8221;
                      and/or &#8220;our&#8221;) gathers information in connection with the access &amp;
                      use through its web / mobile applications and other online / standalone software
                      deployed by GoodWorks (&#8220;Software&#8221;) and its website located on the net
                      (the &#8220;Site&#8221;) (collectively, such services, Software and the Site,
                      collectively, the &#8220;Service(s)&#8221;), by each member, guest and any other
                      person who uses GoodWorks’ Services or the Website (referred to in this Privacy
                      Policy as “you” or “your”), how we use such information, and who may access
                      that information. This Privacy Policy is integrated by reference to the GOODWORKS
Patronship/Membership/Community Terms of Service &amp; Use.</p>
                      <p><strong>YOUR USE OF THE
                      SERVICES, THE WEBSITE OR APPLICATIONS CONSTITUTES YOUR UNCONDITIONAL ACCEPTANCE
                      OF THE PRACTICES DESCRIBED IN THIS PRIVACY POLICY. IF YOU DO NOT AGREE WITH AND
                      ACCEPT ALL OF THE PRACTICES DESCRIBED IN THIS PRIVACY POLICY, DO NOT USE THE
                      SERVICES OR THE WEBSITE AND DO NOT PROVIDE OR SUBMIT ANY IDENTIFIABLE
INFORMATION VIA OR WHILE USING THE WEBSITE OR THE SERVICES.</strong></p>

                      <p>
                        This Privacy Policy
                      may be revised by us at any time or periodically to include /exclude clauses
                      without prior notice to You and GoodWorks does not bear responsibility for
                      updating Users on the same. We advise that you review this Privacy Policy each
                      time you use the Services or the Website so that you are aware of any changes.
                      Your continued use of the Services or the Website following any changes in this
Privacy Policy will constitute your acceptance of such modifications.
                            Unless otherwise specified by us, revised policy will take effect automatically
                            &amp; be binding on &amp; from the minute of the day they are posted on the
Site.</p>
                          <p><strong>Collection
of Personal Data</strong></p>
                          <p>As explained in the
                          Terms of Service, we will collect certain information about you in connection
                          with your on-line registration as a member of GoodWorks at the Website and applications.
                          In addition, you may create, disclose or disseminate personal or business data
                          and/or information in connection with your use of the Services while using GoodWorks
                          or its affiliates’ networks or equipment or key in your data for a business
                          lead or inquiry, which data and information will be stored or cached on GoodWorks&#8217;
                          systems, computers, servers or other equipment. All of the foregoing
                          information, together with any other information described below as
                          &#8220;Personal Information,&#8221; will be referred to herein as &#8220;Personal
                          Information.&#8221; Your identity may be discernable from your Personal
Information, and Personal Information will specifically include the following: </p>

                          <ul>
                            <li>Your full name</li>
                            <li>Your address</li>
                            <li>Your e-mail address</li>
                            <li>Your credit card/ debit card number and/or other payment account information</li><li>Your proof of Identity</li>
                            <li>IP address of your server from where the Site is being accessed, the type of browser (Internet Explorer, Firefox, Opera, Google Chrome etc.) the operating system of your system and the Site You last visited before visiting our Site, referring source which may have sent You to the Site, duration of Your stay on our Site.</li>
                            <li>Details about the mobile devices and its operating system</li>
                            <li>Other information associated with the interaction of Your browser and the Site.</li>
                          </ul>
                         

                          <p>By registering as a
                          member or providing us with any Personal Information at or via the Website via
                          mobile applications or while using any of the Services, you are thereby
                          consenting to our use and disclosure of such Personal Information in accordance with the terms and conditions of this Privacy Policy.</p>
                          <p><strong>Our Use and Sharing of Information / Data</strong></p>
                          <p>We will only use your Personal Information as is reasonably necessary in connection with our provision of the Services to you as a member of GoodWorks, including without limitation: </p>
                          <ol><li>To bill you for payments owed by
you; </li><li>For authentication and
identification purposes; </li><li>To ensure your compliance with the
                                                        Terms of Service and/or to investigate any potential breach of the Terms
of Service;</li><li>To protect the networks, data,
                                                        software or business interests of GoodWorks, its affiliates and members.
                                                        We may also use your Personal Information to contact you with information
                                                        relating to the Services, your membership account with GoodWorks, and news
                                                        and information relating to our product offerings, services and/or events;
</li><li>To analyse the details of your visit
                                                        to our Site, including but not limited to, location data, web logs and
other communication data;</li><li>To conduct internal reviews and data
                                                        analaysis for the Site (e.g. to determine the geography of visitors to the
Site);</li><li>To provide it for scrutiny to any
                                                        statutory, regulatory or any other governmental authority or any other
agency as advised by government or any judicial body;</li><li>To resolve disputes;</li><li>Detect and protect Us against error,
fraud and other criminal activity; enforce our terms and conditions;</li><li>Use your IP address to help diagnose
                                                        problems with our server, and to administer our Site. Your IP address is
                                                        also used to help identify You and to gather broad demographic
information;</li><li>To improve our internal customer
training;</li><li>To enhance security of our Site;</li><li>Sharing the information with third
parties in order to provide certain services to You.</li></ol>
                          <p>
                            We are committed to protecting your privacy and we will not sell or lease your
                            Personal Information to any third party. However, in addition to using and
                            disclosing your Personal Information in the manner described above, we may
disclose your Personal Information: </p>
                            <ul><li>To any person, entity or
                            organization which you consent for us to disclose Personal Information to;
</li><li>To financial institutions and other
                                                            service providers as is reasonably necessary to verify your credit card
                                                            information and to bill your credit card for any payments owed by you
relating to your membership with GoodWorks and/or use of the Services;</li><li>To our business partners and agents
                                                            who provide hosting services, and web and technical support providers, as
                                                            is necessary or required in connection with the operation, maintenance and
support of the Services and the Website;</li><li>To comply with any legal
                                                            requirements, act in urgent circumstances to protect the personal safety
                                                            of users of the Services or the public, or court orders, to defend any
                                                            legal or administrative proceedings, or as we believe in good faith is necessary
to comply with any laws or legal requirements;</li><li>As GoodWorks believes is necessary
                                                            or appropriate in an emergency situation, including without limitation, to
prevent criminal activity, personal injury or property damage;</li><li>To the police, financial institutions
                                                            or other appropriate authorities in connection with any investigation of
suspected criminal or fraudulent activity by any person or entity.</li><li>To protect or defend our rights or
property (including enforcement of our rights under the Terms of Service);</li><li>In connection with any legal
proceedings relating to your use of the Services or the Website; and</li><li>In connection with the sale of the
                                                            equity or any of the assets of GoodWorks, in which case we will require
                                                            the buyer to maintain the confidentiality of your Information in
accordance with the terms of this Privacy Policy.</li></ul>
                            <p>Except as described
                            in this Privacy Policy, we will not disclose your Personal Information outside
                            of GoodWorks and its affiliates without your consent. We may share aggregated
                            demographic and statistical information with our business partners. This is not
linked to any personal information that can identify any individual person.</p>
                            <p><strong>Exclusions</strong></p>
                            <p>This Privacy Policy
                            does not apply to any Personal Data collected by GoodWorks other than Personal
                            Data collected through the Services. This Privacy Policy shall not apply to any
                            unsolicited information you provide to GoodWorks through the Services or
                            through any other means. This includes, but is not limited to, information
                            posted to any public areas of the Services, such as forums (collectively,
                            &#8220;Public Areas&#8221;), any ideas for new products or modifications to
                            existing products and other unsolicited submissions (collectively,
                            &#8220;Unsolicited Information&#8221;). All Unsolicited Information shall be
                            deemed to be non-confidential and GoodWorks shall be free to reproduce, use,
                            disclose, distribute and exploit such Unsolicited Information without
limitation or attribution. </p>
                            <p><strong>Use
by Other Parties of Your Personal Data</strong></p>
                            <p>Your Personal
                            Information may be accessed by any person who has access to your account log-in
                            information (“Log-In Information”). Therefore, we hereby advise you that You
                            should carefully protect the security and integrity of your Log-In Information
                            to guard against unauthorized access and disclosure of your Log-In Information.
                            Further, we cannot control how third parties and other users of the Website may
                            use any information that you disclose in postings or submissions while using
                            the Website or any part of the Services, including without limitation in your
                            postings in chat rooms and on message boards and forums. We encourage you not
                            to disclose or provide any personal or sensitive information while using any
generally- accessible sections of the Website.</p>
                            <p><strong>Security
Systems</strong></p>
                            <p>For the processing
                            of credit card payments and other mode of online payment, our payment processor
                            uses a Secured Socket Layer (SSL) server which encrypts your personally
                            identifiable data prior to transmission of this information over the Internet.
                            We have also put in place a reasonable physical measures and administrative
                            procedures (security measure) to safeguard against unauthorized access of
                            Personal Information and to help prevent the loss, misuse or alteration of
                            Personal Information that we collect in connection with your use of the
                            Services and the Website. However, we cannot guarantee that the security
                            measures we implement in connection with the operation of the Website and the
                            Services will absolutely prevent others from accessing or acquiring any of your
                            Personal Information, including without limitation your credit card
                            information. You therefore agree that any breach of security measure beyond the
                            control of GoodWorks are at your sole risk and expense. We reserve the right to
                            conduct a security review at any time to verify your identity. You agree to provide
                            GoodWorks all the information that GoodWorks for the security review. If You
                            fail to comply with any security request, GoodWorks reserve the right to
terminate Your membership with GoodWorks sand prohibit Your access to the Site.</p>
                            <p><strong>E-mails
&amp; Messages</strong></p>
                            <p>From time to time,
                            we may e-mail you news bulletins, information on technical service issues, or
                            information relating to the Services, or other services or products provided by
                            GoodWorks, its members and/or business partners. You consent to the delivery of
                            such communications by e-mail to the e-mail address that you provide to us when
                            you establish your membership account or while otherwise using the Services or
the Website.
                               
</p>
                                <p><strong>Cookies
</strong></p>
                                <p>In addition to the
                                Personal Information you provide to us, we may also collect certain, anonymous
                                information as you access and navigate the Website. When you visit the Website,
                                we send one or more cookies- a small file containing a string of characters –
                                to your computer or other device that uniquely identifies your browser. We use
                                cookies to improve the quality of our service, including analyzing the data for
                                storing user preferences and tracking user trends. We may set one or more
                                cookies in your browser when you visit the Website. Cookies are required to use
                                the Services and you may be required to log-in to your account after a certain
                                period of time has elapsed to protect against others accidentally accessing
                                your account information. In addition, when you access the Website, our servers
                                automatically record information that your browser sends. These server logs may
                                include information such as your web request, Internet Protocol address,
                                browser type, browser language, the date and time of your request and one or
                                more cookies that may uniquely identify your browser. We use these
                                technological tools to collect information to have a better understanding of
                                how people use the Services and the Website, to analyze data for trends and
                                statistics, to help diagnose problems with our servers, to enhance the
                                Services, and to enhance and tailor members’ experiences using the Services and
                                the Website. The information collected is not personally identifiable and we do
not link this information to any personally identifiable data.</p>
                                <p><strong>Use
of Third Party Websites</strong></p>
                                <p>The Website may
                                contain links to other websites that are owned or operated by third parties
                                that are unrelated to GoodWorks. Once you have clicked on a link or button
                                activator connecting you to such third-party website, you will leave the
Website and be taken to a website that we do not control.<strong> THIS PRIVACY
                                                                    POLICY DOES NOT APPLY TO ANY PERSONAL INFORMATION COLLECTED ON ANY THIRD PARTY
WEBSITE.</strong> We suggest that you read the privacy statement of the third-party
                                                                    website before providing any personally identifiable data on that website. We
                                                                    are not responsible for any loss, damage, claim or expense etc., as a result of
                                                                    use by any person or entity of any information that you may provide while
                                                                    accessing or using any third-party website. Further, GoodWorks shall not be
                                                                    liable and cannot be held liable for any breach of Security or for any actions
of any third parties that receive your Personal Information. </p>
                                <p>Notwithstanding
                                anything contained in this Policy or elsewhere, GoodWorks shall not be held
                                responsible for any loss, damage or misuse of Your Personal Information, if
                                such loss, damage or misuse is attributable to a Force Majeure Event (as
defined below). </p>
                                <p>“Force Majeure
                                Event” shall mean any event that is beyond GoodWorks reasonable control and
                                shall include, without limitation, sabotage, fire, flood, explosion, acts of
                                God, civil commotion, strikes or industrial action of any kind, riots,
                                insurrection, war, acts of government, computer hacking, unauthorized access to
                                computer data and storage device, computer crashes, breach of security and
encryption etc. </p>
                                <p><strong>Accessing
and Changing Personal Data</strong></p>
                                <p>You may access your
                                membership account and amend your Personal Information contained therein at any
                                time. In addition, you have the right to contact us at any time to: (a) request
                                the removal of any Personal Information that you provided to us in connection
                                with your registration as a member from our servers and computer networks; and
                                (b) update and modify your Personal Information relating to your membership
                                account. Please use the contact information provided below. Such request may
                                require us to terminate your membership in GoodWorks. If any such Personal
                                Information is removed from our servers or computer networks, any third party
                                who had access to such Personal Information prior to its removal may have retained
                                some or all of such Personal Information. We are not responsible for the
                                retention or use by third parties of any of your Personal Information at any
time, including following its removal from our servers or computer networks.</p>
                                <p><strong>Retention
of Personal Information</strong></p>
                                <p>After termination
                                of your membership with GoodWorks, GoodWorks shall destroy all the data
                                collected from You within a reasonable time, except the records and data
                                pertaining to the transaction undertaken using our Services or the Site. Please
                                note that under the applicable laws, we are required to maintain record of
                                these transaction with GoodWorks including personal data such as name, address,
                                phone number, transaction history etc. Other than the information specified
                                above, GoodWorks will delete all Personal Information that GoodWorks hold about
You when Your membership is terminated. </p>
                                <p>Please note that GoodWorks
                                will not require to disclose Your personal or Security detail vide email or
                                other communication. If you receive any email/ phone call/ SMS or other
                                communication requesting you to share your Personal Information, please do not
                                respond to such requests and delete such requests immediately. Please forward
such requests to <a href="/cdn-cgi/l/email-protection#b2d1dddcc6d3d1c6f2d5ddddd6c5ddc0d9c1d1ddc5ddc0d99cd1dddf"><span className={"__cf_email__"} data-cfemail="9cfff3f2e8fdffe8dcfbf3f3f8ebf3eef7effff3ebf3eef7b2fff3f1">[email&#160;protected]</span></a>
                                  for notifying GoodWorks of the same prior to deletion of such requests. </p>
                                <p><strong>Children’s
Privacy</strong></p>
                                <p>GoodWorks does not
                                knowingly collect Personal Data from children under the age of 18. If you are
                                under the age of 18, please do not submit any Personal Data through the Services.
                                We encourage parents and legal guardians to monitor their children&#8217;s Internet
                                usage and to help enforce our Privacy Policy by instructing their children
                                never to provide Personal Data through the Services without their permission.
                                If you have reason to believe that a child under the age of 18 has provided
                                Personal Data to GoodWorks through the Services, please contact us, and we will
endeavour to delete that information from our databases.</p>
                                <p><strong>Business
Transitions</strong></p>
                                <p>In the event that GoodWorks
                                goes through a business transition, such as merger, acquisition by another
                                company or sale of all or a portion of its assets, your personal information
will likely be among the assets transferred</p>
                                <p><strong>Contacting
GoodWorks Coworking Spaces</strong></p>
                                <p>To contact us with
                                any questions, please send an e-mail to contact@goodworkscowork.com or
call us at +91-8088707700. </p>
                                <p><strong>Grievances</strong></p>
                                <p>If You have any
                                concern, question, greviance or complaints in relation to the Site or its
content, or this Privacy Policy, please contact GoodWorks at contact@goodworkscowork.com </p>
                                <p><strong>Governing
law &amp; dispute resolution</strong></p>
                                <p>This GoodWorks
                                Privacy Policy shall be governed by and construed in accordance with the laws
                                of India. All disputes in relation to these Terms will be adjudicated
exclusively before a competent court in Bangalore, India only. </p>
</div>
                              <div id="comments" className={"commentsBox"}>
                              </div>
</div>
</div>

              </section>



                        <div className={"signature"}>
                          <SignatureCanvas
                            penColor='black'
                            canvasProps={{
                              width: 302,
                              height: 102,
                              className: 'sigCanvas'
                            }}
                            ref={(ref) => { this.sigPad = ref }}
                            onEnd={() => singnatureHandler()}
                          />
                        </div>
                        <label>
                          <div className={"imageCheckbox"}>
                            <input id="terms-accept" name="filter-buy-lease" type="checkbox" value="terms" checked={isChecked} onChange={() => this.handleCheck()} />
                            <label htmlFor="terms-accept"></label>
                            <span>I accept terms and condition </span>
                          </div>
                        </label>
            </div>
                      <button onClick={this.clear} className={classNames("btn-orange", "full")}>Clear</button>
                      <Link onClick={(e) => this.handleSubmit(e)} to="/idcard_generate"><button className={classNames("btnGreen", "full")}>Next</button></Link>
          </section>
                    <div style={{ height: "30px", lineHeight: "30px" }}>
                      <span>{message}</span>
                      <span>{error ? this.handleError(error, errorType) : null}</span>
                    </div>
                  </div>
                  )
                }
              }
            }
            
Terms.propTypes = {
                    // sendImage: PropTypes.func.isRequired,
                  };
                  
function mapStateToProps(state) {
  return {
                    visitor: state.visitor
                }
              }
              
function mapDispatchToProps(dispatch) {
  return {
                    sendImage: (token, imageData, uploadType) => dispatch(sendImage(token, imageData, uploadType))
                };
              }
              
              const withConnect = connect(
                mapStateToProps,
                mapDispatchToProps,
              );
              
export default compose(withConnect)(Terms);