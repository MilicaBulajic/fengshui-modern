import addToMailchimp from "gatsby-plugin-mailchimp";
import { navigate } from "gatsby-link";
import React from "react";

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class MailChimpForm extends React.Component {
  constructor() {
    super();
    this.state = { name: "", email: "", result: null };
  }
  _handleSubmit = e => {
    e.preventDefault();
    addToMailchimp(this.state.email, {
      FNAME: this.state.name,
    }) 
    const form = e.target;
    fetch("/?no-cache=1", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  render() {
  return (
    <form onSubmit={this._handleSubmit} action="/">
      <input
        id="outlined-name-input"
        placeholder="Name"
        type="name"
        name="name"
        autoComplete="name"
        variant="outlined"
        onChange={this.handleNameChange}
      />
      <input
        id="outlined-email-input"
        placeholder="Email"
        type="email"
        name="email"
        autoComplete="email"
        variant="outlined"
        onChange={this.handleEmailChange}
      />
      <br />
      <button
        variant="contained"
        color="primary"
        label="Submit"
        type="submit"
      >
        YES PLEASE!
      </button>
    </form>
  );
}
}