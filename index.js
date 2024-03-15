const inquirer = require('inquirer');
const fs = require('fs');

function GenerateMdFile(data) {
    let tableOfContents = '';

    if (data.installation) tableOfContents += '- [Installation](#-Installation)\n';
    if (data.usage) tableOfContents += '- [Usage](#-Usage)\n';
    if (data.license) tableOfContents += '- [License](#-License)\n';
    if (data.contributing) tableOfContents += '- [Contributing](#-Contributing)\n';
    if (data.tests) tableOfContents += '- [Tests](#-Tests)\n';
    tableOfContents += '- [Questions](#-Questions)\n';

    return `
# ${data.title} 

# Description
${data.description}

# Table of Contents
${tableOfContents}

# Installation
${data.installation || 'No installation instructions provided.'}

# Usage
${data.usage || 'No usage instructions provided.'}

# License
This application is covered under the ${data.license} license.

# Contributing
${data.contributing || 'No contribution guidelines provided.'}

# Tests
${data.tests || 'No testing instructions provided.'}

# Questions
GitHub: [${data.gitHubUsername}](https://github.com/${data.gitHubUsername})
Email: ${data.userEmail}
`;
}

function validateInput(value) {
    return value !== "" ? true : "Please provide a valid input.";
}

inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title for your project?'
        },
        {
            type: "input",
            name: "description",
            message: "Please enter a description of your project.",
            validate: validateInput,
        },
        {
            type: "input",
            name: "installation",
            message: "Please enter an explanation how to install the software, or commands for the program.",
            validate: validateInput,
        },
        {
            type: "input",
            name: "usage",
            message: "Please describe how we can use this program/project.",
            validate: validateInput,
        },
        {
            type: "list",
            name: "license",
            message: "Please select a license for this project.",
            choices: [
                "MIT License",
                "GNU General Public License v3.0 (GPL-3.0)",
                "Apache License 2.0",
                "GNU General Public License v2.0 (GPL-2.0)",
                "BSD 3-Clause 'New' or 'Revised' License",
                "GNU Lesser General Public License v3.0 (LGPL-3.0)",
                "MIT No Attribution License (MIT-0)",
                "Mozilla Public License 2.0 (MPL-2.0)",
                "ISC License (ISC)",
                "GNU Affero General Public License v3.0 (AGPL-3.0)"
            ],
            validate: validateInput,
        },
        {
            type: "input",
            name: "contributing",
            message: "How can users contribute to your project.",
            validate: validateInput,
        },
        {
            type: "input",
            name: "tests",
            message: "Please enter any testing instructions you would like to provide for this project.",
            validate: validateInput,
        },
        {
            type: "input",
            name: "gitHubUsername",
            message: "What is your GitHub username?",
            validate: validateInput,
        },
        {
            type: "input",
            name: "userEmail",
            message: "What is your GitHub email address that contributors may contact?",
            validate: function (value) {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                    return true;
                } else {
                    return "Not a valid email address. Please enter a valid email address.";
                }
            },
        },
    ])
    .then(data => {
        const filename = 'README.md';

        fs.writeFile(filename, GenerateMdFile(data), (err) =>
            err ? console.log(err) : console.log('the README file has been generated')
        );
    });
