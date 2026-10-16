// Cloudflare Pages Function: /api/upload
// Handles uploading files (images, PDFs) directly to Cloudflare R2 Storage binding 'STORAGE_BUCKET'

export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    if (!env.STORAGE_BUCKET) {
      return new Response(JSON.stringify({ 
        error: "R2 bucket binding 'STORAGE_BUCKET' not configured. Using fallback local storage." 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded in 'file' field" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const ext = file.name.split('.').pop();
    const uniqueKey = `uploads/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    await env.STORAGE_BUCKET.put(uniqueKey, file.stream(), {
      httpMetadata: {
        contentType: file.type,
      },
      customMetadata: {
        originalName: file.name
      }
    });

    return new Response(JSON.stringify({
      success: true,
      key: uniqueKey,
      filename: file.name,
      size: file.size,
      contentType: file.type,
      url: `/api/files/${uniqueKey}`
    }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
