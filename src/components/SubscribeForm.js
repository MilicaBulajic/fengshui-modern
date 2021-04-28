import React, { useState } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';



function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    // Mailchimp always responds with status code 200, accompanied by a string indicating the result of the response.
    const { result, msg } = await addToMailchimp(email, {FNAME: name});
    result === 'success' && setEmail('');
    // Removes the HTML returned in some response messages in case of error
    setMessage(msg.split('<')[0]);
    setStatus(result);
  };

  const handleNameChange = event => setName(event.target.value);

  const handleEmailChange = event => setEmail(event.target.value);

  return (
    <form>
      <span>Subscribe for latest updates</span>
      <p>
        Sign Up for our newsletter and get notified when we publish new articles
        for free!
      </p>
      <div>
      <input
          type="name"
          onChange={handleNameChange}
          value={name}
          placeholder="Name"
          required
        />
        <input
          type="email"
          onChange={handleEmailChange}
          value={email}
          placeholder="example@domain.com"
          required
        />
        <span
          status={status}
        >
          {message}
        </span>
      </div>
      <button type="submit" onClick={handleSubmit}>
        Subscribe
      </button>
    </form>
  );
}

export default SubscribeForm;