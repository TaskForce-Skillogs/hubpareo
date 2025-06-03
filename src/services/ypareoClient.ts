import axios from 'axios';
import dotenv from 'dotenv';
import { IYPareoSite, IYPareoNationalite, IYPareoFormation, IYPareoSitesResponse, IYPareoNationalitesResponse, IYPareoFormationsResponse, IYPareoStatut, IYPareoAnnee, IYPareoPays } from '../types';
import e from 'express';

dotenv.config();

const YPAREO_BASE_URL = process.env.YPAREO_BASE_URL;
const YPAREO_TOKEN = process.env.YPAREO_TOKEN;


class YPareoClient {
  private apiUrl: string;
  private token: string;
  private sites: IYPareoSitesResponse = {};
  private nationalites: IYPareoNationalitesResponse = {};
  private formations: IYPareoFormationsResponse = {};
  private initialized = false;
  private statuts: { [key: string]: IYPareoStatut } = {};
  private annees: { [key: string]: IYPareoAnnee } = {};
  private pays: { [key: string]: IYPareoPays } = {};
  private originesScolaires: { [key: string]: any } = {}; // Add new property
  private diplomesObtenus: { [key: string]: any } = {}; // Add new property
  private etablissementsScolaires: { [key: string]: any } = {}; // Add new property


  constructor() {
    this.apiUrl = YPAREO_BASE_URL || '';
    this.token = YPAREO_TOKEN || '';
    
    if (!this.apiUrl || !this.token) {
      console.error('Configuration API YPareo manquante. Vérifiez votre fichier .env.');
    }
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    try {
      const [sitesResponse, nationalitesResponse, formationsResponse, statutsResponse, anneesResponse, paysResponse, originesScolairesResponse, diplomesObtenusResponse, etablissementsScolairesResponse] = await Promise.all([
        this.fetchSites(),
        this.fetchNationalites(),
        this.fetchFormations(),
        this.fetchStatuts(),
        this.fetchAnnees(),
        this.fetchPays(),
        this.fetchOriginesScolaires(),
        this.fetchDiplomesObtenus(),
        this.fetchEtablissementsScolaires()
      ]);

      this.sites = sitesResponse || {};
      this.nationalites = nationalitesResponse || {};
      this.formations = formationsResponse || {};
      this.statuts = statutsResponse || {};
      this.annees = anneesResponse || {};
      this.pays = paysResponse || {};
      this.originesScolaires = originesScolairesResponse || {};
      this.diplomesObtenus = diplomesObtenusResponse || {};
      this.etablissementsScolaires = etablissementsScolairesResponse || {};
      
      
      this.initialized = true;
      const sitesCount = Object.keys(this.sites).length;
      const nationalitesCount = Object.keys(this.nationalites).length;
      const formationsCount = Object.keys(this.formations).length;
      const statutsCount = Object.keys(this.statuts).length;
      const anneesCount = Object.keys(this.annees).length;
      const paysCount = Object.keys(this.pays).length;
      const originesScolairesCount = Object.keys(this.originesScolaires).length;
      const diplomesObtenusCount = Object.keys(this.diplomesObtenus).length;
      const etablissementsScolairesCount = Object.keys(this.etablissementsScolaires).length;

      console.log(`Données de référence YPareo chargées: ${sitesCount} sites, ${nationalitesCount} nationalités, ${formationsCount} formations, ${statutsCount} statuts, ${anneesCount} années, ${paysCount} pays, ${originesScolairesCount} origines scolaires, ${diplomesObtenusCount} diplômes obtenus, ${etablissementsScolairesCount} établissements scolaires`);
    } catch (error) {
      console.error('Échec de l\'initialisation du client YPareo:', error);
      this.initialized = true; // Set to true to avoid repeated initialization attempts
    }
  }

  private async makeRequest<T>(endpoint: string): Promise<T | null> {
    try {
      const response = await axios.get(`${this.apiUrl}${endpoint}`, {
        headers: {
          'X-Auth-Token': this.token,
          'Accept': 'application/json'
        }
      });
      
      return response.data as T;
    } catch (error) {
      console.error(`Erreur lors de la récupération depuis l'API YPareo ${endpoint}:`, error);
      return null;
    }
  }

  async fetchSites(): Promise<IYPareoSitesResponse | null> {
    return this.makeRequest<IYPareoSitesResponse>('/r/v1/sites');
  }

  async fetchNationalites(): Promise<IYPareoNationalitesResponse | null> {
    return this.makeRequest<IYPareoNationalitesResponse>('/r/v1/nationalites');
  }

  async fetchFormations(): Promise<IYPareoFormationsResponse | null> {
    return this.makeRequest<IYPareoFormationsResponse>('/r/v1/formations');
  }
  
  async fetchStatuts(): Promise<any | null> {
    return this.makeRequest<any>('/r/v1/statuts');
  }
  
  async fetchAnnees(): Promise<any | null> {
    return this.makeRequest<any>('/r/v1/annees');
  }

async fetchPays(): Promise<{ [key: string]: IYPareoPays } | null> {
  return this.makeRequest<{ [key: string]: IYPareoPays }>('/r/v1/pays');
}

async fetchOriginesScolaires(): Promise<{ [key: string]: any } | null> {
    return this.makeRequest<{ [key: string]: any }>('/r/v1/origines-scolaires');
  }

  async fetchDiplomesObtenus(): Promise<{ [key: string]: any } | null> {
    return this.makeRequest<{ [key: string]: any }>('/r/v1/diplomes-obtenus');
  }

