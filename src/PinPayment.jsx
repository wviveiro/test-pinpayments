import React, { useEffect, useState } from 'react';
import './PinPayment.scss';
import { loadPinPaymentsForm, onRequestPinToken } from './ppform';

const Pinpayment = () => {
    const [displayForm, setDisplayForm] = useState(true);

    const toggleForm = () => setDisplayForm(!displayForm);


    return (
        <div>
            <button onClick={toggleForm}>{displayForm ? 'Hide Credit Card Form' : 'Show Credit Card Form'}</button>

            {displayForm && (
                <CreditCardForm />
            )}
        </div>
    );
};

const CreditCardForm = () => {
    useEffect(() => {
        loadPinPaymentsForm({is_sandbox: true})
    }, []);

    const callCheckout = () => {
        onRequestPinToken({

        }, () => {
            console.log('called');
        });
    }


    return (
        <div className="credit-card-form">
            <div>
                <p><strong>Credit Card Form</strong></p>
                <div>
                    <label>Name</label>
                    <div id="cc-name" className="input-field" />
                </div>
                <div>
                    <label>Card Number</label>
                    <div id="cc-number" className="input-field" />
                </div>
                <div>
                    <label>Expiry Date</label>
                    <div id="cc-expiry" className="input-field" />
                </div>
                <div>
                    <label>CCV</label>
                    <div id="cc-ccv" className="input-field" />
                </div>
                <br /><br />
                <button
                    onClick={callCheckout}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default Pinpayment;