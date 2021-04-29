import React from "react";
import addToMailchimp from 'gatsby-plugin-mailchimp'

export default class SubscribeForm extends React.Component {
  state = {
    email: "",
    name: "",
    message: "",
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addToMailchimp(this.state.email, {
      FNAME: this.state.name});
    this.setState({ message: result.msg });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  render() {
    return (
      <form
        name="subscribeForm"
        method="POST"
        id="subscribe-form"
        className="subscribe-form"
        onSubmit={this.handleSubmit}
      >
        <input
          type="name"
          name="name"
          placeholder="Enter Name"
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email Address..."
          value={this.state.email}
          onChange={this.handleInputChange}
        />
        <button type="submit">
          YES, PLEASE!
        </button>
      </form>
    );
  }
}
