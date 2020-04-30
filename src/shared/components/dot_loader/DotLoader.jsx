import React from "react";
import { number, string } from "prop-types";
import "./styles.less";

const DotLoader = (props) => {
  const { color, radius } = props;
  return (
    <div className="razer-dot-loader">
      {[1, 2, 3].map((dot) => (
        <span
          key={dot}
          style={{
            width: radius,
            height: radius,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
};

DotLoader.defaultProps = {
  radius: 6,
  color: "#fff",
};
DotLoader.propTypes = {
  color: string,
  radius: number,
};

export default DotLoader;
