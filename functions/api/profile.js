// Cloudflare Pages Function: /api/profile
// Interacts with Cloudflare D1 Database binding 'DB'

export async function onRequestGet(context) {
  try {
    const { env } = context;
    if (!env.DB) {
      return new Response(JSON.stringify({ error: "D1 Database binding 'DB' not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const profile = await env.DB.prepare(
      "SELECT * FROM profile WHERE id = 'main-profile' LIMIT 1"
    ).first();

    return new Response(JSON.stringify(profile || {}), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPut(context) {
  try {
    const { request, env } = context;
    if (!env.DB) {
      return new Response(JSON.stringify({ error: "D1 Database binding 'DB' not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const data = await request.json();

    await env.DB.prepare(`
      UPDATE profile SET
        name_th = COALESCE(?, name_th),
        name_en = COALESCE(?, name_en),
        role_th = COALESCE(?, role_th),
        role_en = COALESCE(?, role_en),
        bio_th = COALESCE(?, bio_th),
        bio_en = COALESCE(?, bio_en),
        gpax = COALESCE(?, gpax),
        email = COALESCE(?, email),
        phone = COALESCE(?, phone),
        location_th = COALESCE(?, location_th),
        location_en = COALESCE(?, location_en),
        github_url = COALESCE(?, github_url),
        linkedin_url = COALESCE(?, linkedin_url),
        avatar_url = COALESCE(?, avatar_url),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 'main-profile'
    `).bind(
      data.nameTh || data.name_th,
      data.nameEn || data.name_en,
      data.roleTh || data.role_th,
      data.roleEn || data.role_en,
      data.bioTh || data.bio_th,
      data.bioEn || data.bio_en,
      data.gpax,
      data.email,
      data.phone,
      data.locationTh || data.location_th,
      data.locationEn || data.location_en,
      data.githubUrl || data.github_url,
      data.linkedinUrl || data.linkedin_url,
      data.avatarUrl || data.avatar_url
    ).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
