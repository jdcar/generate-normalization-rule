// function to generate markdown for README
const fs = require('fs');
var d = new Date();
var year = d.getFullYear();


function generateNormRule(data) {

  let { lcshHeading, lcshTag, localHeading, localTag, subfield, vocabCode } = data



// Generate normalization rule content

  let normRule = `
  rule "Delete FAST headings"
  \npriority 2
  \nwhen 
  \n(true)
  \nthen
  \nremoveField "${lcshTag}" if (exists "${lcshTag}.{-,7}.${subfield}.${lcshHeading}*")

  \nend

  \nrule "Flip from LCSH to NULA"
  \npriority 3
  \nwhen
  \n(true)
  \nthen
  \nreplaceContents "${lcshTag}.${subfield}.${lcshHeading}\\\\\\\\." with "${localHeading}." if(exists "${lcshTag}.{*,0}.${subfield}.${lcshHeading}\\\\\\\\.")
  \nreplaceContents "${lcshTag}.${subfield}.${lcshHeading}" with "${localHeading}" if(exists "${lcshTag}.{*,0}.${subfield}.${lcshHeading}")
  \nchangeSecondIndicator "${lcshTag}" to "7" if (exists "${lcshTag}.${subfield}.${localHeading}\\\\\\\\.")
  \nchangeSecondIndicator "${lcshTag}" to "7" if (exists "${lcshTag}.${subfield}.${localHeading}")
  \nremoveSubField "${lcshTag}.2" if (exists "${lcshTag}.{-,7}")
  \naddSubField "${lcshTag}.2.${vocabCode}"  if (exists "${lcshTag}.{-,7}.${subfield}.${localHeading}\\\\\\\\.")
  \naddSubField "${lcshTag}.2.${vocabCode}"  if (exists "${lcshTag}.{-,7}.${subfield}.${localHeading}")
  \nend
  \nrule "Add LCSH to local tags"
  \npriority 4
  \nwhen 
  \n(exists "${lcshTag}.${subfield}.${lcshHeading}*")
  \nthen 
  \ncopyField "${lcshTag}" to "${localTag}" if (exists "${lcshTag}.${subfield}.${lcshHeading}*")
  \nend
  \nrule "add $2 lcsh to lcsh headings"
  \npriority 5
  \nwhen 
  \n(true)
  \nthen
  \naddSubField "${lcshTag}.2.lcsh"  if (exists "${lcshTag}.{-,0}.${subfield}.${lcshHeading}\\\\\\\\.")
  \naddSubField "${lcshTag}.2.lcsh"  if (exists "${lcshTag}.{-,0}.${subfield}.${lcshHeading}")

  \nend
  `

// Create a readme file
  fs.writeFile('generated-normalization-rule.md', normRule, (err) => {
    if (err) {
      console.log("Error");
    }
    else {
      console.log("Normalization rule generated!")
    }
  });

}




module.exports = generateNormRule;
