import React from "react";
import { Link } from "gatsby";
import { FormattedMessage } from "react-intl";
import select from "../components/utils";
import menuTree from "../data/menuTree";


const Button = class extends React.Component {
  render() {
    const props = this.props;
    const sel = select(props.langKey);
    return (
        <button>
        <Link
          to={"/" + props.langKey + "/" + menuTree.services[sel] +"/"}
        >
          <FormattedMessage id="button" />
        </Link>
      </button>
    );
  }
};

export default Button;
