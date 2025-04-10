export interface IHubSpotWebhook {
  civilite: string;
  nationalite: string;
  formation_souhaitee: string;
  prenom: string;
  nom: string;
  email: string;
  zip: string;
  site: string;
  address: string;
  lastname: string;
  firstname: string;
  birthDate: string;
  [key: string]: any;
}

export interface IYPareoCandidat {
  idSite: string;
  idSite2?: string;
  idSite3?: string;
  idStatut?: string;
  idAnnee?: string;
  codeCiviliteApprenant: number;
  nomApprenant: string;
  prenomApprenant: string;
  ineApprenant?: string;
  nomJF?: string;
  idNationalite: string;
  adresse1Appr: string;
  adresse2Appr?: string;
  adresse3Appr?: string;
  adresse4Appr?: string;
  cpAppr?: string;
  villeAppr: string;
  idPays?: string;
  tel1Appr: string;
  tel2Appr?: string;
  emailAppr: string;
  dateNaissance: string;
  lieuNaissance?: string;
  departementNaissance?: string;
  paysNaissance?: string;
  idFormationSouhait1: string;
  idFormationSouhait2?: string;
  idFormationSouhait3?: string;
  [key: string]: any;
}

export interface IYPareoCommune {
  codeCommune: number;
  nomCommune: string;
  codeBassin?: number;
  codeCanton?: number;
  nomenclDepartement?: string;
  codePostal?: string;
  nomenclInsee?: string;
  plusUtilise?: number;
}

export interface IYPareoPays {
  codePays: number;
  nomPays: string;
  formatCp?: string;
  formatSiret?: string;
  formatTel?: string;
  indicatifTel?: string;
  isProvince?: number;
  isSiretObligatoire?: number;
  libelleSiret?: string;
  nomenclPays?: number;
  nomenclPaysInsee?: string;
  abrege?: string;
  plusUtilise?: number;
}

export interface IYPareoAdresse {
  codeAdresse: number;
  codeCommune: number;
  codePays: number;
  adr1?: string;
  adr2?: string;
  adr3?: string;
  adr4?: string | null;
  codeRessource: number;
  cp: string;
  email?: string;
  fax?: string | null;
  province?: string | null;
  tel1?: string | null;
  tel2?: string | null;
  typeAdresse: number;
  typeRessource: number;
  ville: string;
  zoneLibre?: string | null;
  commune: IYPareoCommune;
  pays: IYPareoPays;
}
export interface IYPareoSite {
  codeSite: number;
  nomFormeJuridique?: string | null;
  nomSite: string;
  abregeSite: string;
  etenduSite?: string | null;
  regroupementSite?: string;
  adresse: IYPareoAdresse;
  rne?: string;
  naf?: string | null;
  siret?: string;
  numeroExistence?: string | null;
  civiliteDirigeant?: string | null;
  nomDirigeant?: string | null;
  prenomDirigeant?: string | null;
  plusUtilise: number;
}

export interface IYPareoFormation {
  codeFormation: number;
  nomFormation: string;
  abregeFormation?: string;
}
export interface IYPareoNationalite {
  codeNationalite: number;
  nomNationalite: string;
  abregeNationalite: string;
}

export interface IYPareoSitesResponse {
  [key: string]: IYPareoSite;
}

export interface IYPareoNationalitesResponse {
  [key: string]: IYPareoNationalite;
}
export interface IYPareoFormationsResponse {
  [key: string]: IYPareoFormation;
}