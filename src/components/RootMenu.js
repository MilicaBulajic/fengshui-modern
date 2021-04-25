import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Dropdown from '../components/DropDownMenu'
import { FormattedMessage } from 'react-intl';
import menuTree from '../data/menuTree'
import select from '../components/utils'
import { FaImage, FaAngleRight } from 'react-icons/fa'


const RootMenu = ( props ) => {
  const langKey = props.langKey;
  const sel = select(props.langKey);

  return(
    <div className='navbar-item has-dropdown is-hoverable'>
      <Link className="navbar-link" to={ "/" + props.langKey + "/" + menuTree.services[sel] + "/" }>
        <FaImage className="menu-names" />
        <FormattedMessage id="services"/>
      </Link>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
           <div className="dropdown-content">
       </div>

</div>
</div>
);
};

RootMenu.propTypes = {
props: PropTypes.object,
};

export default RootMenu;
