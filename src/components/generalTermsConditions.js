import React from "react";
import { GwlLogo } from "./gwlLogo";
import '../containers/VisitorManagementSystem/vmsStyles.css'

const GeneralTermsConditions = () => {
  return (
    
          <div className="midContentPanel">
            <GwlLogo />
            <section className="formUi">
              <h2>USE OF THE INTERNET </h2>
              <div className="terms">
                <ul>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    All members have free access to “GoodWorks CoWork” WIFI
                    networks.{" "}
                  </li>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    Ask the community manager for the password.
                  </li>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    Do your best towards fair Internet usage.
                  </li>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    Members are requested to adhere to the below terms while
                    using the internet.
                  </li>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    Abstain from sending pyramid schemes, chain letters, junk
                    email, spamming or any duplicative or unsolicited messages
                    (commercial or otherwise).
                  </li>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    Do not publish, post, upload, distribute or disseminate any
                    inappropriate, profane, defamatory, obscene, indecent or
                    unlawful information on or through provider servers.
                  </li>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    Do not use any material or information, including images or
                    photographs that infringes any copyright, trademark, patent,
                    trade secret, or other proprietary right of any party.
                  </li>

                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    Do not upload files that contain viruses, Trojan Horses,
                    corrupted files, or any other similar software that may
                    damage the operation of another computer or property of
                    another coworker.
                  </li>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    Do not download any file that you know, or reasonably should
                    know, cannot be legally reproduced, displayed, performed,
                    and or/distributed in such manner.
                  </li>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    Do not harvest or otherwise collect information about
                    others, including email addresses, without the authorization
                    or consent of the disclosing party.
                  </li>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    Do not watch or download any obscene content. Using torrents
                    is strictly prohibited.
                  </li>
                </ul>
              </div>

              <h2>CONFERENCE ROOMS </h2>
              <div className="terms">
                <ul>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    We have 2 conference rooms available at GoodWorks CoWork -
                    12 seater on the 4th floor and 8 seater on the 2nd floor.
                  </li>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    Please contact the community manager to block the space for
                    meetings/ interviews.
                  </li>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    Contact the community manager for any additional
                    requirements for your meeting.
                  </li>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    Make sure to rearrange the furniture and stationery to their
                    original position after usage.
                  </li>
                </ul>
              </div>

              <h2>PRINTING </h2>
              <div className="terms">
                <ul>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    Extra printing charges are applicable for usage of the
                    printer.
                  </li>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    <div>
                      Install the printer software from this link -{" "}
                      <a href="https://goo.gl/vg4BbU" rel="noopener noreferrer" target="_blank">
                        <strong>goo.gl/vg4BbU</strong>
                      </a>{" "}
                      and connect using the USB cable.
                    </div>
                  </li>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    Please fill up your printing details in the register kept
                    near the printer to maintain records.
                  </li>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    As it is a self-moderated process, we’re relying on you to
                    enter accurate details in the records.
                  </li>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    The final payable amount will be added to your monthly
                    invoice.
                  </li>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    Avoid misusing the printer/scanner for personal usage.
                  </li>
                </ul>
              </div>

              <h2>VISITORS </h2>
              <div className="terms">
                <ul>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    Visitors need to make proper entry in the Visitors book
                    kept at the reception.
                  </li>
                  <li>
                    <span>
                      <i className="glyphicon glyphicon-menu-right" />
                    </span>
                    All visitors are also expected to abide by the House
                      Rules.
                  </li>
                </ul>
              </div>
            </section>
          </div>
  );
};

export default GeneralTermsConditions;
