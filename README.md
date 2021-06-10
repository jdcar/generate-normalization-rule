# Generate normalization rule [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Table of Contents
* [Description](#description)
* [Installation Instructions](#installation-instructions)
* [Usage Instructions](#usage-instructions)
* [License](#license)
* [Questions](#questions)
## Description
A command line app that generates a normalization rule for https://github.com/nulib/NULA .
This rule flips the LCSH heading to the NULA heading. It also moves the LCSH heading to a local field so it can be keyword searched in Primo.
## Installation Instructions
Clone down the repository and NPM install. Run the app with "node index.js."
## Usage Instructions
Run with 'node index.js'
Command line will prompt these questions:
? What is the LCSH heading? 
? What is the LCSH tag? 
? What is the new local heading? 
? What is the new local tag? 
? Which subfield is the lcsh heading? 
? What is the vocabulary code? 

The normalization rule will:
1. Copy the original LCSH and FAST subjects into another field
2. Adds $2 lcsh to the LCSH heading
3. Replaces the old subject term with the new subject term
4. Changes the second indicator to 7
5. Adds $2 for subject vocabulary of new term
4. Deletes the original FAST heading (there will be a copy of the FAST heading in the local field)

Recommend you test any normalization rule in your Alma sandbox.
## License
MIT. Copyright (c) 2021 Jamie Carlstone
## Questions
* https://github.com/jdcar
* Email: 