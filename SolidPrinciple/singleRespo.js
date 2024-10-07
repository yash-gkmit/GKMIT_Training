// 1. Single Responsibility Principle


// Use Case :-  a single UserManager class handling user authentication, data validation, and profile management

// Before (Violates SRP):

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

