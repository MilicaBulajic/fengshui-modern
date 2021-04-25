import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import AccordionCollaps from '../components/AccordionCollaps'
import { FormattedMessage } from 'react-intl';
import menuTree from '../data/menuTree'
import select from '../components/utils'
import { FaImage } from 'react-icons/fa'

const RootMenuMobile = ( props ) => {

    const langKey = props.langKey;
    //console.log(langKey);
    const sel = select(props.langKey);

    return(
    <div className='navbar-item has-dropdown is-hoverable'>
      <Link className="navbar-link" to={ "/" + props.langKey + "/" + menuTree.services[sel] + "/" }>
          <FaImage className="menu-names" />
          <FormattedMessage id="services"/>
      </Link>
        <div className="content">
          <Link className="navbar-item" to={ menu.portfolio[sel] }>
            <FormattedMessage id="portfolio"/>
          </Link>
          <div className="navbar-item ">
      </div>
    </div>
</div>
  );
};

RootMenuMobile.propTypes = {
  props: PropTypes.object,
};

export default RootMenuMobile;
