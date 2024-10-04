// 1. Single Responsibility Principle

//Use Case :-  a single UserManager class handling user authentication, data validation, and profile management

//Before (Violates SRP):

class UserManager {
  constructor(authService, db) {
    this.authService = authService;
    this.db = db;
  }
  authenticate(username, password) {
    // Authentication logic using authService
  }
  validateUserData(data) {
    // Data validation logic
  }
  createUserProfile(data) {
    // Profile creation logic using db
  }
  getUserProfile(userId) {
    // Profile retrieval logic using db
  }
}

// After (SRP Applied):

class AuthenticationService {
  authenticate(username, password) {
    // Authentication logic
  }
}
class UserDataValidator {
  validate(data) {
    // Data validation logic
  }
}
class UserDatabase {
  createUserProfile(data) {
    // Profile creation logic
  }
  getUserProfile(userId) {
    // Profile retrieval logic
  }
}

// 2. Open/Closed Principle

/*Use Case :-  Create an AbstractShape interface with methods for calculating area and perimeter. Concrete shapes like Circle and Square can implement this interface without modifying the original code.*/

// Before (Violates OCP):

class ManageSalaries {
  constructor() {
    this.salaryRates = [
      { id: 1, role: 'developer', rate: 100 },
      { id: 2, role: 'architect', rate: 200 },
      { id: 3, role: 'manager', rate: 300 },
    ];
  }
  calculateSalaries(empId, hoursWorked) {
    let salaryObject = this.salaryRates.find((o) => o.id === empId);
    return hoursWorked * salaryObject.rate;
  }
}
const mgtSalary = new ManageSalaries();
console.log("Salary : ", mgtSalary.calculateSalaries(1, 100));

// After (OCP Applied):

class ManageSalaries {
  constructor() {
    this.salaryRates = [
      { id: 1, role: 'developer', rate: 100 },
      { id: 2, role: 'architect', rate: 200 },
      { id: 3, role: 'manager', rate: 300 },
    ];
  }
  calculateSalaries(empId, hoursWorked) {
    let salaryObject = this.salaryRates.find((o) => o.id === empId);
    return hoursWorked * salaryObject.rate;
  }
  addSalaryRate(id, role, rate) {
    this.salaryRates.push({ id: id, role: role, rate: rate });
  }
}
const mgtSalary = new ManageSalaries();
mgtSalary.addSalaryRate(4, 'developer', 250);
console.log('Salary : ', mgtSalary.calculateSalaries(4, 100));
}

// 3. Liskov’s Substitution Principle

//UseCase:-   If a function expects a Shape object to calculate its area, any valid subtype like Circle or Square should seamlessly replace it, maintaining the expected behavior.

// Before (LSP Violates):

interface Shape {
  calculateArea(): number;
}
class Rectangle implements Shape {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  calculateArea(): number {
    return this.width * this.height;
  }
}
class Square extends Rectangle {
  constructor(size: number) {
    super(size, size);
  }
  setWidth(width: number) {
    this.width = width;
    this.height = width;
  }
  setHeight(height: number) {
    this.width = height; 
    this.height = height;
  }
}

function drawShape(shape: Shape) {
  const area = shape.calculateArea();
}
const mySquare = new Square(5);
mySquare.setWidth(4); 
drawShape(mySquare); 

// (LSP Applied):
  
interface Shape {
  calculateArea(): number;
}
class Rectangle implements Shape
{
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  calculateArea(): number {
    return this.width * this.height;
  }
}

function drawShape(shape: Shape) {
  const area = shape.calculateArea();
}
drawShape(new Rectangle(5, 4)); 


// 4. Interface Segregation Principle

/* Use Case:-Instead of a single UserInterface with methods for both admin and user features, create separate interfaces (AdminInterface and UserInterface) exposing only relevant methods for each type of user.*/

// Before (Violates ISP):

Class DrivingTest {
  constructor(userType) {
    this.userType = userType;
  }
  startCarTest() {
    console.log(“This is for Car Drivers”’);
  }
  startTruckTest() {
    console.log(“This is for Truck Drivers”);
  }
}

class CarDrivingTest extends DrivingTest {
  constructor(userType) {
    super(userType);
  }
  startCarTest() {
    return “Car Test Started”;
  }
  startTruckTest() {
    return null;
  }
}

class TruckDrivingTest extends DrivingTest {
  constructor(userType) {
    super(userType);
  }
  startCarTest() {
    return null;
  }
  startTruckTest() {
    return “Truck Test Started”;
  }
}

const carTest = new CarDrivingTest(carDriver );
console.log(carTest.startCarTest());
console.log(carTest.startTruckTest());
const truckTest = new TruckDrivingTest( ruckdriver );
console.log(truckTest.startCarTest());
console.log(truckTest.startTruckTest());

// After (ISP Applied):

Class DrivingTest {
  constructor(userType) {
    this.userType = userType;
  }
}

class CarDrivingTest extends DrivingTest {
  constructor(userType) {
    super(userType);
  }
}

class TruckDrivingTest extends DrivingTest {
  constructor(userType) {
    super(userType);
  }
}

const carUserTests = {
  startCarTest() {
    return ‘Car Test Started’;
  },
}

const truckUserTests = {
  startTruckTest() {
    return ‘Truck Test Started’;
  },
}

Object.assign(CarDrivingTest.prototype, carUserTests);
Object.assign(TruckDrivingTest.prototype, truckUserTests);
const carTest = new CarDrivingTest(carDriver );
console.log(carTest.startCarTest());
console.log(carTest.startTruckTest()); // Will throw an exception
const truckTest = new TruckDrivingTest( ruckdriver );
console.log(truckTest.startTruckTest());
console.log(truckTest.startCarTest()); // Will throw an exception

// 5. Dependency Inversion Principle

//Instead of directly referencing a specific data storage implementation in your application logic, rely on an abstract DataStore interface.

// Before (Violates DIP):

class EmailController {
  sendEmail(emailDetails) {
     // Need to change this line in every controller that uses YahooAPI.const response = YahooAPI.sendEmail(emailDetails);
    if (response.status == 200) {
       return true;
    } else {
       return false;
    }
  }
}

// After (DIP Applied):
class EmailController {
  sendEmail(emailDetails) {
    const response = EmailApiController.sendEmail(emailDetails);
    if (response.status == 200) {
       return true;
    } else {
       return false;
    }
  }
}
class EmailApiController {
  sendEmail(emailDetails) {
    // Only need to change this controller. return YahooAPI.sendEmail(emailDetails);
  }
}