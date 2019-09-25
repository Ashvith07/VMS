import React from "react";
import { GwlLogo } from "./gwlLogo";
import '../containers/VisitorManagementSystem/vmsStyles.css'

const ContactUs = () => {
    return (
      
            <div className="midContentPanel">
              
               <GwlLogo />
              <section className="formUi" style={{margin: "100px auto 0"}}>
                <h3>For further assistance, please send a mail to  <a href="mailto:contact@goodworkscowork.com">contact@goodworkscowork.com</a> </h3>
                
                {/* <h2>Sunil Kumar </h2>
                <p>
                  Phone No: <strong />
                  <br />
                  Email:{" "}
                  <a href="mailto:sunil.kumar@goodworkscowork.com">
                    <strong>sunil.kumar@goodworkscowork.com </strong>
                  </a>
                  <br />
                  Designation: <strong />
                </p>

                <h2>Dilip Gadam </h2>
                <p>
                  Phone No: <strong>9620120120</strong>
                  <br />
                  Email:{" "}
                  <a href="mailto:dilip.gadam@goodworkscowork.com">
                    <strong>dilip.gadam@goodworkscowork.com </strong>
                  </a>
                  <br />
                  Designation: <strong>Finance and legal manager</strong>
                </p> */}
              </section>
            </div>
    );
  }

export default ContactUs;
