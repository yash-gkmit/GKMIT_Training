//**************** code no. 1 *****************

class NotificationService {
    sendEmail(email, message) {
        // Sending email logic
        console.log(`Sending email to ${email}: ${message}`);
    }

    sendSMS(phoneNumber, message) {
        // Sending SMS logic
        console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    }

    logNotification(message) {
        // Logging logic
        console.log(`Logging notification: ${message}`);
    }

    notify(method, recipient, message) {
        if (method === "email") {
            this.sendEmail(recipient, message);
            this.logNotification(`Email sent to ${recipient}`);
        } else if (method === "sms") {
            this.sendSMS(recipient, message);
            this.logNotification(`SMS sent to ${recipient}`);
        } else {
            throw new Error("Unsupported notification method");
        }
    }
}

// Usage
const service = new NotificationService();
service.notify("email", "user@example.com", "Hello via Email!");

//------------------SOLID Principle violate - Single Responsibility(because here, NotificationService are responsible for handling sms, emails, notification, etc.)

//Good code-

 class sendingServices{
     sendEmail(email, message) {
        // Sending email logic
        console.log(`Sending email to ${email}: ${message}`);
    }

    sendSMS(phoneNumber, message) {
        // Sending SMS logic
        console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    }
 }

 class logService{
     logNotification(message) {
        // Logging logic
        console.log(`Logging notification: ${message}`);
    }
 }
 class notificationServices{
    constructor(emailService, smsService, logger) {
        this.emailService = emailService;
        this.smsService = smsService;
        this.logger = logger;
    }

    notify(method, recipient, message) {
        if (method === "email") {
            this.sendEmail(recipient, message);
            this.logNotification(`Email sent to ${recipient}`);
        } else if (method === "sms") {
            this.sendSMS(recipient, message);
            this.logNotification(`SMS sent to ${recipient}`);
        } else {
            throw new Error("Unsupported notification method");
        }
    }
 }


const sendService = new sendingServices();
const logger = new logService();
const notifyservice = new NotificationService(sendService.sendEmail, sendService.sendSMS, logger);
notifyservice.notify("email", "user@example.com", "Hello via Email!");

//**************** code no. 2 *****************

class ShoppingCart {
    calculateTotal(items) {
        let total = 0;
        items.forEach(item => {
            if (item.type === 'book') {
                total += item.price * 0.9; // 10% discount on books
            } else if (item.type === 'electronics') {
                total += item.price;
            }
        });
        return total;
    }
}

// Usage
const cart = new ShoppingCart();
const items = [{ type: 'book', price: 100 }, { type: 'electronics', price: 200 }];
console.log(cart.calculateTotal(items)); // Output: 290


//------------------SOLID Principle violate - 1.Single Responsibility(shopping cart responsible for both total price and discount too which violated SOLID)
//                                            2.Open closed Principle(doesnt give extension for different item discount strategy)

// Good Code

const discountApplicable{
    applydiscount(item){
         return item.price;
    }
}

class discountOnBook extends discountApplicable {
    applyDiscount(item) {
        return item.price * 0.9;
    }
}

class ShoppingCart {
    constructor() {
        this.discountApplicable = {
            book: new discountOnBook(),
        };
    }

    calculateTotal(items) {
        return items.forEach((total, item) => {
            const strategy = this.discountApplicable[item.type] || new discountApplicable();
            return total + strategy.applyDiscount(item);
        }, 0);
    }
}

// Usage
const cart = new ShoppingCart();
const items = [new Item('book', 100),new Item('electronics', 200)];
console.log(cart.calculateTotal(items));


//******************** code no. 3 ***************************

class Shape {
    area() {
        throw new Error("Method 'area()' must be implemented.");
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    constructor(side) {
        super(side, side);
    }
}

// Usage
function printArea(shape) {
    console.log(`Area: ${shape.area()}`);
}

const shape = new Square(5);
printArea(shape);

//---------------------SOLID Principle violates - there is no solid principle violation in the given code.


//******************** code no. 4 ***************************

class UserManager {
    createUser(username) {
        console.log(`User ${username} created.`);
    }

    deleteUser(userId) {
        console.log(`User ${userId} deleted.`);
    }

    resetPassword(userId) {
        console.log(`Password for user ${userId} reset.`);
    }

    sendEmail(userId, message) {
        console.log(`Sending email to user ${userId}: ${message}`);
    }
}

// Usage
const userManager = new UserManager();
userManager.createUser("john_doe");
userManager.sendEmail(1, "Welcome!");

//-------------------SOLID Principle violates here - SINGLE RESPONSIBILITY PRINCIPLE(because userManager in the above code are responsible for many jobs.)

//Good Code

class usermanager{
    createUser(username) {
        console.log(`User ${username} created.`);
    }

    deleteUser(userId) {
        console.log(`User ${userId} deleted.`);
    }
}

class passwordManager{
    resetPassword(userId) {
        console.log(`Password for user ${userId} reset.`);
    }
}

class emailManager{
    sendEmail(userId, message) {
        console.log(`Sending email to user ${userId}: ${message}`);
    }
}

const user = new usermanager();
const passwor = new passwordManager();
const email = new emailManager();

user.createUser("john_doe");
email.sendEmail(1, "Welcome!");


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
