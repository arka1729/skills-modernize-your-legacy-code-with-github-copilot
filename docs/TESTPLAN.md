# COBOL Student Account Management System - Test Plan

This test plan covers all business logic implemented in the COBOL application for student account management. It is designed for validation with business stakeholders and will be used as a basis for future unit and integration tests in a Node.js app.

| Test Case ID | Test Case Description                | Pre-conditions                | Test Steps                                                                 | Expected Result                                      | Actual Result | Status (Pass/Fail) | Comments         |
|--------------|--------------------------------------|-------------------------------|----------------------------------------------------------------------------|------------------------------------------------------|--------------|--------------------|------------------|
| TC01         | View current balance                 | Initial balance is 1000.00    | 1. Start app<br>2. Select 'View Balance' (1)                               | Balance displayed as 1000.00                          |              |                    |                  |
| TC02         | Credit account with valid amount     | Balance >= 0                  | 1. Start app<br>2. Select 'Credit Account' (2)<br>3. Enter 200.00          | Balance updated to 1200.00<br>Success message shown  |              |                    |                  |
| TC03         | Debit account with sufficient funds  | Balance >= debit amount       | 1. Start app<br>2. Select 'Debit Account' (3)<br>3. Enter 500.00           | Balance updated to 500.00<br>Success message shown   |              |                    |                  |
| TC04         | Debit account with insufficient funds| Balance < debit amount        | 1. Start app<br>2. Select 'Debit Account' (3)<br>3. Enter 2000.00          | Error message: 'Insufficient funds for this debit.'   |              |                    |                  |
| TC05         | Exit application                     | App running                   | 1. Start app<br>2. Select 'Exit' (4)                                        | App exits gracefully<br>Goodbye message shown         |              |                    |                  |
| TC06         | Invalid menu choice                  | App running                   | 1. Start app<br>2. Enter invalid choice (e.g., 5)                           | Error message: 'Invalid choice, please select 1-4.'   |              |                    |                  |
| TC07         | Credit account with zero amount      | Balance >= 0                  | 1. Start app<br>2. Select 'Credit Account' (2)<br>3. Enter 0.00            | Balance unchanged<br>Success message shown            |              |                    |                  |
| TC08         | Debit account with zero amount       | Balance >= 0                  | 1. Start app<br>2. Select 'Debit Account' (3)<br>3. Enter 0.00             | Balance unchanged<br>Success message shown            |              |                    |                  |

> Fill in Actual Result, Status, and Comments during test execution.
