import { IHubSpotWebhook, IYPareoCandidat } from './types';
import { 
  mapGenderToCode, 
  getSiteId, 
  getNationalityId, 
  getFormationId 
} from './utils/mapping';

export async function transformToYPareoFormat(hubspotData: IHubSpotWebhook): Promise<IYPareoCandidat> {
  
  const siteId = await getSiteId(hubspotData.site);
  const nationalityId = await getNationalityId(hubspotData.nationality || hubspotData.country || hubspotData.pays);
  const formationId = await getFormationId(hubspotData.formation_souhaitee);
  const civiliteCode = mapGenderToCode(hubspotData.civilite);
  
  return {
    "idSite": siteId,
    "codeCiviliteApprenant": civiliteCode,
    "nomApprenant": hubspotData.lastname,
    "prenomApprenant": hubspotData.firstname,
    "idNationalite": nationalityId,
    "adresse1Appr": hubspotData.address,
    "cpAppr": hubspotData.zip,
    "tel1Appr": hubspotData.phone,
    "emailAppr": hubspotData.email,
    "dateNaissance": hubspotData.birthDate,
    "idFormationSouhait1": formationId,
  };
}