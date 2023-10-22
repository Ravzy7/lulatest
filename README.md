# Lula Test
Test Task for Lula

Welcome to the Lula Test repository. This repository contains a test task completed for Lula.

## Running the Automated Tests
To run the automated tests, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/YourUsername/lulatest.git
cd lulatest
```

### 2. Initialize Playwright
```bash
npm init playwright@latest
```

During initialization, make sure to select the following settings:

- TypeScript
- Where to put your end-to-end tests: `tests`
- Add a GitHub Actions workflow: `false`
- Install Playwright browsers: `true`
- "directory" already exists. Override it? `false`

### 3. Install Playwright Browsers
```bash
npm install playwright
```

### 4. Delete Example Tests (if they exist)
Please delete the following files as they are created when Playwright is initialized:

- `example.spec.ts`
- `demo-todo-app.spec.ts`

### 5. Configure Test Data with dotenv
To set up test data, you'll need to use the `dotenv` package. First, install it:

```bash
npm install dotenv
```

Next, create a file called `.env` in the root of the project and paste the following data for a 100% pass rate:

```dotenv
BASE_URL=https://www.saucedemo.com/
USERNAME1=standard_user
USERNAME2=performance_glitch_user
PASSWORD=secret_sauce
```

### 6. Execute Tests

#### Run Tests in UI Mode (Graphical Interface)
To run the tests in UI mode with a graphical interface, use the following command in the terminal:

```bash
npx playwright test --ui
```

#### Run Tests in Terminal Mode
To run the tests in the terminal, use the following command:

```bash
npx playwright test
```

### 7. View Test Report
To view a test report, run the tests in the terminal (using the command above) and then execute the following command:

```bash
npx playwright show-report
```

Happy Hacking! If you have any questions or encounter any issues, feel free to reach out.
