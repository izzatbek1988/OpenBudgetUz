const https = require('https');

export default function handler(req, res) {
  const targetUrl = 'https://openbudget.uz/api/v2/info/statistics/board-budget-sum/53?regionId=12&districtId=160';
  
  https.get(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, upstreamRes => {
    let data = '';
    upstreamRes.on('data', chunk => data += chunk);
    upstreamRes.on('end', () => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(data);
    });
  }).on('error', (err) => {
    res.status(500).json({ error: err.message });
  });
}
