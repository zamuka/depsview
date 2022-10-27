// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { repo } from '../../shared/services/repo/repo'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repoData = await repo.getByName(req.query.name as string);
  res.status(200).json(repoData);
}
