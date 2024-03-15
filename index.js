const inquirer = require('inquirer');
const fs = require('fs');

function generateLicenseBadge(license) {
    let badge = '';
    switch (license) {
        case "MIT License":
            badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
            break;
        case "GNU General Public License v3.0 (GPL-3.0)":
            badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
            break;
        case "Apache License 2.0":
            badge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
            break;
        case "GNU General Public License v2.0 (GPL-2.0)":
            badge = '[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/gpl-2.0)';
            break;
        case "BSD 3-Clause 'New' or 'Revised' License":
            badge = '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
            break;
        case "GNU Lesser General Public License v3.0 (LGPL-3.0)":
            badge = '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)';
            break;
        case "MIT No Attribution License (MIT-0)":
            badge = '[![License: MIT-0](https://img.shields.io/badge/License-MIT--0-blue.svg)](https://opensource.org/licenses/MIT-0)';
            break;
        case "Mozilla Public License 2.0 (MPL-2.0)":
            badge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
            break;
        case "ISC License (ISC)":
            badge = '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)';
            break;
        case "GNU Affero General Public License v3.0 (AGPL-3.0)":
            badge = '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)';
            break;
        default:
            badge = '';
    }
    return badge;
}

function GenerateMdFile(data) {
    let tableOfContents = '';

    // Generate Table of Contents
    if (data.installation) tableOfContents += '- [Installation](#-Installation)\n';
    if (data.usage) tableOfContents += '- [Usage](#-Usage)\n';
    if (data.license) tableOfContents += '- [License](#-License)\n';
    if (data.contributing) tableOfContents += '- [Contributing](#-Contributing)\n';
    if (data.tests) tableOfContents += '- [Tests](#-Tests)\n';
    tableOfContents += '- [Questions](#-Questions)\n';

    const licenseBadge = generateLicenseBadge(data.license);

    return `
# ${data.title} ${licenseBadge}

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
        const filename = 'exampleREADME.md';

        fs.writeFile(filename, GenerateMdFile(data), (err) =>
            err ? console.log(err) : console.log('the README file has been generated')
        );
    });
