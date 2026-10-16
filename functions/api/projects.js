// Cloudflare Pages Function: /api/projects
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

    const { results } = await env.DB.prepare(
      "SELECT * FROM projects ORDER BY created_at DESC"
    ).all();

    // Parse JSON tags
    const projects = results.map(p => ({
      ...p,
      tags: p.tags ? JSON.parse(p.tags) : []
    }));

    return new Response(JSON.stringify(projects), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    if (!env.DB) {
      return new Response(JSON.stringify({ error: "D1 Database binding 'DB' not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const data = await request.json();
    const id = data.id || `proj-${Date.now()}`;
    const tagsJson = JSON.stringify(data.tags || []);

    await env.DB.prepare(`
      INSERT INTO projects (id, title_th, title_en, category, description_th, description_en, tags, image_url, demo_url, github_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      data.titleTh || data.title_th,
      data.titleEn || data.title_en,
      data.category,
      data.descriptionTh || data.description_th || '',
      data.descriptionEn || data.description_en || '',
      tagsJson,
      data.image || data.image_url || '',
      data.demoUrl || data.demo_url || '',
      data.githubUrl || data.github_url || ''
    ).run();

    return new Response(JSON.stringify({ success: true, id }), {
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
    const id = data.id;
    if (!id) {
      return new Response(JSON.stringify({ error: "Project ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const tagsJson = JSON.stringify(data.tags || []);

    await env.DB.prepare(`
      UPDATE projects SET
        title_th = ?,
        title_en = ?,
        category = ?,
        description_th = ?,
        description_en = ?,
        tags = ?,
        image_url = ?,
        demo_url = ?,
        github_url = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      data.titleTh || data.title_th,
      data.titleEn || data.title_en,
      data.category,
      data.descriptionTh || data.description_th || '',
      data.descriptionEn || data.description_en || '',
      tagsJson,
      data.image || data.image_url || '',
      data.demoUrl || data.demo_url || '',
      data.githubUrl || data.github_url || '',
      id
    ).run();

    return new Response(JSON.stringify({ success: true, id }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestDelete(context) {
  try {
    const { request, env } = context;
    if (!env.DB) {
      return new Response(JSON.stringify({ error: "D1 Database binding 'DB' not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ error: "Project ID is required in ?id=" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    await env.DB.prepare("DELETE FROM projects WHERE id = ?").bind(id).run();

    return new Response(JSON.stringify({ success: true, deletedId: id }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
