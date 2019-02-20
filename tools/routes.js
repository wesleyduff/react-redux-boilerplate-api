
module.exports.setup = function(router) {
  /**
   * @swagger
   * /:
   *   get:
   *     description: Returns the homepage
   *     responses:
   *       200:
   *         description: hello world
   */
  router.get('/home', (req, res) => {
    res.send('Hello World!');
  });
}
