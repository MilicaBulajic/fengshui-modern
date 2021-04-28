import addToMailchimp from "gatsby-plugin-mailchimp"
import React, { useState } from "react"

const SubscribeForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [disabled, setDisabled] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    setDisabled(true)
    setMessage("Sending...")
    const response = await addToMailchimp(email, name)
    if (response.result === "error") {
      if (response.msg.toLowerCase().includes("already subscribed")) {
        setMessage("You're already on to the list!")
      } else {
        setMessage("Some error occured while subscribing you to the list.")
      }
      setDisabled(false)
    } else {
      setMessage(
        "Thanks! Please check your e-mail and click the confirmation link."
      )
    }
  }

  return (
    <div>
      <h2>
        Sign up for my newsletter
      </h2>
      <form onSubmit={handleSubmit}>
      <input
          aria-label="Name"
          onChange={event => setName(event.target.value)}
          placeholder="Enter your name"
          required
          type="name"
        />
        <input
          aria-label="Email address"
          onChange={event => setEmail(event.target.value)}
          placeholder="Enter your email"
          required
          type="email"
        />
        <div>
          <button disabled={disabled}>Sign up</button>
        </div>
      </form>
      <div>
        {message}
      </div>
    </div>
  )
}

export default SubscribeForm