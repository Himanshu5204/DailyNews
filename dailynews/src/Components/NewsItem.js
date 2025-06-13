import React, { Component } from "react";

export class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =  this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={!imageUrl?"https://static.politico.com/d2/b0/1d8b6e924c45bfc2355ccb55b7dd/trump-military-07765.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
