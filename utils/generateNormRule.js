// function to generate markdown for README
const fs = require('fs');
var d = new Date();
var year = d.getFullYear();


function generateNormRule(data) {

  let { lcshHeading, lcshTag, localHeading, localTag, subfield, vocabCode } = data



// Generate normalization rule content

  let normRule = 
`rule "Delete FAST headings"
priority 2
when 
(true)
then
removeField "${lcshTag}" if (exists "${lcshTag}.{-,7}.${subfield}.${lcshHeading}*")
end

rule "Flip from LCSH to NULA"
priority 3
when
(true)
then
replaceContents "${lcshTag}.${subfield}.${lcshHeading}\\\\\\\\." with "${localHeading}." if(exists "${lcshTag}.{*,0}.${subfield}.${lcshHeading}\\\\\\\\.")
replaceContents "${lcshTag}.${subfield}.${lcshHeading}" with "${localHeading}" if(exists "${lcshTag}.{*,0}.${subfield}.${lcshHeading}")
changeSecondIndicator "${lcshTag}" to "7" if (exists "${lcshTag}.${subfield}.${localHeading}\\\\\\\\.")
changeSecondIndicator "${lcshTag}" to "7" if (exists "${lcshTag}.${subfield}.${localHeading}")
removeSubField "${lcshTag}.2" if (exists "${lcshTag}.{-,7}")
addSubField "${lcshTag}.2.${vocabCode}"  if (exists "${lcshTag}.{-,7}.${subfield}.${localHeading}\\\\\\\\.")
addSubField "${lcshTag}.2.${vocabCode}"  if (exists "${lcshTag}.{-,7}.${subfield}.${localHeading}")
end

rule "Add LCSH to local tags"
priority 4
when 
(exists "${lcshTag}.${subfield}.${lcshHeading}*")
then 
copyField "${lcshTag}" to "${localTag}" if (exists "${lcshTag}.${subfield}.${lcshHeading}*")
end

rule "add $2 lcsh to lcsh headings"
priority 5
when 
(true)
then
addSubField "${lcshTag}.2.lcsh"  if (exists "${lcshTag}.{-,0}.${subfield}.${lcshHeading}\\\\\\\\.")
addSubField "${lcshTag}.2.lcsh"  if (exists "${lcshTag}.{-,0}.${subfield}.${lcshHeading}")
end`

// Create a readme file
  fs.writeFile('generated-normalization-rule.txt', normRule, (err) => {
    if (err) {
      console.log("Error");
    }
    else {
      console.log("Normalization rule generated!")
    }
  });

}




module.exports = generateNormRule;
