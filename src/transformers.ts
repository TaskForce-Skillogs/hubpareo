import { IHubSpotWebhook, IYPareoCandidat } from './types';
import ypareoClient from './services/ypareoClient';

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    return `${date.getDate().toString().padStart(2, '0')}/${
      (date.getMonth() + 1).toString().padStart(2, '0')}/${
      date.getFullYear()}`;
  } catch (e) {
    console.error('Erreur de formatage de date:', e);
    return '';
  }
}

export async function transformToYPareoFormat(hubspotData: IHubSpotWebhook): Promise<IYPareoCandidat> {

  await ypareoClient.initialize();
  
  let properties = hubspotData.properties || {};
  
  if (hubspotData.object && hubspotData.object.properties) {
    properties = hubspotData.object.properties;
  }
  
  const siteId = ypareoClient.getSiteIdByName(properties.campus || properties.site || "");
  const nationalityId = ypareoClient.getNationalityIdByCountry(properties.nationality || properties.country || properties.pays || "");
  
  return {
    "idSite": siteId,
    "codeCiviliteApprenant": properties.gender === "male" ? 1 : 2,
    "nomApprenant": properties.lastname || properties.name || "Unknown",
    "prenomApprenant": properties.firstname || "Unknown",
    "idNationalite": nationalityId,
    "adresse1Appr": properties.address || properties.street || "",
    "cpAppr": properties.zip || properties.postal_code || "",
    "villeAppr": properties.city || "",
    "tel1Appr": properties.phone || properties.mobilephone || "",
    "emailAppr": properties.email || "",
    "dateNaissance": formatDate(properties.date_of_birth || properties.birthdate),
    "idFormationSouhait1": "123", 
  };
}