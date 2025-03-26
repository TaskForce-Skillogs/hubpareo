// src/index.ts
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import axios from 'axios';
import { IHubSpotWebhook, IYPareoCandidat } from './types';
import { transformToYPareoFormat } from './transformers';
import ypareoClient from './services/ypareoClient';

dotenv.config();

const app = express();
app.use(express.json());

const YPAREO_BASE_URL = process.env.YPAREO_BASE_URL;
const YPAREO_TOKEN = process.env.YPAREO_TOKEN;

(async () => {
  try {
    await ypareoClient.initialize();
    console.log('Client YPareo initialisé avec succès');
  } catch (error) {
    console.error('Échec de l\'initialisation du client YPareo:', error);
  }
})();

app.post('/webhook', async (req: Request, res: Response) => {
  try {
    console.log('Webhook reçu de HubSpot:', JSON.stringify(req.body, null, 2));
    
    const hubspotData = req.body as IHubSpotWebhook;
    
    const ypareoCandidat = await transformToYPareoFormat(hubspotData);
    
    console.log('Données transformées pour YPareo:', JSON.stringify(ypareoCandidat, null, 2));
    
    if (process.env.NODE_ENV === 'production') {
      const response = await axios.post(
        `${YPAREO_BASE_URL}/r/v1/preinscription/candidat`,
        ypareoCandidat,
        {
          headers: {
            'X-Auth-Token': YPAREO_TOKEN as string,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Candidat créé dans YPareo:', response.data);
    } else {
      console.log('Mode développement: Ignorer l\'appel API réel à YPareo');
    }
    
    res.status(200).send('Webhook traité avec succès');
  } catch (error) {
    console.error('Erreur lors du traitement du webhook:', error instanceof Error ? error.message : 'Erreur inconnue');
    console.error(error instanceof Error ? error.stack : '');
    res.status(500).send('Erreur lors du traitement du webhook');
  }
});

app.get('/', (_req: Request, res: Response) => {
  res.send('L\'intégration HubSpot vers YPareo fonctionne !');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
  console.log(`Testez le webhook à: http://localhost:${PORT}/webhook`);
});