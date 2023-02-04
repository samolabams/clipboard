# Clipboard Coding Exercise

Staff Dataset API

# Features

- Add Staff to Dataset
- Delete Staff from Dataset
- Calculate All Staffs Summary Statistics
- Calculate Contract Staffs Summary Statistics
- Calculate Department Summary Statistics
- Calculate Sub Department Summary Statistics

## Installation

To run this service, you need to have the following dependencies installed:

- Docker(https://www.docker.com/products/docker-desktop/)

* Navigate to the root of the project directory
* Run the service using `docker-compose up`
* Open http://localhost:8080 on your browser to ensure the service is running
* Open http://localhost:8080/doc to access the documentation
* Enjoy

## Authentication
Bearer token is required for authentication. After the token has been gotten from the /v1/auth/login endpoint. An authorization key should be attached to the header for authenticated endpoints.

```
Authorization: Bearer {token}

```

### Login Credential
Username - test
Password - secret

## Run tests
To run test, open a new terminal in the root directory and run the command `docker-compose run --rm dataset npm test`

## High-Code Quality
To ensure high-code quality, I installed a linter to enforce best practices and to ensure that the code adheres to proper coding standards.
I structured the code into modules with clear separation of concerns; for easy maintainability.

## Important Coding Best Practices
- TDD - Practice test driven development to ensure services are error free and to also to prevent regression bugs
- Perform Code reviews
- Focus on code readability and clarity - Proper variable names, DRY (Don't repeat yourself), separation of concerns
- Implement SOLID principles
- Proper and modular code structure - Screaming architecture

### Thank You