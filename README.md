# Lula Test
Test Task for Lula

Welcome to the Lula Test repository. This repository contains a test task completed for Lula.

## Running the Automated Tests

You don't need any previous automation experience to run these tests. Follow these simple steps:

### 1. Clone the Repository
Start by copying the code from this repository to your own computer. Open a terminal (a text-based window on your computer) and type the following command:

```bash
git clone https://github.com/YourUsername/lulatest.git
cd lulatest
```

Press Enter, and it will copy everything you need to your computer.

### 2. Install Node.js (If Not Installed)
If you don't already have Node.js installed on your computer, you can download it from [Node.js website](https://nodejs.org/). Follow the installation instructions.

### 3. Run Initialization Command
In your terminal, type the following command to set up the testing environment:

```bash
npm init playwright@latest
```

Press Enter and follow the prompts. When asked for options, choose the following:

- Do you want to use TypeScript or JavaScript? `TypeScript`
- Where to put your end-to-end tests: `tests`
- Add a GitHub Actions workflow: `false`
- Install Playwright browsers: `true`
- "directory" already exists. Override it? `false`

MOM (Moment of Making): At this point, you've just created the foundation for automated testing with Playwright, and we're about to set up the data needed for testing.

### 4. Install Playwright Browsers
Now, install the necessary tools by typing this command:

```bash
npm install playwright
```

This command will install the software required for running tests.

### 5. Configure Test Data with dotenv (POM Pattern)
We'll set up the data needed for testing using dotenv, which follows the Page Object Model (POM) pattern. Copy the following lines:

```dotenv
BASE_URL=https://www.saucedemo.com/
USERNAME1=standard_user
USERNAME2=performance_glitch_user
PASSWORD=secret_sauce
```

Open a text editor (like Notepad) and paste the lines into a new file. Save the file as `.env` (with the dot at the beginning) in the same folder as the project.

### 6. Run Npm fund , to fund the projects


```bash
npm fund
```



### 7. Run the Tests

#### Option 1: Graphical Interface
If you prefer a user-friendly interface, run this command:

```bash
npx playwright test --ui
```

This will open a window where you can see the tests being executed.

#### Option 2: Terminal
For a simpler, text-based approach, run:

```bash
npx playwright test
```

### 8. View Test Report

To view a report of the test results, open the terminal and run:

```bash
npx playwright show-report
```

That's it! You've successfully run the tests, following the Page Object Model pattern using dotenv. If you have any questions, don't hesitate to ask. Happy testing!
