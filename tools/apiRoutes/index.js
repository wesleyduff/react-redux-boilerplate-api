/* eslint-disable import/no-unresolved */
//import { AurthorApi } from 'api';

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
  router.get('/', (req, res) => {
    res.send('Hello World!');
  });
}
// /**
//  * @swagger
//  * /:
//  *   get:
//  *     description: Returns the homepage
//  *     responses:
//  *       200:
//  *         description: hello world
//  */
// const authors = async (req, res) => {
//   const response = await AurthorApi.getAllAuthors();
//   res.json(response);
// }
//
// export { authors };
