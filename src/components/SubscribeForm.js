import React, { Component } from "react";
import Mailchimp from "react-mailchimp-form";

class SubscribeForm extends Component {
  render() {
    return (
      <Mailchimp
      action={process.env.MAILCHIMP_ENDPOINT}
        fields={[
          {
            name: "FNAME",
            placeholder: "Name",
            type: "text",
            required: true,
          },
          {
            name: "EMAIL",
            placeholder: "Email",
            type: "email",
            required: true,
          }
        ]}
        messages={{
          sending: "Sending...",
          success: "Thank you for subscribing!",
          error: "An unexpected internal error has occurred.",
          empty: "You must write an e-mail.",
          duplicate: "Too many subscribe attempts for this email address",
          button: "YES PLEASE!",
        }}
        className="form"
      />
    );
  }
}

export default SubscribeForm;
