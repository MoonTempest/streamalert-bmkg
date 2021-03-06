const kv = STREAMALERT_BMKG;
const BMKG_API_URL = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  let dateString = await kv.get('cachedate');
  if (dateString == null || Number.isNaN(dateString)) {
    const dateString = Date.now().toString();
  }
  const date = parseInt(dateString);
  const now = Date.now();
  const diff = now - date;
  // Get total seconds
  const seconds = Math.abs(now - date) / 1000;

  let infoGempaString = "";
  if (seconds >= 30 || Number.isNaN(seconds)) {
    const response = await fetch(BMKG_API_URL);

    const data = await response.json();

    const infoGempa = data.Infogempa.gempa;

    infoGempaString = JSON.stringify(infoGempa);

    oldInfoGempaString = await kv.get('infogempa');
    oldInfoGempa = JSON.parse(oldInfoGempaString);

    if (!oldInfoGempa || !oldInfoGempa.DateTime || infoGempa.DateTime != oldInfoGempa.DateTime) {
      console.log("Outdated data, updating");
      await kv.put('infogempa', infoGempaString);
      await kv.put('cachedate', Date.now());
    } else {
      console.log("Updated data");
    }
  } else {
    console.log("Using the cache");
    infoGempaString = await kv.get('infogempa');
  }
  return new Response(infoGempaString, {
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': 'https://streamalert-bmkg.netlify.app'
    },
  })
}
