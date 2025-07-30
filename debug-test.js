const fs = require('fs');
const path = require('path');

// Read and parse the test webhook data
const testData = JSON.parse(fs.readFileSync('./test-webhook.json', 'utf8'));

console.log('Test webhook data structure:');
console.log('Properties expected by transformer:', [
  'site', 'nationalite', 'formation_souhaitee', 'status', 'year', 'civilite',
  'pays', 'origine_scolaire', 'diplome_obtenu', 'etablissement_scolaire',
  'nom', 'prenom', 'ine', 'nom_jeune_fille', 'adresse_postale', 'adresse2',
  'code_postal_', 'city', 'telephone_portable', 'email', 'pays_parents',
  'civilite_representant_legal', 'nom_du_parent_1', 'prenom_du_parent_1',
  'adresse_parents', 'adresse2_representant_legal', 'code_postal_parents',
  'ville_parents', 'telephone_du_parent_1', 'email_du_parent_1',
  'dateNaissance', 'ville_de_naissance', 'departement_de_naissance',
  'paysNaissance', 'travailleur_handicape', 'is_mobile', 'permis_conduire'
]);

console.log('\nActual properties in test data:', Object.keys(testData));

console.log('\nMissing properties:');
const expectedProps = [
  'site', 'nationalite', 'formation_souhaitee', 'status', 'year', 'civilite',
  'pays', 'origine_scolaire', 'diplome_obtenu', 'etablissement_scolaire',
  'nom', 'prenom', 'ine', 'nom_jeune_fille', 'adresse_postale', 'adresse2',
  'code_postal_', 'city', 'telephone_portable', 'email', 'pays_parents',
  'civilite_representant_legal', 'nom_du_parent_1', 'prenom_du_parent_1',
  'adresse_parents', 'adresse2_representant_legal', 'code_postal_parents',
  'ville_parents', 'telephone_du_parent_1', 'email_du_parent_1',
  'dateNaissance', 'ville_de_naissance', 'departement_de_naissance',
  'paysNaissance', 'travailleur_handicape', 'is_mobile', 'permis_conduire'
];

const actualProps = Object.keys(testData);
const missingProps = expectedProps.filter(prop => !actualProps.includes(prop));
console.log(missingProps);

console.log('\nExtra properties in test data:');
const extraProps = actualProps.filter(prop => !expectedProps.includes(prop));
console.log(extraProps);
