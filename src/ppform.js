const loadPinPaymentsJS = (sandbox = false) => {
    return new Promise((resolve, reject) => {
        if (window.HostedFields) return resolve();

        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = `https://cdn.pinpayments.com/pin.hosted_fields.v1.js`;
        document.head.appendChild(s);

        const verifyLoaded = (counter = 0) => {
            if (counter > 100) return reject('Not possible to load credit card form');

            if (window.HostedFields) return resolve();

            setTimeout(() => {
                verifyLoaded(counter + 1);
            }, 100);
        }

        verifyLoaded();
    });
}


let paymentForm;
// let callbackRequestNonce = () => {};

export const onRequestPinToken = (args, cb) => {
    if (paymentForm) {
        paymentForm.tokenize(args, cb);
    }
}


export const loadPinPaymentsForm = (auth) => {
    return new Promise((resolve, reject) => {
        loadPinPaymentsJS(auth.is_sandbox).then(() => {
            paymentForm = window.HostedFields.create({
                sandbox: !!auth.is_sandbox,
                autocomplete: true,
                fields: {
                    name: {
                        selector: '#cc-name',
                        placeholder: 'Full Name'
                    },
                    number: {
                        selector: '#cc-number',
                        placeholder: 'Card Number'
                    },
                    cvc: {
                        selector: '#cc-ccv',
                        placeholder: 'CVV'
                    },
                    expiry: {
                        selector: '#cc-expiry',
                        placeholder: 'MM/YY'
                    }
                },
                styles: {
                    'input': {
                        'color': '#000',
                    }
                }
            });

            paymentForm.on('ready', () => {
                resolve();
            });
        }).catch(reject);
    });
}