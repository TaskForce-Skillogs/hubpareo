import { IHubSpotWebhook, IYPareoCandidat } from './types';

/**
 * Transforms a date from YYYY-MM-DD to DD/MM/YYYY format
 */
export function formatDate(dateString: string | undefined): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    return `${date.getDate().toString().padStart(2, '0')}/${
      (date.getMonth() + 1).toString().padStart(2, '0')}/${
      date.getFullYear()}`;
  } catch (e) {
    console.error('Error formatting date:', e);
    return '';
  }
}

/**
 * Transforms HubSpot webhook data to YPareo format
 */
export function transformToYPareoFormat(hubspotData: IHubSpotWebhook): IYPareoCandidat {
  // Get properties from the webhook
  const properties = hubspotData.properties || {};
  
  // Transform data to YPareo format
  return {
    "idSite": "1", // Site ID from YPareo
    "codeCiviliteApprenant": properties.gender === "male" ? 1 : 2,
    "nomApprenant": properties.lastname || properties.name || "Unknown",
    "prenomApprenant": properties.firstname || "Unknown",
    "idNationalite": "250", // Default to French nationality
    "adresse1Appr": properties.address || properties.street || "",
    "cpAppr": properties.zip || properties.postal_code || "",
    "villeAppr": properties.city || "",
    "tel1Appr": properties.phone || properties.mobilephone || "",
    "emailAppr": properties.email || "",
    "dateNaissance": formatDate(properties.date_of_birth || properties.birthdate),
    "idFormationSouhait1": "123", // Map to appropriate formation ID
  };
}