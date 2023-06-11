import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { LoginUserResponse } from 'services/authService';
import { sessionOptions } from 'utils/session';

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { token, role } = req.body as LoginUserResponse;

  try {
    req.session.token = token;
    req.session.role = role;
    await req.session.save();
    res.json(token);
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
}
