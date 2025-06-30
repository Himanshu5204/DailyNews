import React, { Component } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share';

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className='my-3'>
        <div className='card'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'absolute',
              right: '0'
            }}>
            <span className='badge rounded-pill bg-danger'> {source} </span>
          </div>
          <img
            src={
              !imageUrl
                ? ' https://www.investors.com/wp-content/uploads/2018/03/stock-FederalReserve-05-adobe.jpg '
                : imageUrl
            }
            className='card-img-top'
            alt='...'
          />
          <div className='card-body mx-3'>
            {' '}
            <h5 className='card-title'>{title}</h5>
            <p className='card-text'>{description}</p>
            <p className='card-text'>
              <small className='text-danger'>
                By {!author ? 'Unknown' : author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <div className='d-flex flex-wrap justify-content-between align-items-center mt-3'>
              <a href={newsUrl} rel='noreferrer' target='_blank' className='btn btn-sm btn-dark'>
                Read More
              </a>
              <div className='d-flex gap-2'>
                {/* Share Buttons */}
                <FacebookShareButton url={newsUrl} quote={title}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={newsUrl} title={title}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <WhatsappShareButton url={newsUrl} title={title}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
