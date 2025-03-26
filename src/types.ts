export interface IHubSpotWebhook {
  objectId: number;
  properties: {
    firstname?: string;
    lastname?: string;
    name?: string;
    email?: string;
    phone?: string;
    mobilephone?: string;
    address?: string;
    street?: string;
    city?: string;
    zip?: string;
    postal_code?: string;
    date_of_birth?: string;
    birthdate?: string;
    gender?: string;
    nationality?: string;
    country?: string;
    pays?: string;
    campus?: string;
    site?: string;
    formation?: string;
    course?: string;
    training?: string;
    [key: string]: any;
  };
  object?: {
    properties: {
      firstname?: string;
      lastname?: string;
      name?: string;
      email?: string;
      phone?: string;
      mobilephone?: string;
      address?: string;
      street?: string;
      city?: string;
      zip?: string;
      postal_code?: string;
      date_of_birth?: string;
      birthdate?: string;
      gender?: string;
      nationality?: string;
      country?: string;
      pays?: string;
      campus?: string;
      site?: string;
      formation?: string;
      course?: string;
      training?: string;
      [key: string]: any;
    };
  };
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
  cpAppr: string;
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

export interface IYPareoRib {
  codeRib: number;
  codeBanque?: string;
  codeGuichet?: string;
  numeroCompte?: string;
  cleRib?: string;
  ibanPays?: string;
  bic?: string;
  titulaire?: string;
  ibanCpt?: string;
  isAutorisePrelvement?: boolean;
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
  listeRib: IYPareoRib[];
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