import {Router} from 'express';

const router = Router();

import * as summCtrl from './summoners.controller';

router.get('/summoners', summCtrl.getSummoners);

router.get('/summoners/:id', summCtrl.getSummoner);

router.post('/summoners', summCtrl.createSummoner);

router.delete('/summoners/:id', summCtrl.deleteSummoner);

router.put('/summoners/:id', summCtrl.updateSummoner);

router.get('/refreshSummoners', summCtrl.doRiotQuery);

router.get('/addSummoner/:name', summCtrl.addProfile);

export default router;