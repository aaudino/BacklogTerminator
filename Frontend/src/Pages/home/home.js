import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./home.scss";
import heroMp4 from "../../assets/hero_compressed.mp4";

const Home = () => {
  const videoref = useRef(null);

  useEffect(() => {
    videoref.current.play();
  }, []);
  return (
    <>
      <div className="heroContainer">
        <video
          ref={videoref}
          autoPlay
          muted
          loop
          playsInline={true}
          disablePictureInPicture={true}
          src={heroMp4}
          type="video/webm"
        ></video>
        <div className="headingContainer">
          <h1>Tired of not finishing your games ?</h1>
          <h2>Backlog Terminator is here for you</h2>
        </div>
      </div>

      <div className="presentationContainer">
        <div className="presentationContainer--item">
          <h2>What Backlog Terminator Does for You</h2>
          <p>
            Backlog Terminator is the ultimate companion for passionate gamers
            looking to conquer their backlog of unplayed games. But what exactly
            can this app do for you?
          </p>
          <ul>
            <li>
              <b>Catalog your collection</b>: Easily organize all your games.
            </li>
            <li>
              <b>Smart purchases</b>: Make informed decisions before buying new
              games.
            </li>
            <li>
              <b>Time management</b>: Get estimates on how long it takes to
              complete each game.
            </li>
            <li>
              <b>Track progress</b>: Know how much longer your current game will
              last.
            </li>
            <li>
              <b>Community engagement</b>: Share thoughts and opinions with
              fellow gamers.
            </li>
          </ul>
        </div>
        <div className="presentationContainer--item">
          <h2>What Backlog Terminator Understands</h2>
          <p>
            At Backlog Terminator, we get it. We understand the challenges you
            face with your gaming backlog. Whether it's the allure of
            irresistible sales or simply the overwhelming choice of what to play
            next, we're here to help you navigate through it all.{" "}
            <b>
              That's why we've developed a ranking system based on game duration
              and user ratings. It helps prioritize your gaming queue
              effortlessly.
            </b>
          </p>
        </div>

        <div className="presentationContainer--item">
          <h2>Join the Community Today!</h2>
          <p>Curious? Try our free demo and take control of your backlog!</p>
        </div>
      </div>
    </>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
