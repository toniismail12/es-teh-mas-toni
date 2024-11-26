import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_SVC_SSO+'/api/logout?refresh_token='+document?.cookie);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'Failed to logout' });
  }
}
