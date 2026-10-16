// Cloudflare Pages Function: /api/files/[key]
// Retrieves files stored in Cloudflare R2 bucket

export async function onRequestGet(context) {
  try {
    const { params, env } = context;
    const key = params.key;

    if (!env.STORAGE_BUCKET) {
      return new Response("R2 Storage not configured", { status: 500 });
    }

    const object = await env.STORAGE_BUCKET.get(key);

    if (!object) {
      return new Response("File Not Found", { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.set("Cache-Control", "public, max-age=31536000");

    return new Response(object.body, {
      headers
    });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
