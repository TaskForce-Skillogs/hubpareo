import { IHubSpotWebhook, IYPareoCandidat } from './types';
import { 
  getNationalityId, 
  getFormationId,
  getSiteId,
  mapGenderToCode,
  getStatusId,
  getYearId,
  getCountryId,
  getIdOrigineScolaireByName,
  getIdDiplomeObtenuByName,
  getIdEtablissementScolaireByName
} from './utils/mapping';

export async function transformToYPareoFormat(hubspotData: IHubSpotWebhook): Promise<IYPareoCandidat> {

  const siteId = await getSiteId(hubspotData.site);
  const nationalityId = await getNationalityId(hubspotData.nationalite);
  const formationId = await getFormationId(hubspotData.formation_souhaitee);
  const statusId = await getStatusId(hubspotData.status);
  const yearId = await getYearId(hubspotData.year);
  const civiliteCodeAppr = mapGenderToCode(hubspotData.civilite);
  const paysIdAppr = await getCountryId(hubspotData.pays);
  const idOrigineScolaire = await getIdOrigineScolaireByName(hubspotData.origine_scolaire);
  const idDiplomeObtenu = await getIdDiplomeObtenuByName(hubspotData.diplome_obtenu);
  const idEtablissementScolaire = await getIdEtablissementScolaireByName(hubspotData.etablissement_scolaire);


  const paysIdRepLegal = await getCountryId(hubspotData.pays_parents);
  const civiliteCodeRepLegal = mapGenderToCode(hubspotData.civilite_representant_legal);
  
  return {
    "idSite": siteId,
    "idStatut": statusId,
    "idAnnee": yearId,
    "codeCiviliteApprenant": civiliteCodeAppr,
    "nomApprenant": hubspotData.nom,
    "prenomApprenant": hubspotData.prenom,
    "ineApprenant": hubspotData.ine,
    "nomJF": hubspotData.nom_jeune_fille,
    "idNationalite": nationalityId,
    "adresse1Appr": hubspotData.adresse_postale,
    "adresse2Appr": hubspotData.adresse2,
    "cpAppr": hubspotData.code_postal_,
    "villeAppr": hubspotData.city,
    "idPays": paysIdAppr,
    "tel1Appr": hubspotData.telephone_portable,
    "emailAppr": hubspotData.email,
    
    // info représentant légal
    "codeCiviliteRepLegal": civiliteCodeRepLegal,
    "nomRepLegal": hubspotData.nom_du_parent_1,
    "prenomRepLegal": hubspotData.prenom_du_parent_1,
    "adresse1RepLegal": hubspotData.adresse_parents,
    "adresse2RepLegal": hubspotData.adresse2_representant_legal,
    "cpRepLegal": hubspotData.code_postal_parents,
    "villeRepLegal": hubspotData.ville_parents,
    "idPaysRepLegal": paysIdRepLegal,
    "tel1RepLegal": hubspotData.telephone_du_parent_1,
    "emailRepLegal": hubspotData.email_du_parent_1,

    "dateNaissance": hubspotData.dateNaissance,
    "lieuNaissance": hubspotData.ville_de_naissance,
    "departementNaissance": hubspotData.departement_de_naissance,
    "paysNaissance": hubspotData.paysNaissance,
    "idFormationSouhait1": formationId,
    "idOrigineScolaire": idOrigineScolaire,
    "idDiplomeObtenu": idDiplomeObtenu,
    "idEtablissementScolaire": idEtablissementScolaire,
    "isTravailleurHandicape": hubspotData.travailleur_handicape,
    "isMobile": hubspotData.is_mobile,
    "isPermisConduire": hubspotData.permis_conduire,
  };
}