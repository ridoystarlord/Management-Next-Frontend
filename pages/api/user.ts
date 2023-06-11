import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { ROUTES } from 'Routes';
import { LoginUserResponse } from 'services/authService';
import { sessionOptions } from 'utils/session';

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse<LoginUserResponse>,
) {
  const { token } = req.session;
  if (token == null) {
    // redirect to sign in page
    res.status(307).redirect(ROUTES.HOME);
  }

  res.status(200).json({
    ...req.session,
  });
}
