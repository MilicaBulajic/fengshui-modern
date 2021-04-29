import React, { useState } from 'react';
import addToMailchimp from "gatsby-plugin-mailchimp";
import { trackCustomEvent } from "gatsby-plugin-google-analytics";

function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function timeout(ms, promise) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('TIMEOUT'))
      }, ms)
  
      promise
        .then(value => {
          clearTimeout(timer)
          resolve(value)
        })
        .catch(reason => {
          clearTimeout(timer)
          reject(reason)
        })
    })
  }
  
  const handleSubmit = () => {
    addToMailchimp(email, { FNAME: name }).then((data) => {
      if (data.result == "error") {
        timeout(data);
      } else {
        trackCustomEvent({
          category: "Newsletter",
          action: "Click",
          label: `Newsletter Click`,
        });
        setSubmitted(true);
      }
    });
  };

  return (
    <>
      {submitted ? (
        <div>
          <p>Thank your for your interest in my content</p>
          </div>
      ) : (
        <form>
          <input
            type="name"
            name="name"
            id="name"
            label="name-input"
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            id="mail"
            label="email-input"
            placeholder="Your e-mail address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="button"
            aria-label="Subscribe"
            onClick={() => handleSubmit()}
          >
            YES, PLEASE!
          </button>
        </form>
      )}
    </>
  );
};
export default SubscribeForm;