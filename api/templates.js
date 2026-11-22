export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.PERFECT_CORP_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Perfect Corp API key is missing"
    });
  }

  try {
    const response = await fetch(
      "https://yce-api-01.makeupar.com/s2s/v2.1/task/template/hair-transfer?page_size=20",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error || "Template request failed"
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Could not fetch hairstyle templates"
    });
  }
}
