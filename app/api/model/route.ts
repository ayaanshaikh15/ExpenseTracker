export async function POST(req :Request) {
  const body = await req.json()
  
  try{
  const res= await  fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.LLM_API_KEY}`,
    // "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
    // "X-OpenRouter-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "google/gemma-3-27b-it:free",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text":body.prompt
          }
        ]
      }
    ]
  })
});
const data = await res.json()
return Response.json({data, success:true},{status:202});
return 
  }catch (error) {
    return Response.json({ error: "Something went wrong during calling to LLM" }, { status: 500 });
  }
}