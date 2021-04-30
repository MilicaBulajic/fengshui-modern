import React, { useState } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';

function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
   
    const { result, msg } = await addToMailchimp(email);
    result === 'success' && setEmail('');

    setMessage(msg.split('<')[0]);
    setStatus(result);
  };

  const handleChange = event => setEmail(event.target.value);

  return (
    <form>
      <p>
        Download Booklet of serive + Free Feng Shui tips for a happy life!
      </p>
      <div>
        <input
          type="email"
          onChange={handleChange}
          value={email}
          placeholder="Email"
          required
        />
        <span
          status={status}
        >
          {message}
        </span>
      </div>
      <button type="submit" onClick={handleSubmit}>
        YES, PLEASE!
      </button>
    </form>
  );
}

export default SubscribeForm;
