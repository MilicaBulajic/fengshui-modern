import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Dropdown from '../components/DropDownMenu'
import { FormattedMessage } from 'react-intl';
import menu from '../data/artworksMenu'
import menu_P from '../data/paintingMenu'
import menu_S from '../data/sculptureMenu'
import menu_Perf from '../data/performanceMenu'
import menu_NM from '../data/newmediaMenu'
import menuTree from '../data/menuTree'
import select from '../components/utils'
import { FaImage, FaAngleRight } from 'react-icons/fa'


const RootMenu = ( props ) => {
  const langKey = props.langKey;
  const keys_S = [ 'marble', 'wood', 'bronze', 'other-materials' ];
  const sel = select(props.langKey);

  return(
    <div className='navbar-item has-dropdown is-hoverable'>
      <Link className="navbar-link" to={ "/" + props.langKey + "/" + menuTree.services[sel] + "/" }>
        <FaImage className="menu-names" />
        <FormattedMessage id="services"/>
      </Link>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
           <div className="dropdown-content">
           <Dropdown
           langKey={langKey}
           base={ menu_S.introduction[sel] }
           baseName="introduction"
           switches={keys_S}
           links={menu_S}
           />
       </div>

</div>
</div>
);
};

RootMenu.propTypes = {
props: PropTypes.object,
};

export default RootMenu;
