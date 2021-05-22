import express from 'express';
import controller from '../controllers';

const router = express.Router();

router.get('/', controller.serverHealthCheck);

router.get('/users', controller.serverHealthCheck);

export = router;
