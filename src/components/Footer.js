import React from "react";
import { Link } from "gatsby";
import select from "../components/utils";
import { FormattedMessage } from "react-intl";
import menuTree from "../data/menuTree";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaVimeo,
  FaLinkedin,
} from "react-icons/fa";
import Copyright from "../components/Copyright";
import ScrollToTop from "../components/ScrollToTop";

const Footer = class extends React.Component {
  render() {
    const props = this.props;
    const sel = select(props.langKey);
    return (
      <footer>
        <div className="content has-text-centered">
          <hr />
          <a
            title="facebook"
            target="_blank"
            href="https://www.facebook.com/fengshuimoderndesign/"
          >
            <FaFacebook className="facebook-icon" size="2em" />
          </a>
          <a
            title="instagram"
            target="_blank"
            href="https://instagram.com/fengshui.home"
          >
            <FaInstagram className="instagram-icon" size="2em" />
          </a>
          <p><FormattedMessage id="rights" /></p>
        </div>

        <ScrollToTop />
      </footer>
    );
  }
};

export default Footer;
