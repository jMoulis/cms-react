const PageController = require('../controllers/PageController');

module.exports = app => {
  app.get('/api/pages', PageController.index);
  app.post('/api/pages', PageController.create);
};
