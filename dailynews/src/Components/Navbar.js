// rce rcep
// react classbased component export statement p for proptypes

import React, { Component } from "react";
import { Link , withRouter } from "react-router-dom";
//import PropTypes from "prop-types";

export class Navbar extends Component {
  render() {
    let { title , location,mode, toggleMode} = this.props;

    const getActiveClass = (path) => {
      return location.pathname === path ? "nav-link active" : "nav-link";
    };

    return (
      <div>
        <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode} fixed-top`}>           
          <div className="container-fluid">
            {/* <a className="navbar-brand" href="/">
              {title}
            </a> */}
            
            <Link className="navbar-brand" to="/">{title}</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className={getActiveClass("/")} to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={getActiveClass("/business")} to="/business">Business</Link>
                </li>
                <li className="nav-item">
                  <Link className={getActiveClass("/entertainment")} to="/entertainment">Entertainment</Link>
                </li>
                <li className="nav-item">
                  <Link className={getActiveClass("/general")} to="/general">General</Link>
                </li>
                <li className="nav-item">
                  <Link className={getActiveClass("/health")} to="/health">Health</Link>
                </li>
                <li className="nav-item">
                  <Link className={getActiveClass("/science")} to="/science">Science</Link>
                </li>
                <li className="nav-item">
                  <Link className={getActiveClass("/sports")} to="/sports">Sports</Link>
                </li>
                <li className="nav-item">
                  <Link className={getActiveClass("/technology")} to="/technology">Technology</Link>
                </li>
              </ul>
              {/* Toggle Button */}
              <div className={`form-check form-switch text-${mode === 'light' ? 'dark' : 'light'}`}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="themeSwitch"
                  onChange={toggleMode}
                  checked={mode === 'dark'}
                />
                <label className="form-check-label" htmlFor="themeSwitch">
                  Enable {mode === 'light' ? 'Dark' : 'Light'} Mode
                </label>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);