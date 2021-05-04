
import React, {useState, useEffect} from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe"
import InputField from "./InputField";


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
            <p className="mc__title">
                {status === "success" ? "Success!" :
                    "Download Booklet of serive + Free Feng Shui tips for a happy life!"}
            </p>

            {status === "sending" && (
                <div
                    className="mc__alert mc__alert--sending"
                >sending...</div>
            )}
            {status === "error" && (
                <div
                    className="mc__alert mc__alert--error"
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            {status === "success" && (
                <div
                    className="mc__alert mc__alert--success"
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
                    />
                    <InputField
                        onChangeHandler={setEmail}
                        type="email"
                        value={email}
                        placeholder="your@email.com"
                        isRequired
                    />

                </div>
            ) : null}

            {/*Close button appears if form was successfully sent*/}
            {
                status === 'success' ? <InputField
                label="subscribe"
                type="submit"
                formValues={[email, firstName]}
            /> : <InputField
                    label="YES, PLEASE!"
                    type="submit"
                    formValues={[email, firstName]}
                    className="form button"
                />

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