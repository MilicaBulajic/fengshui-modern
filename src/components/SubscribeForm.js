import addToMailchimp from "gatsby-plugin-mailchimp";
import React from "react";

export default class MailChimpForm extends React.Component {
  constructor() {
    super();
    this.state = { name: "", email: "", result: null };
  }
  _handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addToMailchimp(this.state.email, {
      FNAME: this.state.name,
    });
    this.setState({ result: result });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  render() {
    return this.state.result === "success " ? (
      <div>SUCCESS</div>
    ) : this.state.result === "error" ? (
      <div>ERROR</div>
    ) : (
      <form onSubmit={this._handleSubmit}>
        <input
          id="outlined-name-input"
          label="Name"
          type="name"
          name="name"
          autoComplete="name"
          variant="outlined"
          onChange={this.handleNameChange}
        />
        <input
          id="outlined-email-input"
          label="Email"
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
