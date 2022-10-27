import * as https from 'https';

const privateToken = process.env.TOKEN;

export const fetch = async (url: string): Promise<string> => {

  const { hostname, pathname, search } = new URL(url);

  const options: https.RequestOptions = {
    hostname,
    path: pathname + search,
    port: 443,
    method: 'GET',
    headers: {
      'PRIVATE-TOKEN': privateToken,
    },
  }

  return new Promise((resolve, reject) => {
    let data = '';
    const req = https.request(options, res => {
      res.setEncoding('utf8');

      res.on('data', chunk => {
        data = data + chunk.toString('utf8');
      });
      res.on('end', () => {
        if (res.statusCode != 200) {
          reject();
        }
        resolve(data);
      })
    });
    req.on('error', e => reject(e));

    req.end();
  });
}