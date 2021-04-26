import React from 'react'
import {FormattedMessage} from 'react-intl'
import PropTypes from 'prop-types'

const FollowUs = ({link, instagram}) => {
  return (
    <div className="section followus">
      <nav className="level">
        <div className="level-item">
          <h3 className="title has-text-centered">
            <FormattedMessage id="followus"/>
            <a className="link is-info" href={"https://www.instagram.com/" + link + "/"} target="_blank" rel="noopener noreferrer">
              {instagram}
            </a>
          </h3>
        </div>
      </nav>
    </div>
  )
}

FollowUs.propTypes = {
  link: PropTypes.string,
  instagram: PropTypes.string,
};

export default FollowUs;
