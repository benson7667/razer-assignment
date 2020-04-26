import React from "react";
import { any } from "prop-types";
import "./styles.less";

const Jumbotron = (props) => {
  const { children, type } = props;
  return (
    <div className="jumbotron-card">
      <img
        className="jumbotron-img"
        src="https://razerid.razer.com/static/media/razer-phone.8a4e47ff.jpg"
      />

      {type === "custom" && children}

      {type === "default" && (
        <div className="jumbotron-body">
          <div className="welcome-title">Hi, Welcome</div>
          <p>
            This is another version I personally build for fun where I rewrite
            most of the css using LESS.
          </p>
          <p>
            The base functionality is still remain and I continuously adding new
            elements into it. Hope you will like it ! 🙂🙂🙂
          </p>

          <div className="regards-wrapper">
            <p>Regards, Benson</p>
            <a target="_blank" href="https://boring-brown-c7d082.netlify.app/">
              View Basic Version >>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

Jumbotron.propTypes = {
  children: any,
};

Jumbotron.defaultProps = {
  type: "default",
};

export default Jumbotron;
