// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { repo } from '../../shared/services/repo/repo'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repoData = await repo.getFile(
    req.query.project as string,
    req.query.name as string,
    req.query.branch as string);
  res.status(200).json(repoData);
}
