const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeInformation = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//thanks to Vol who taught our study group how to use these excellent "when" properties!
//this is just an array of questions to ask the user
const questions = [
  {
    type: "list",
    message: "What is your role?",
    name: "role",
    choices: ["Engineer", "Intern", "Manager"],
  },
  {
    type: "input",
    message: "What is your name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your ID?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your GitHub?",
    name: "github",
    when: (response) => response.role === "Engineer",
  },
  {
    type: "input",
    message: "What school do you attend?",
    name: "school",
    when: (response) => response.role === "Intern",
  },
  {
    type: "input",
    message: "What is your office number?",
    name: "officeNumber",
    when: (response) => response.role === "Manager",
  },
  {
    type: "confirm",
    message: "Do you want to add more team members?",
    name: "done",
  },
];

//this function creates new employees based on the information the user provides and passes in their answers into those constructors.
function showStarter(response) {
  let employee;
  if (response.role === "Engineer") {
    employee = new Engineer(
      response.name,
      response.id,
      response.email,
      response.github
    );
  } else if (response.role === "Manager") {
    employee = new Manager(
      response.name,
      response.id,
      response.email,
      response.officeNumber
    );
  } else if (response.role === "Intern") {
    employee = new Intern(
      response.name,
      response.id,
      response.email,
      response.school
    );
  }
  employeeInformation.push(employee);
  //the above line pushes the employee information into an empty array
  //the code below checks if the user would like to add more members, which runs the function again.
  //if the user says no, the entire array is rendered as HTML and written to a file called "team.html"
  if (response.done) {
    console.log("I want to add more team members");
    return inquirer.prompt(questions).then(showStarter);
  } else {
    console.log(
      "Please navigate to team.html in the develop folder to see the below members added."
    );
  }
  fs.writeFileSync(outputPath, render(employeeInformation), "utf-8");
}
inquirer
  .prompt(questions)
  .then(showStarter)
  .catch(function (error) {
    console.log(err);
  });

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
