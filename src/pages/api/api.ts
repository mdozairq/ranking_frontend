// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

const baseURL = "http://192.168.1.19:5000"

const API = axios.create({ baseURL: baseURL });

export const getCollegeRank = (reg_no: string, college_code: string) =>  API.get(`/${reg_no}?college=${college_code}`);
export const getBranchRank = (reg_no: string, college_code: string, branch_code: string) =>  API.get(`/${reg_no}?college=${college_code}&branch=${branch_code}`);
