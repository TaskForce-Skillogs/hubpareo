import ypareoClient from '../services/ypareoClient';

export function mapGenderToCode(gender?: string): number {
  if (!gender) return 0;
  
  const normalizedGender = gender.toLowerCase().trim();
  
  switch (normalizedGender) {
    case 'homme':
    case 'm.':
      return 1;
    case 'femme':
    case 'mme':
      return 2;
    default:
      return 0;
  }
}


export async function getSiteId(siteName?: string): Promise<string> {
  if (!siteName) return "";
  
  await ypareoClient.initialize();
  return ypareoClient.getSiteIdByName(siteName);
}

export async function getNationalityId(countryName?: string): Promise<string> {
  if (!countryName) return "876"; // Default unknown nationality ID in YPareo
  
  await ypareoClient.initialize();
  return ypareoClient.getNationalityIdByCountry(countryName);
}

export async function getFormationId(formationName?: string): Promise<string> {
    if (!formationName) return "123"; 
  
  await ypareoClient.initialize();
  return ypareoClient.getFormationIdByName(formationName);
}

export async function getStatusId(statusName?: string): Promise<string> {
  if (!statusName) return "";
  
  await ypareoClient.initialize();
  return ypareoClient.getStatusIdByName(statusName);
}

export async function getYearId(yearName?: string): Promise<string> {
  if (!yearName) return "";

  await ypareoClient.initialize();
  return ypareoClient.getYearIdByName(yearName);
}

export async function getCountryId(countryName?: string): Promise<string> {
  if (!countryName) return "250"; // Default to France
  
  await ypareoClient.initialize();
  return ypareoClient.getCountryIdByName(countryName);
}

export async function getIdOrigineScolaireByName(origine?: string): Promise<string> {
  if (!origine) return "0";
  
  await ypareoClient.initialize();
  return ypareoClient.getIdOrigineScolaireByName(origine);
}

export async function getIdDiplomeObtenuByName(diplome?: string): Promise<string> {
  if (!diplome) return "0";

  await ypareoClient.initialize();
  return ypareoClient.getIdDiplomeObtenuByName(diplome);
}

export async function getIdEtablissementScolaireByName(etablissement?: string): Promise<string> {
  if (!etablissement) return "0";

  await ypareoClient.initialize();
  return ypareoClient.getIdEtablissementScolaireByName(etablissement);
}