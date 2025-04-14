import { IHubSpotWebhook, IYPareoCandidat } from './types';
import { 
  mapGenderToCode, 
  getSiteId, 
  getNationalityId, 
  getFormationId 
} from './utils/mapping';

export async function transformToYPareoFormat(hubspotData: IHubSpotWebhook): Promise<IYPareoCandidat> {
  
  const siteId = await getSiteId(hubspotData.site);
  const nationalityId = await getNationalityId(hubspotData.nationalite);
  const formationId = await getFormationId(hubspotData.campus_souhaite);
  const civiliteCode = mapGenderToCode(hubspotData.civilite);
  
  return {
    "idSite": siteId,
    "codeCiviliteApprenant": civiliteCode,
    "nomApprenant": hubspotData.nom,
    "prenomApprenant": hubspotData.prenom,
    "idNationalite": nationalityId,
    "adresse1Appr": hubspotData.adresse_postale,
    "villeAppr": hubspotData.city,
    "tel1Appr": hubspotData.telephone_portable,
    "emailAppr": hubspotData.email,
    "dateNaissance": hubspotData.dateNaissance,
    "idFormationSouhait1": formationId,
  };
}