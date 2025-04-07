import { IHubSpotWebhook, IYPareoCandidat } from './types';
import { 
  mapGenderToCode, 
  getSiteId, 
  getNationalityId, 
  getFormationId 
} from './utils/mapping';

export async function transformToYPareoFormat(hubspotData: IHubSpotWebhook): Promise<IYPareoCandidat> {
  
  // Use utility functions to get mapped values
  const siteId = await getSiteId(hubspotData.campus || hubspotData.site);
  const nationalityId = await getNationalityId(hubspotData.nationality || hubspotData.country || hubspotData.pays);
  const formationId = await getFormationId(hubspotData.formation_souhaitee || hubspotData.course || hubspotData.training);
  const civiliteCode = mapGenderToCode(hubspotData.gender);
  
  // Create YPareo candidate object
  return {
    "idSite": siteId,
    "codeCiviliteApprenant": civiliteCode,
    "nomApprenant": hubspotData.lastname || hubspotData.name || "Unknown",
    "prenomApprenant": hubspotData.firstname || "Unknown",
    "idNationalite": nationalityId,
    "adresse1Appr": hubspotData.address || hubspotData.street || "",
    "cpAppr": hubspotData.zip || hubspotData.postal_code || "",
    "villeAppr": hubspotData.city || "",
    "tel1Appr": hubspotData.phone || hubspotData.mobilephone || "",
    "emailAppr": hubspotData.email || "",
    "dateNaissance": hubspotData.birthdate,
    "idFormationSouhait1": formationId,
  };
}