import addToMailchimp from "gatsby-plugin-mailchimp";
import React from "react";

export default class MailChimpForm extends React.Component {
  constructor() {
    super();
    this.state = { email: "", result: null };
  }
  _handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addToMailchimp(this.state.email);
    this.setState({ result: result });
  };
  handleChange = (event) => {
    this.setState({ email: event.target.value });
  };
  render() {
    return this.state.result === "success " ? (
      <div>SUCCESS</div>
    ) : this.state.result === "error" ? (
      <div>ERROR</div>
    ) : (
      <form>
        <p>
          Download Booklet of serive + Free Feng Shui tips for a happy live!
        </p>
        <input
          id="outlined-email-input"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email address"
          variant="outlined"
          onChange={this.handleChange}
        />
        <br />
        <button
          variant="contained"
          color="primary"
          label="Submit"
          type="submit"
          onSubmit={this._handleSubmit}
        >
          YES, PLEASE!
        </button>
      </form>
    );
  }
}
