import React, {useState, useEffect} from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe"
import InputField from "./InputField";
import { FormattedMessage } from "react-intl";


const CustomForm = ({ status, message, onValidated }) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        email &&
        firstName &&
        email.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email,
            MERGE1: firstName,
        });

    }

    useEffect(() => {
        if(status === "success") clearFields();
    }, [status])

    const clearFields = () => {
        setFirstName('');
        setEmail('');
    }

 
    return (
        <form
            className="form"
            onSubmit={(e) => handleSubmit(e)}
        >
            <p>
                {status === "success" ? "Success!" :
                    <FormattedMessage id="introduction" />}
            </p>

            {status === "sending" && (
                <div>sending...</div>
            )}
            {status === "error" && (
                <div
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            {status === "success" && (
                <div
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}

            {status !== "success" ? (
                <div className="form">
                    <InputField
                        onChangeHandler={setFirstName}
                        type="text"
                        value={firstName}
                        placeholder="Name"
                        isRequired
                        className="inputs"
                    />
                    <InputField
                        onChangeHandler={setEmail}
                        type="email"
                        value={email}
                        placeholder="your@email.com"
                        isRequired
                        className="inputs"
                    />

                </div>
            ) : null}

            {
                status === 'success' ? null : <button
                    type="submit"
                    formValues={[email, firstName]}
                ><FormattedMessage id="button" /></button>

            }
        </form>
    );
};

const SubscribeForm = props => {
    const url = `https://genhybridsystems.us1.list-manage.com/subscribe/post?u=${process.env.REACT_APP_MAILCHIMP_U}&id=${process.env.REACT_APP_MAILCHIMP_ID}`;

    return (

        <div className="mc__form-container">
            <MailchimpSubscribe
                url={url}
                render={({ subscribe, status, message }) => (
                    <CustomForm
                        status={status}
                        message={message}
                        onValidated={formData => subscribe(formData)}
                    />
                )}
            />
        </div>

    )
}

export default SubscribeForm;