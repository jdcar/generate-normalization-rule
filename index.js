const inquirer = require('inquirer');
const generateNormRule = require('./utils/generateNormRule.js')

const questions = [

    {
        type: 'input',
        message: 'What is the LCSH heading?',
        name: "lcshHeading",
    },
    {
        type: 'input',
        message: 'What is the LCSH tag?',
        name: "lcshTag",
    },
    {
        type: 'input',
        message: 'What is the new local heading?',
        name: "localHeading",
    },
    {
        type: 'input',
        message: 'What is the new local tag?',
        name: "localTag",
    },
    {
        type: 'checkbox',
        message: 'Which subfield is the lcsh heading?',
        name: "subfield",
        choices: ['a', 'x']
    },
    {
        type: 'input',
        message: 'What is the vocabulary code?',
        name: "vocabCode",
    },

]

function writeToFile(fileName, data) { 

    inquirer
        .prompt(questions)
        .then((data) => {

            // writeToFile()
            console.log(generateNormRule(data))

        })

} 

function init() { 
    writeToFile()

} 

init(); 
