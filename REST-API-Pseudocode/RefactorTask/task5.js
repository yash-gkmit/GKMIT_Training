


//******************** code no. 5 ***************************

class PayPalPayment {
    pay(amount) {
        console.log(`Paid ${amount} using PayPal.`);
    }
}

class StripePayment {
    pay(amount) {
        console.log(`Paid ${amount} using Stripe.`);
    }
}

class PaymentProcessor {
    constructor() {
        this.paymentMethod = new PayPalPayment(); 
    }

    processPayment(amount) {
        this.paymentMethod.pay(amount);
    }
}

// Usage
const processor = new PaymentProcessor();
processor.processPayment(100);

//-------------------SOLID Principle violates here - OPEN CLOSED PRINCIPLE(because here paymentProcessor is not open for paymentmethodtype.)

//Good Code 

class PayPalPayment {
    pay(amount) {
        console.log(`Paid ${amount} using PayPal.`);
    }
}

class StripePayment {
    pay(amount) {
        console.log(`Paid ${amount} using Stripe.`);
    }
}

class PaymentProcessor {
    constructor(paymentMethod) {
        this.paymentMethod = paymentMethod; // here we first apply the type of payment required by user
    }

    processPayment(amount) {
        this.paymentMethod.pay(amount); // then we process the payment
    }
}

// Usage
const paypalUsed = new PaymentProcessor(new PayPalPayment());
paypalUsed.processPayment(100);

const stripeUsed = new PaymentProcessor(new StripePayment());
stripeUsed.processPayment(100);
