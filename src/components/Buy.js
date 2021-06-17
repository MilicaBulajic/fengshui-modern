import React from "react";
import { Link } from "gatsby";
import { FormattedMessage } from "react-intl";
import select from "./utils";
import menuTree from "../data/menuTree";


const Buy = class extends React.Component {
  render() {
    const props = this.props;
    const sel = select(props.langKey);
    return (
        <button>
        <Link
          to={"/" + props.langKey + "/" + menuTree.success[sel] +"/"}
        >
          BUY E-BOOK
        </Link>
      </button>
    );
  }
};

export default Buy;
