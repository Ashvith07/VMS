import React from "react";
import { GwlLogo } from "./gwlLogo";
import '../containers/VisitorManagementSystem/vmsStyles.css'

const About =  () => {
  // componentDidMount(){
  //   console.log('didmount');
    
  // }
    return (
     
      <div className="midContentPanel">
        <GwlLogo />
        <section className="formUi">
          <div>
            <h2>
              Welcome to GoodWorks CoWork, No.1 coworking space in
              Bangalore!{" "}
            </h2>
            <p>
              GoodWorks CoWork is the WINNER of the 2018 Member’s Choice
              Award for Bangalore and has also been ranked as the No.1
              coworking space in Bangalore by{" "}
              <strong>Coworker.com</strong>
            </p>

            <p>
              Bangalore is the breeding ground for Startups and MNCs and
              being able to become the most loved coworking space in the
              city is a great moment of celebration for us! This is purely
              a people’s choice award where Coworker.com analyzed member
              reviews of over 1500+ nominated coworking spaces.{" "}
            </p>

            <p>
              GoodWorks CoWork is NOT just about community and shared
              office spaces! Work here and get access to all the resources
              required to build your dream company.{" "}
            </p>

            <p>
              We have an interesting mix of product-based, service based
              companies and India centres of MNCs at our space. We
              organize fun activities like the 'Eat &amp; Greet Fridays',
              Monthly birthday party celebrations, regular workshops and
              trainings such as Photography workshop, creative thinking
              sessions etc. to encourage community and keep our members
              up-to- date.{" "}
            </p>

            <p>
              Our aim is to help start-ups set-up and run their business
              seamlessly, without the day-to- day operational hassles.{" "}
            </p>

            <p>
              <u>
                <strong>
                  The facilities accompanying our office spaces are:
                </strong>
              </u>
            </p>

            <div className="terms">
              <ul>
                <li>
                  <span>
                    <i className="glyphicon glyphicon-menu-right" />
                  </span>
                  High speed internet for easy your day to day office
                  activities.
                </li>
                <li>
                  <span>
                    <i className="glyphicon glyphicon-menu-right" />
                  </span>
                  Individual storage units with locks to keep your gadgets
                  and personal documents safe.
                </li>
                <li>
                  <span>
                    <i className="glyphicon glyphicon-menu-right" />
                  </span>
                  Ergonomic swivel chairs that allow you to work
                  comfortably.
                </li>
                <li>
                  <span>
                    <i className="glyphicon glyphicon-menu-right" />
                  </span>
                  Vibrant business lounge to carry out business meeting
                  and for your personal time.
                </li>
                <li>
                  <span>
                    <i className="glyphicon glyphicon-menu-right" />
                  </span>
                  Round the clock camera surveillance for fool-proof
                  security.
                </li>
                <li>
                  <span>
                    <i className="glyphicon glyphicon-menu-right" />
                  </span>
                  Multiple plug ports to connect all your gadgets and
                  equipment.
                </li>
                <li>
                  <span>
                    <i className="glyphicon glyphicon-menu-right" />
                  </span>
                  Electricity backup so that you do not waste even a
                  single second of your work schedule.
                </li>
              </ul>
            </div>
            <br />
            <p>
              It is indeed our pleasure to serve you. We look forward to a
              long-term fruitful relationship!{" "}
            </p>
          </div>
        </section>
      </div>
    );
  }

export default About