// function to generate markdown for README
const fs = require('fs');
// var d = new Date();
// var date = d.getFullYear();

var today = new Date();
today.toISOString().substring(0, 10);


function generateNormRule(data) {

  let { lcshHeading, lcshTag, localHeading, localTag, subfield, vocabCode } = data



// Generate normalization rule content

  let normRule = 
`rule "Add LCSH to local tags"
priority 4
when 
(exists "${lcshTag}.${subfield}.${lcshHeading}*")
then 
addSubField "${lcshTag}.2.lcsh" if (exists "${lcshTag}.{*,0}.${subfield}.${lcshHeading}*")
copyField "${lcshTag}" to "${localTag}" if (exists "${lcshTag}.${subfield}.${lcshHeading}*")
removeSubField "${lcshTag}.2" if (exists "${lcshTag}.{*,0}")

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

addSubField "${lcshTag}.2.${vocabCode}"  if (exists "${lcshTag}.{*,7}.${subfield}.${localHeading}\\\\\\\\.")
addSubField "${lcshTag}.2.${vocabCode}"  if (exists "${lcshTag}.{*,7}.${subfield}.${localHeading}")

end

rule "Delete FAST headings"
priority 2
when 
(true)
then
removeField "${lcshTag}" if (exists "${lcshTag}.{*,7}.${subfield}.${lcshHeading}*")
end

rule "Add note"
priority 1
when
(true)
then
addField "949.a.nula" 
addSubField "949.e.jdc" if (exists "949.a.nula")
addSubField "949.c.${today.toISOString().substring(0, 10).replace(/-/g, "")}" if (exists "949.a.nula")
end
`

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
