import React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'

export default class SubscribeForm extends React.Component {
    state = {
        FNAME: null,
        EMAIL: null,
    }

    _handleChange = e => {
        console.log({
            [`${e.target.name}`]: e.target.value,
        })
        this.setState({
            [`${e.target.name}`]: e.target.value,
        })
    }

    _handleSubmit = e => {
        e.preventDefault()

        console.log('submit', this.state)

        addToMailchimp(this.state.EMAIL, {
            ...this.state
        })
            .then(({ msg, result }) => {
                console.log('msg', `${result}: ${msg}`)

                if (result !== 'success') {
                    throw msg
                }
                alert(msg)
            })
            .catch(err => {
                console.log('err', err)
                alert(err)
            })
    }

    render() {
        return (
            <div>
                <div className="form">
                <p>Download Booklet of serive + Free Feng Shui tips for a happy life!</p>
                    <form method="post" onSubmit={this._handleSubmit}>
                        <input
                            type="text"
                            onChange={this._handleChange}
                            placeholder="name"
                            name="FNAME"
                        />
                        <input
                            type="email"
                            onChange={this._handleChange}
                            placeholder="email"
                            name="EMAIL"
                        />
                        <button type="submit">YES, PLEASE!</button>
                    </form>
                </div>
            </div>
        )
    }
}