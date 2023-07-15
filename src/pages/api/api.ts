import { NextApiRequest, NextApiResponse } from 'next';

import fetch from 'isomorphic-unfetch';

const urlPersonas = 'http://localhost:9000/api/personas';

export default async function personas(req: NextApiRequest, res: NextApiResponse) {
    const response = await fetch(urlPersonas);
    const data = await response.json();
    console.log(data);
    // Devuelve los datos como respuesta de la API en formato JSON
    res.status(200).json(data);
}
