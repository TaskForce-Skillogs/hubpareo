// HubSpot webhook data types
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
      [key: string]: any;
    };
  };
  [key: string]: any;
}

// YPareo candidate data type
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