/* eslint-disable import/no-unresolved */

import { AurthorApi } from 'api';


export default {
  setup : function(app) {
    /**
     * @swagger
     * /authors:
     *   get:
     *     description: Returns the a list of authors
     *     responses:
     *       200:
     *         description: Returns a list of authors
     */
    app.get('/authors', async (req, res) => {
      try{
        const getAuthors = await AurthorApi.getAllAuthors();
        res.setHeader('Content-Type', 'application/json');
        res.send({authors: getAuthors});
      } catch(exception){
        res.setHeader('Content-Type', 'application/json');
        res.send({error: exception});
      }
    });


  }
}