  async fetchEtablissementsScolaires(): Promise<{ [key: string]: any } | null> {
    return this.makeRequest<{ [key: string]: any }>('/r/v1/etablissements-origine');
  }

  getSiteIdByName(siteName: string ): string {

    for (const key in this.sites) {
      const site = this.sites[key];
      if (site.nomSite.toLowerCase().includes(siteName.toLowerCase())) {
        return site.codeSite.toString();
      }
    }
    return "";
  }

  getFormationIdByName(formationName: string | undefined, defaultId = '123'): string {
  
    if (!formationName || Object.keys(this.formations).length === 0) return defaultId;
    
    for (const key in this.formations) {
      const formation = this.formations[key];
      if (formation.nomFormation.toLowerCase().includes(formationName.toLowerCase())) {
        return formation.codeFormation.toString();
      }
    }
    
    return defaultId;
  }

  getNationalityIdByCountry(countryCodeOrName: string): string {
    for (const key in this.nationalites) {
      const nationality = this.nationalites[key];
      if (nationality.nomNationalite.toLowerCase().includes(countryCodeOrName.toLowerCase())) {
        return nationality.codeNationalite.toString();
      }
    }
    return "876"
  }

  getStatusIdByName(statusName: string | undefined, defaultId = ''): string {
    if (!statusName || Object.keys(this.statuts).length === 0) return defaultId;
    
    for (const key in this.statuts) {
      const statut = this.statuts[key];
      if (statut.nomStatut.toLowerCase().includes(statusName.toLowerCase())) {
        return statut.codeStatut.toString();
      }
    }
    
    return defaultId;
  }

  getYearIdByName(yearName: string | undefined, defaultId = ''): string {
    if (!yearName || Object.keys(this.annees).length === 0) return defaultId;
    
    for (const key in this.annees) {
      const annee = this.annees[key];
      if (annee.nomAnnee.toLowerCase().includes(yearName.toLowerCase())) {
        return annee.codeAnnee.toString();
      }
    }
    
    return defaultId;
  }

  getCountryIdByName(countryName: string | undefined): string {
  if (!countryName || Object.keys(this.pays).length === 0) {
    return "250";
  }
  
  const normalizedCountryName = countryName.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .trim();
  
  for (const key in this.pays) {
    const pays = this.pays[key];
    const normalizedNomPays = pays.nomPays.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .trim();
    
    if (normalizedNomPays === normalizedCountryName) {
      return pays.codePays.toString();
    }
  }
  
  for (const key in this.pays) {
    const pays = this.pays[key];
    const normalizedNomPays = pays.nomPays.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .trim();
    
    if (normalizedNomPays.includes(normalizedCountryName) || 
        normalizedCountryName.includes(normalizedNomPays)) {
      return pays.codePays.toString();
    }
  }
  
  console.warn(`Country "${countryName}" not found in YPareo database, defaulting to France (45)`);
  return "45";
}

  getIdOrigineScolaireByName(origine: string | undefined, defaultId = '82699'): string {
    if (!origine || Object.keys(this.originesScolaires).length === 0) return defaultId;
    
    for (const key in this.originesScolaires) {
      const origineScolaire = this.originesScolaires[key];
      if (origineScolaire.nom?.toLowerCase().includes(origine.toLowerCase()) ||
          origineScolaire.nomOrigine?.toLowerCase().includes(origine.toLowerCase())) {
        return origineScolaire.code?.toString() || origineScolaire.codeOrigine?.toString() || key;
      }
    }
    
    return defaultId;
  }

  getIdDiplomeObtenuByName(diplome: string | undefined, defaultId = '0'): string {
    if (!diplome || Object.keys(this.diplomesObtenus).length === 0) return defaultId;
    
    for (const key in this.diplomesObtenus) {
      const diplomeObtenu = this.diplomesObtenus[key];
      // Adjust property name based on your API response structure
      if (diplomeObtenu.nom?.toLowerCase().includes(diplome.toLowerCase()) ||
          diplomeObtenu.nomDiplome?.toLowerCase().includes(diplome.toLowerCase())) {
        return diplomeObtenu.code?.toString() || diplomeObtenu.codeDiplome?.toString() || key;
      }
    }
    
    return defaultId;
  }
  getIdEtablissementScolaireByName(etablissement: string | undefined, defaultId = '0'): string {
    if (!etablissement || Object.keys(this.etablissementsScolaires).length === 0) return defaultId;
    
    for (const key in this.etablissementsScolaires) {
      const etablissementScolaire = this.etablissementsScolaires[key];
      // Adjust property name based on your API response structure
      if (etablissementScolaire.nom?.toLowerCase().includes(etablissement.toLowerCase()) ||
          etablissementScolaire.nomEtablissement?.toLowerCase().includes(etablissement.toLowerCase())) {
        return etablissementScolaire.code?.toString() || etablissementScolaire.codeEtablissement?.toString() || key;
      }
    }
    
    return defaultId;
  }

  getSites(): IYPareoSite[] {
    return Object.values(this.sites);
  }

  getNationalities(): IYPareoNationalite[] {
    return Object.values(this.nationalites);
  }

  getFormations(): IYPareoFormation[] {
    return Object.values(this.formations) ;
  }

  getPays(): IYPareoPays[] {
  return Object.values(this.pays);
}
}

const ypareoClient = new YPareoClient();

export default ypareoClient;