import { Router } from 'express';
import * as AsteroidController from '../db/controllers/AsteroidController.js';
import * as PlanetController from '../db/controllers/PlanetController.js';
import * as MinerController from '../db/controllers/MinerController.js';
import * as HistoryController from '../db/controllers/HistoryController.js';

const router = Router();

router.get('/asteroids', AsteroidController.getAsteroids);
router.post('/asteroids', AsteroidController.addAsteroid);
router.get('/asteroids/:id', AsteroidController.getAsteroid);
router.put('/asteroids/:id', AsteroidController.updateAsteroid);
router.delete('/asteroids/:id', AsteroidController.deleteAsteroid);

router.get('/planets', PlanetController.getPlanets);
router.post('/planets', PlanetController.addPlanet);
router.get('/planets/:id', PlanetController.getPlanet);
router.put('/planets/:id', PlanetController.updatePlanet);
router.delete('/planets/:id', PlanetController.deletePlanet);

router.get('/miners', MinerController.getMiners);
router.post('/miners', MinerController.addMiner);
router.get('/miners/:id', MinerController.getMiner);
router.put('/miners/:id', MinerController.updateMiner);
router.delete('/miners/:id', MinerController.deleteMiner);

router.get('/history', HistoryController.getHistories);
router.post('/history', HistoryController.addHistory);
router.get('/history/:id', HistoryController.getHistory);
router.put('/history/:id', HistoryController.updateHistory);
router.delete('/history/:id', HistoryController.deleteHistory);

export default router;
