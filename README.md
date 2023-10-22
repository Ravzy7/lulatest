# Lula Test
Test Task for Lula

Hi there and thanks for your time checking out my repo. 

<hr/>
This is a test task done for Lula
<hr/>

<h3>Running the Automated tests<h3/>
To run the tests please first clone the repositopry.

<h3>After cloning:<h3/>
<h4>Initialize Playwright:<h4/>

npm init playwright@latest 

when intializing and following the prompts in the terminal ensure you use the following settings:
Please use the Following Commands within your terminal, 

? Do you want to use TypeScript or JavaScript? ... 
> TypeScript

? Where to put your end-to-end tests? 
> tests 

? Add a GitHub Actions workflow? (y/N) 
> false

? Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) 
> true

? "directory" already exists. Override it? (y/N) 
> false

<h4>Install playwright browsers:</h4>

npm install playwright


Please Delete the (they are created when playwright is initilzed):
example.spec.ts
demo-todo-app.spec.ts


<h4>For Quick test data i used dotenv:<h4>
npm install dotenv

please use the following test data:
in the root of the project create a file called ".env" .

paste the Following data for 100% pass rate:

BASE_URL=https://www.saucedemo.com/
USERNAME1= standard_user
USERNAME2= performance_glitch_user
PASSWORD= secret_sauce

<h3>Executing tests<h3/>

To run the tests in UI mode please use the following command in the terminal : 

npx playwright test --ui

To run the tests within the terminal please use the following command :

npx playwright test

and to view a report , Run the tests in the terminal (use the above command) and then use the following command: 

npx playwright show-report

Happy Hacking
