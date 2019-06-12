import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron">
    <h1>{"Yosuf's Vision... TBD"}</h1>
    <p>React, Redux and React Router - json server for api w/ swagger running on 3001.</p>
    <Link to="about" className="btn btn-primary btn-lg">
      Learn more
    </Link>
  </div>
);

export default HomePage;
