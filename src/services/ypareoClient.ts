import axios from 'axios';
import dotenv from 'dotenv';
import { IYPareoSite, IYPareoNationalite, IYPareoFormation, IYPareoSitesResponse, IYPareoNationalitesResponse, IYPareoFormationsResponse } from '../types';
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
      const [sitesResponse, nationalitesResponse, formationsResponse] = await Promise.all([
        this.fetchSites(),
        this.fetchNationalites(),
        this.fetchFormations() 
      ]);
      
      this.sites = sitesResponse || {};
      this.nationalites = nationalitesResponse || {};
      this.formations = formationsResponse || {}; 
      
      this.initialized = true;
      const sitesCount = Object.keys(this.sites).length;
      const nationalitesCount = Object.keys(this.nationalites).length;
      const formationsCount = Object.keys(this.formations).length;
      
      console.log(`Données de référence YPareo chargées: ${sitesCount} sites, ${nationalitesCount} nationalités, ${formationsCount} formations`);
    } catch (error) {
      console.error('Échec de l\'initialisation du client YPareo:', error);
      this.initialized = true;
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
    return "876" // =inconnu dans la base d'Ypareo
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
}

const ypareoClient = new YPareoClient();

export default ypareoClient;