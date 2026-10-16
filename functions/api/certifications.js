// Cloudflare Pages Function: /api/certifications
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
      "SELECT * FROM certifications ORDER BY issue_date DESC"
    ).all();

    return new Response(JSON.stringify(results), {
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
    const id = data.id || `cert-${Date.now()}`;

    await env.DB.prepare(`
      INSERT INTO certifications (id, name_th, name_en, issuer, issue_date, credential_id, category, description_th, description_en, pdf_r2_key, pdf_filename)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      data.nameTh || data.name_th,
      data.nameEn || data.name_en,
      data.issuer || '',
      data.issueDate || data.issue_date || '',
      data.credentialId || data.credential_id || '',
      data.category || '',
      data.descriptionTh || data.description_th || '',
      data.descriptionEn || data.description_en || '',
      data.pdfR2Key || data.pdf_r2_key || null,
      data.pdfFilename || data.pdf_filename || 'Certificate.pdf'
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
      return new Response(JSON.stringify({ error: "Certification ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    await env.DB.prepare(`
      UPDATE certifications SET
        name_th = ?,
        name_en = ?,
        issuer = ?,
        issue_date = ?,
        credential_id = ?,
        category = ?,
        description_th = ?,
        description_en = ?,
        pdf_r2_key = ?,
        pdf_filename = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      data.nameTh || data.name_th,
      data.nameEn || data.name_en,
      data.issuer || '',
      data.issueDate || data.issue_date || '',
      data.credentialId || data.credential_id || '',
      data.category || '',
      data.descriptionTh || data.description_th || '',
      data.descriptionEn || data.description_en || '',
      data.pdfR2Key || data.pdf_r2_key || null,
      data.pdfFilename || data.pdf_filename || 'Certificate.pdf',
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
      return new Response(JSON.stringify({ error: "Certification ID is required in ?id=" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    await env.DB.prepare("DELETE FROM certifications WHERE id = ?").bind(id).run();

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
