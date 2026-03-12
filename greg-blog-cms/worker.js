// Greg Pignataro Blog CMS + Knowledge Base Worker
// D1 Database: greg-pignataro-blog (ef4caacc-5dfc-4c5e-966a-10a499dc1169)
// v2.0 — WYSIWYG Editor + UX Improvements

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Auth check for admin routes
    const isAdmin = path.startsWith('/admin') || path.startsWith('/api/');
    if (isAdmin) {
      const authHeader = request.headers.get('Authorization');
      const cookieAuth = getCookie(request, 'blog_auth');
      const validToken = env.ADMIN_TOKEN;

      // Allow login page without auth
      if (path === '/admin/login' && request.method === 'GET') {
        return new Response(loginPage(), { headers: { 'Content-Type': 'text/html' } });
      }
      if (path === '/admin/login' && request.method === 'POST') {
        const form = await request.formData();
        const token = form.get('token');
        if (token === validToken) {
          return new Response('', {
            status: 302,
            headers: {
              'Location': '/admin',
              'Set-Cookie': `blog_auth=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
            }
          });
        }
        return new Response(loginPage('Invalid token'), { headers: { 'Content-Type': 'text/html' } });
      }

      // Logout
      if (path === '/admin/logout') {
        return new Response('', {
          status: 302,
          headers: {
            'Location': '/admin/login',
            'Set-Cookie': 'blog_auth=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0'
          }
        });
      }

      const token = authHeader?.replace('Bearer ', '') || cookieAuth;
      if (token !== validToken) {
        if (path.startsWith('/api/')) {
          return json({ error: 'Unauthorized' }, 401);
        }
        return Response.redirect(new URL('/admin/login', url.origin).toString(), 302);
      }
    }

    // Route handling
    try {
      // Admin UI
      if (path === '/admin' || path === '/admin/') return new Response(adminDashboard(), { headers: { 'Content-Type': 'text/html' } });
      if (path === '/admin/posts/new') return new Response(postEditor(), { headers: { 'Content-Type': 'text/html' } });
      if (path.match(/^\/admin\/posts\/\d+$/)) return new Response(postEditor(path.split('/').pop()), { headers: { 'Content-Type': 'text/html' } });
      if (path === '/admin/categories') return new Response(categoryManager(), { headers: { 'Content-Type': 'text/html' } });
      if (path === '/admin/search') return new Response(searchPage(), { headers: { 'Content-Type': 'text/html' } });

      // API Routes
      if (path === '/api/posts' && request.method === 'GET') return await getPosts(url, env);
      if (path === '/api/posts' && request.method === 'POST') return await createPost(request, env);
      if (path.match(/^\/api\/posts\/\d+$/) && request.method === 'GET') return await getPost(path.split('/').pop(), env);
      if (path.match(/^\/api\/posts\/\d+$/) && request.method === 'PUT') return await updatePost(path.split('/').pop(), request, env);
      if (path.match(/^\/api\/posts\/\d+$/) && request.method === 'DELETE') return await deletePost(path.split('/').pop(), env);
      if (path === '/api/categories' && request.method === 'GET') return await getCategories(env);
      if (path === '/api/categories' && request.method === 'POST') return await createCategory(request, env);
      if (path.match(/^\/api\/categories\/\d+$/) && request.method === 'PUT') return await updateCategory(path.split('/').pop(), request, env);
      if (path.match(/^\/api\/categories\/\d+$/) && request.method === 'DELETE') return await deleteCategory(path.split('/').pop(), env);
      if (path === '/api/search' && request.method === 'GET') return await searchPosts(url, env);
      if (path === '/api/stats' && request.method === 'GET') return await getStats(env);

      return new Response('Not Found', { status: 404 });
    } catch (err) {
      return json({ error: err.message }, 500);
    }
  }
};

// Helpers
function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}

function getCookie(request, name) {
  const cookies = request.headers.get('Cookie') || '';
  const match = cookies.match(new RegExp(`${name}=([^;]+)`));
  return match ? match[1] : null;
}

// API Handlers
async function getPosts(url, env) {
  const status = url.searchParams.get('status') || 'all';
  const category = url.searchParams.get('category');
  const limit = parseInt(url.searchParams.get('limit') || '50');
  const offset = parseInt(url.searchParams.get('offset') || '0');

  let query = `SELECT p.*, GROUP_CONCAT(c.name) as categories, GROUP_CONCAT(c.slug) as category_slugs
    FROM posts p
    LEFT JOIN post_categories pc ON p.id = pc.post_id
    LEFT JOIN categories c ON pc.category_id = c.id`;

  const conditions = [];
  const params = [];

  if (status !== 'all') { conditions.push('p.status = ?'); params.push(status); }
  if (category) { conditions.push('c.slug = ?'); params.push(category); }

  if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
  query += ' GROUP BY p.id ORDER BY p.date DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  const { results } = await env.DB.prepare(query).bind(...params).all();
  const countResult = await env.DB.prepare('SELECT COUNT(*) as total FROM posts' + (status !== 'all' ? ' WHERE status = ?' : '')).bind(...(status !== 'all' ? [status] : [])).first();

  return json({ posts: results, total: countResult.total, limit, offset });
}

async function getPost(id, env) {
  const post = await env.DB.prepare(`SELECT p.*, GROUP_CONCAT(c.id) as category_ids, GROUP_CONCAT(c.name) as categories
    FROM posts p LEFT JOIN post_categories pc ON p.id = pc.post_id LEFT JOIN categories c ON pc.category_id = c.id
    WHERE p.id = ? GROUP BY p.id`).bind(id).first();
  if (!post) return json({ error: 'Not found' }, 404);
  return json(post);
}

async function createPost(request, env) {
  const data = await request.json();
  const { title, slug, excerpt, body_html, body_text, subtitle, date, read_time, status, featured, category_ids } = data;

  const result = await env.DB.prepare(
    `INSERT INTO posts (title, slug, excerpt, body_html, body_text, subtitle, date, read_time, status, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(title, slug, excerpt || '', body_html || '', body_text || '', subtitle || '', date || '', read_time || '', status || 'draft', featured ? 1 : 0).run();

  const postId = result.meta.last_row_id;
  if (category_ids && category_ids.length) {
    for (const catId of category_ids) {
      await env.DB.prepare('INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)').bind(postId, catId).run();
    }
  }
  return json({ id: postId, message: 'Post created' }, 201);
}

async function updatePost(id, request, env) {
  const data = await request.json();
  const fields = [];
  const values = [];

  for (const [key, val] of Object.entries(data)) {
    if (key === 'category_ids') continue;
    if (['title','slug','excerpt','body_html','body_text','subtitle','date','read_time','status','featured'].includes(key)) {
      fields.push(`${key} = ?`);
      values.push(key === 'featured' ? (val ? 1 : 0) : val);
    }
  }

  fields.push("updated_at = datetime('now')");
  values.push(id);

  await env.DB.prepare(`UPDATE posts SET ${fields.join(', ')} WHERE id = ?`).bind(...values).run();

  if (data.category_ids) {
    await env.DB.prepare('DELETE FROM post_categories WHERE post_id = ?').bind(id).run();
    for (const catId of data.category_ids) {
      await env.DB.prepare('INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)').bind(id, catId).run();
    }
  }
  return json({ message: 'Post updated' });
}

async function deletePost(id, env) {
  await env.DB.prepare("UPDATE posts SET status = 'archived', updated_at = datetime('now') WHERE id = ?").bind(id).run();
  return json({ message: 'Post archived' });
}

async function getCategories(env) {
  const { results } = await env.DB.prepare(
    `SELECT c.*, COUNT(pc.post_id) as post_count FROM categories c LEFT JOIN post_categories pc ON c.id = pc.category_id GROUP BY c.id ORDER BY c.sort_order`
  ).all();
  return json(results);
}

async function createCategory(request, env) {
  const { name, slug, description, sort_order } = await request.json();
  const result = await env.DB.prepare('INSERT INTO categories (name, slug, description, sort_order) VALUES (?, ?, ?, ?)').bind(name, slug, description || '', sort_order || 0).run();
  return json({ id: result.meta.last_row_id, message: 'Category created' }, 201);
}

async function updateCategory(id, request, env) {
  const data = await request.json();
  const fields = [];
  const values = [];
  for (const [key, val] of Object.entries(data)) {
    if (['name','slug','description','sort_order'].includes(key)) { fields.push(`${key} = ?`); values.push(val); }
  }
  values.push(id);
  await env.DB.prepare(`UPDATE categories SET ${fields.join(', ')} WHERE id = ?`).bind(...values).run();
  return json({ message: 'Category updated' });
}

async function deleteCategory(id, env) {
  await env.DB.prepare('DELETE FROM post_categories WHERE category_id = ?').bind(id).run();
  await env.DB.prepare('DELETE FROM categories WHERE id = ?').bind(id).run();
  return json({ message: 'Category deleted' });
}

async function searchPosts(url, env) {
  const q = url.searchParams.get('q') || '';
  const category = url.searchParams.get('category');
  const limit = parseInt(url.searchParams.get('limit') || '20');

  if (!q) return json({ results: [], query: q });

  const searchTerms = q.split(/\s+/).map(t => `%${t}%`);

  let query = `SELECT p.id, p.title, p.slug, p.excerpt, p.subtitle, p.date, p.read_time, p.status,
    GROUP_CONCAT(c.name) as categories,
    (CASE WHEN p.title LIKE ? THEN 10 ELSE 0 END +
     CASE WHEN p.excerpt LIKE ? THEN 5 ELSE 0 END +
     CASE WHEN p.body_text LIKE ? THEN 2 ELSE 0 END +
     CASE WHEN p.subtitle LIKE ? THEN 3 ELSE 0 END) as relevance
    FROM posts p
    LEFT JOIN post_categories pc ON p.id = pc.post_id
    LEFT JOIN categories c ON pc.category_id = c.id
    WHERE (p.title LIKE ? OR p.excerpt LIKE ? OR p.body_text LIKE ? OR p.subtitle LIKE ?)`;

  const likeQ = `%${q}%`;
  const params = [likeQ, likeQ, likeQ, likeQ, likeQ, likeQ, likeQ, likeQ];

  if (category) { query += ' AND c.slug = ?'; params.push(category); }

  query += ' GROUP BY p.id ORDER BY relevance DESC LIMIT ?';
  params.push(limit);

  const { results } = await env.DB.prepare(query).bind(...params).all();
  return json({ results, query: q, count: results.length });
}

async function getStats(env) {
  const totalPosts = await env.DB.prepare('SELECT COUNT(*) as count FROM posts').first();
  const published = await env.DB.prepare("SELECT COUNT(*) as count FROM posts WHERE status = 'published'").first();
  const drafts = await env.DB.prepare("SELECT COUNT(*) as count FROM posts WHERE status = 'draft'").first();
  const categories = await env.DB.prepare('SELECT COUNT(*) as count FROM categories').first();
  const byCategory = await env.DB.prepare(
    `SELECT c.name, COUNT(pc.post_id) as count FROM categories c LEFT JOIN post_categories pc ON c.id = pc.category_id GROUP BY c.id ORDER BY c.sort_order`
  ).all();
  return json({ total: totalPosts.count, published: published.count, drafts: drafts.count, categories: categories.count, byCategory: byCategory.results });
}

// =============================================
// Admin UI Pages
// =============================================

function adminCSS() {
  return `*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',-apple-system,sans-serif;background:#f8f6f3;color:#2C2520;font-size:15px;line-height:1.6}
.topbar{background:#2C2520;color:#fff;padding:0.8rem 2rem;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50}
.topbar h1{font-family:Georgia,serif;font-size:1.1rem;font-weight:400;letter-spacing:0.04em}
.topbar nav{display:flex;align-items:center;gap:0.2rem}
.topbar nav a{color:rgba(255,255,255,0.7);text-decoration:none;font-size:0.78rem;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;margin-left:1.6rem;transition:color 0.2s}
.topbar nav a:hover,.topbar nav a.active{color:#C99B4F}
.topbar nav a.logout-link{color:rgba(255,255,255,0.4);font-size:0.7rem;margin-left:2rem;border-left:1px solid rgba(255,255,255,0.15);padding-left:1.6rem}
.topbar nav a.logout-link:hover{color:#e57373}
.container{max-width:1100px;margin:0 auto;padding:2rem}
.card{background:#fff;border:1px solid rgba(184,134,58,0.12);border-radius:12px;padding:1.8rem;margin-bottom:1.2rem;box-shadow:0 2px 8px rgba(0,0,0,0.03)}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:2rem}
.stat-card{background:#fff;border:1px solid rgba(184,134,58,0.12);border-radius:12px;padding:1.4rem;text-align:center;cursor:pointer;transition:all 0.2s}
.stat-card:hover{border-color:#B8863A;box-shadow:0 4px 12px rgba(184,134,58,0.15)}
.stat-card .num{font-family:Georgia,serif;font-size:2.2rem;color:#B8863A;font-weight:400}
.stat-card .label{font-size:0.72rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#9E9285;margin-top:0.3rem}
table{width:100%;border-collapse:collapse}th{text-align:left;font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#9E9285;padding:0.6rem 0.8rem;border-bottom:2px solid rgba(184,134,58,0.12)}
td{padding:0.7rem 0.8rem;border-bottom:1px solid rgba(184,134,58,0.06);font-size:0.9rem}
tr:hover{background:rgba(184,134,58,0.03)}
.badge{display:inline-block;padding:0.2rem 0.6rem;border-radius:100px;font-size:0.65rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase}
.badge-published{background:#e8f5e9;color:#2e7d32}.badge-draft{background:#fff3e0;color:#e65100}.badge-archived{background:#f5f5f5;color:#757575}
.btn{display:inline-block;padding:0.6rem 1.4rem;border-radius:8px;font-size:0.78rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:all 0.2s}
.btn-gold{background:#B8863A;color:#fff}.btn-gold:hover{background:#a07530}
.btn-outline{background:transparent;border:1px solid rgba(184,134,58,0.3);color:#B8863A}.btn-outline:hover{background:rgba(184,134,58,0.05)}
.btn-danger{background:transparent;border:1px solid rgba(220,53,69,0.3);color:#dc3545}.btn-danger:hover{background:rgba(220,53,69,0.05)}
.btn-sm{padding:0.35rem 0.8rem;font-size:0.7rem}
input,textarea,select{font-family:inherit;font-size:0.95rem;padding:0.7rem;border:1px solid rgba(184,134,58,0.2);border-radius:8px;width:100%;transition:border-color 0.2s}
input:focus,textarea:focus,select:focus{outline:none;border-color:#B8863A}
label{display:block;font-size:0.72rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#6B5E52;margin-bottom:0.3rem}
.form-row{margin-bottom:1.2rem}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.search-box{position:relative;margin-bottom:1.5rem}
.search-box input{padding-left:2.4rem;font-size:1rem}
.search-box::before{content:"\uD83D\uDD0D";position:absolute;left:0.8rem;top:50%;transform:translateY(-50%);font-size:1rem}
.search-box .clear-btn{position:absolute;right:0.8rem;top:50%;transform:translateY(-50%);background:none;border:none;font-size:1.2rem;color:#9E9285;cursor:pointer;padding:0.2rem;display:none}
.search-box .clear-btn:hover{color:#2C2520}

/* Toast notifications */
.toast-container{position:fixed;top:70px;right:20px;z-index:1000;display:flex;flex-direction:column;gap:0.5rem}
.toast{padding:0.8rem 1.4rem;border-radius:8px;font-size:0.88rem;font-weight:500;box-shadow:0 4px 16px rgba(0,0,0,0.12);animation:slideIn 0.3s ease;display:flex;align-items:center;gap:0.6rem;max-width:380px}
.toast-success{background:#2e7d32;color:#fff}
.toast-error{background:#c62828;color:#fff}
.toast-info{background:#1565c0;color:#fff}
@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes fadeOut{from{opacity:1}to{opacity:0;transform:translateX(100%)}}

/* Loading skeleton */
.skeleton{background:linear-gradient(90deg,#f0ede8 25%,#e8e4de 50%,#f0ede8 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:8px;height:1.2rem;margin-bottom:0.5rem}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

/* Unsaved indicator */
.unsaved-dot{width:8px;height:8px;border-radius:50%;background:#e65100;display:inline-block;margin-left:0.5rem;animation:pulse 1.5s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}

/* Word count bar */
.editor-meta{display:flex;justify-content:space-between;align-items:center;padding:0.5rem 0;font-size:0.78rem;color:#9E9285;border-top:1px solid rgba(184,134,58,0.1);margin-top:0.5rem}

/* Preview panel */
.preview-panel{background:#fff;border:1px solid rgba(184,134,58,0.2);border-radius:12px;padding:2rem 2.5rem;max-width:720px;margin:1rem auto;font-family:Georgia,serif;line-height:1.8;font-size:1.05rem;color:#2C2520;display:none}
.preview-panel h1,.preview-panel h2,.preview-panel h3{font-weight:400;margin:1.2rem 0 0.6rem;color:#2C2520}
.preview-panel p{margin-bottom:1rem}
.preview-panel blockquote{border-left:3px solid #B8863A;padding-left:1.2rem;margin:1rem 0;font-style:italic;color:#6B5E52}
.preview-panel img{max-width:100%;border-radius:8px;margin:1rem 0}
.preview-panel ul,.preview-panel ol{margin:0.8rem 0 0.8rem 1.5rem}

/* Editor tabs */
.editor-tabs{display:flex;gap:0;margin-bottom:0;border-bottom:2px solid rgba(184,134,58,0.12)}
.editor-tab{padding:0.6rem 1.4rem;font-size:0.78rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;color:#9E9285;border-bottom:2px solid transparent;margin-bottom:-2px;transition:all 0.2s;background:none;border-top:none;border-left:none;border-right:none}
.editor-tab.active{color:#B8863A;border-bottom-color:#B8863A}
.editor-tab:hover{color:#6B5E52}

@media(max-width:768px){.container{padding:1rem}.form-grid{grid-template-columns:1fr}.topbar{padding:0.8rem 1rem}.topbar nav a{margin-left:0.8rem;font-size:0.68rem}}`;
}

function toastScript() {
  return `
function showToast(msg, type='success') {
  let c = document.querySelector('.toast-container');
  if (!c) { c = document.createElement('div'); c.className='toast-container'; document.body.appendChild(c); }
  const t = document.createElement('div');
  t.className = 'toast toast-' + type;
  const icon = type==='success' ? '\u2713' : type==='error' ? '\u2717' : '\u2139';
  t.innerHTML = '<span style="font-size:1.1rem;">' + icon + '</span> ' + msg;
  c.appendChild(t);
  setTimeout(() => { t.style.animation='fadeOut 0.3s ease forwards'; setTimeout(() => t.remove(), 300); }, 3500);
}`;
}

function navBar(active = '') {
  return `<div class="topbar"><h1>Greg Pignataro CMS</h1><nav>
<a href="/admin" ${active==='dashboard'?'class="active"':''}>Dashboard</a>
<a href="/admin/posts/new" ${active==='new'?'class="active"':''}>New Post</a>
<a href="/admin/categories" ${active==='categories'?'class="active"':''}>Categories</a>
<a href="/admin/search" ${active==='search'?'class="active"':''}>Search / RAG</a>
<a href="https://gregpignataro.com/blog.html" target="_blank">View Site \u2197</a>
<a href="/admin/logout" class="logout-link">Log Out</a>
</nav></div>`;
}

function loginPage(error = '') {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Login | Greg Pignataro Blog CMS</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>GP</text></svg>">
<style>${adminCSS()}</style></head><body>
<div style="max-width:400px;margin:100px auto;padding:2rem;">
<h1 style="font-family:Georgia,serif;text-align:center;margin-bottom:0.3rem;color:#2C2520;">Blog CMS</h1>
<p style="text-align:center;font-size:0.82rem;color:#9E9285;margin-bottom:2rem;">Content management for gregpignataro.com</p>
${error ? '<div style="background:#fee;border:1px solid #fcc;padding:0.8rem;border-radius:8px;margin-bottom:1rem;color:#c33;font-size:0.9rem;">' + error + '</div>' : ''}
<form method="POST" action="/admin/login">
<label style="display:block;font-size:0.8rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#6B5E52;margin-bottom:0.4rem;">Admin Token</label>
<div style="position:relative;">
<input type="password" name="token" id="tokenInput" required style="width:100%;padding:0.8rem;padding-right:3rem;border:1px solid rgba(184,134,58,0.2);border-radius:8px;font-size:1rem;font-family:inherit;margin-bottom:1rem;">
<button type="button" onclick="const i=document.getElementById('tokenInput');i.type=i.type==='password'?'text':'password';this.textContent=i.type==='password'?'\u{1F441}':'\u{1F441}\u200D\u{1F5E8}'" style="position:absolute;right:0.6rem;top:0.6rem;background:none;border:none;cursor:pointer;font-size:1.1rem;color:#9E9285;">\u{1F441}</button>
</div>
<button type="submit" style="width:100%;padding:0.8rem;background:#B8863A;color:#fff;border:none;border-radius:8px;font-size:0.85rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;">Sign In</button>
</form></div></body></html>`;
}

function adminDashboard() {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Dashboard | Greg Pignataro Blog CMS</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>GP</text></svg>">
<style>${adminCSS()}</style></head><body>
${navBar('dashboard')}
<div class="container">
<div class="stats-grid" id="stats">
  <div class="stat-card skeleton" style="height:100px"></div>
  <div class="stat-card skeleton" style="height:100px"></div>
  <div class="stat-card skeleton" style="height:100px"></div>
  <div class="stat-card skeleton" style="height:100px"></div>
</div>
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:0.8rem;">
<h2 style="font-family:Georgia,serif;font-weight:400;">All Posts</h2>
<div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;">
<input type="text" id="titleSearch" placeholder="Filter by title..." oninput="filterPosts()" style="width:200px;padding:0.45rem 0.8rem;font-size:0.85rem;">
<select id="statusFilter" onchange="loadPosts()" style="width:auto;padding:0.45rem 0.8rem;font-size:0.8rem;">
<option value="all">All Status</option><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select>
<a href="/admin/posts/new" class="btn btn-gold">New Post</a></div></div>
<div class="card"><table><thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody id="postsList">
  <tr><td colspan="5"><div class="skeleton" style="width:80%"></div><div class="skeleton" style="width:60%"></div><div class="skeleton" style="width:70%"></div></td></tr>
</tbody></table></div>
</div>
<script>
${toastScript()}
let allPosts = [];
async function api(path){const r=await fetch(path);return r.json();}
async function loadStats(){
  const s=await api('/api/stats');
  document.getElementById('stats').innerHTML=
    '<div class="stat-card" onclick="filterByStatus(\\'all\\')"><div class="num">'+s.total+'</div><div class="label">Total Posts</div></div>'+
    '<div class="stat-card" onclick="filterByStatus(\\'published\\')"><div class="num">'+s.published+'</div><div class="label">Published</div></div>'+
    '<div class="stat-card" onclick="filterByStatus(\\'draft\\')"><div class="num">'+s.drafts+'</div><div class="label">Drafts</div></div>'+
    '<div class="stat-card" onclick="filterByStatus(\\'all\\')"><div class="num">'+s.categories+'</div><div class="label">Categories</div></div>';
}
function filterByStatus(s){ document.getElementById('statusFilter').value=s; loadPosts(); }
async function loadPosts(){
  const status=document.getElementById('statusFilter').value;
  const data=await api('/api/posts?status='+status);
  allPosts = data.posts;
  renderPosts(allPosts);
}
function filterPosts(){
  const q = document.getElementById('titleSearch').value.toLowerCase();
  const filtered = allPosts.filter(p => p.title.toLowerCase().includes(q));
  renderPosts(filtered);
}
function renderPosts(posts){
  if(!posts.length){
    document.getElementById('postsList').innerHTML='<tr><td colspan="5" style="text-align:center;padding:2rem;color:#9E9285;">No posts found. <a href="/admin/posts/new" style="color:#B8863A;">Create one?</a></td></tr>';
    return;
  }
  document.getElementById('postsList').innerHTML=posts.map(p=>
    '<tr><td><a href="/admin/posts/'+p.id+'" style="color:#2C2520;text-decoration:none;font-weight:500;">'+p.title+'</a></td>'+
    '<td><span style="font-size:0.78rem;color:#6B5E52;background:rgba(184,134,58,0.08);padding:0.15rem 0.5rem;border-radius:100px;">'+(p.categories||'None')+'</span></td>'+
    '<td style="font-size:0.82rem;color:#9E9285;">'+(p.date||'')+'</td>'+
    '<td><span class="badge badge-'+p.status+'">'+p.status+'</span></td>'+
    '<td><a href="/admin/posts/'+p.id+'" class="btn btn-outline btn-sm">Edit</a></td></tr>'
  ).join('');
}
loadStats();loadPosts();
</script></body></html>`;
}

function postEditor(postId = null) {
  const isEdit = postId !== null;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${isEdit ? 'Edit' : 'New'} Post | Greg Pignataro Blog CMS</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>GP</text></svg>">
<link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet">
<style>
${adminCSS()}
.ql-container{font-family:Georgia,serif;font-size:1.05rem;line-height:1.8;min-height:350px;border:1px solid rgba(184,134,58,0.2);border-top:none;border-radius:0 0 8px 8px}
.ql-toolbar{border:1px solid rgba(184,134,58,0.2);border-radius:8px 8px 0 0;background:#faf8f5}
.ql-toolbar .ql-stroke{stroke:#6B5E52}
.ql-toolbar .ql-fill{fill:#6B5E52}
.ql-toolbar .ql-picker{color:#6B5E52}
.ql-editor{padding:1.2rem 1.5rem}
.ql-editor p{margin-bottom:0.8rem}
.ql-editor blockquote{border-left:3px solid #B8863A;padding-left:1rem;color:#6B5E52}
.ql-editor h2{font-size:1.4rem;font-weight:400;margin:1.5rem 0 0.5rem}
.ql-editor h3{font-size:1.2rem;font-weight:400;margin:1.2rem 0 0.4rem}
.ql-editor.ql-blank::before{font-style:italic;color:#c0b8ae}
</style></head><body>
${navBar(isEdit ? '' : 'new')}
<div class="container">
<div style="display:flex;align-items:center;margin-bottom:1.5rem;">
<h2 style="font-family:Georgia,serif;font-weight:400;">${isEdit ? 'Edit Post' : 'New Post'}</h2>
<span id="unsavedIndicator" style="display:none;margin-left:0.8rem;font-size:0.78rem;color:#e65100;font-weight:500;">
<span class="unsaved-dot"></span> Unsaved changes
</span>
<span id="autosaveStatus" style="margin-left:auto;font-size:0.75rem;color:#9E9285;"></span>
</div>
<div class="card">
<form id="postForm" onsubmit="savePost(event)">
<div class="form-row"><label>Title</label><input type="text" id="title" required placeholder="Enter post title..."></div>
<div class="form-grid">
<div class="form-row"><label>Slug</label><input type="text" id="slug" required placeholder="auto-generated-from-title"></div>
<div class="form-row"><label>Date</label><input type="date" id="date"></div>
</div>
<div class="form-row"><label>Subtitle</label><input type="text" id="subtitle" placeholder="A brief subtitle for the post"></div>
<div class="form-row"><label>Excerpt</label><textarea id="excerpt" rows="3" placeholder="A short summary shown in post listings and search results..."></textarea></div>

<div class="form-row">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.3rem;">
    <label style="margin-bottom:0;">Body Content</label>
    <div class="editor-tabs">
      <button type="button" class="editor-tab active" onclick="showTab('visual')">Visual Editor</button>
      <button type="button" class="editor-tab" onclick="showTab('html')">HTML Source</button>
      <button type="button" class="editor-tab" onclick="showTab('preview')">Preview</button>
    </div>
  </div>
  <div id="editorVisual">
    <div id="quillEditor"></div>
  </div>
  <div id="editorHTML" style="display:none;">
    <textarea id="body_html_raw" rows="20" style="font-family:'SF Mono',Consolas,monospace;font-size:0.85rem;line-height:1.5;background:#2C2520;color:#e8e4de;border-radius:8px;padding:1rem;"></textarea>
  </div>
  <div id="editorPreview" style="display:none;">
    <div class="preview-panel" id="previewContent" style="display:block;"></div>
  </div>
  <div class="editor-meta">
    <span id="wordCount">0 words</span>
    <span id="charCount">0 characters</span>
  </div>
</div>

<div class="form-grid">
<div class="form-row"><label>Read Time</label><input type="text" id="read_time" placeholder="e.g. 6 min read"></div>
<div class="form-row"><label>Status</label><select id="status"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></div>
</div>
<div class="form-row"><label>Categories</label><div id="categoryCheckboxes" style="display:flex;flex-wrap:wrap;gap:0.3rem 1rem;margin-top:0.4rem;"></div></div>
<div class="form-row" style="display:flex;align-items:center;gap:0.6rem;">
<label style="margin:0;display:flex;align-items:center;gap:0.5rem;text-transform:none;font-size:0.9rem;font-weight:400;color:#2C2520;">
<input type="checkbox" id="featured" style="width:auto;"> Featured Post
</label>
<span style="font-size:0.75rem;color:#9E9285;">(highlighted on the blog homepage)</span>
</div>
<div style="display:flex;gap:0.8rem;margin-top:1.5rem;align-items:center;">
<button type="submit" class="btn btn-gold" id="saveBtn">Save Post</button>
${isEdit ? '<button type="button" class="btn btn-danger" onclick="archivePost()">Archive</button>' : ''}
<a href="/admin" class="btn btn-outline">Cancel</a>
<span id="saveSpinner" style="display:none;font-size:0.82rem;color:#9E9285;">Saving...</span>
</div>
</form></div></div>

<script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"><\/script>
<script>
${toastScript()}
const postId=${isEdit ? postId : 'null'};
let quill;
let isDirty = false;
let autosaveTimer;
let initialData = null;

// Initialize Quill WYSIWYG editor
quill = new Quill('#quillEditor', {
  theme: 'snow',
  placeholder: 'Start writing your post... Use the toolbar above to format text, add headings, quotes, lists, links, and images.',
  modules: {
    toolbar: [
      [{ 'header': [2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      [{ 'align': [] }],
      ['clean']
    ]
  }
});

// Track changes
quill.on('text-change', function() {
  isDirty = true;
  document.getElementById('unsavedIndicator').style.display = 'inline';
  updateCounts();
  clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(autosave, 30000);
});

// Editor tab switching
function showTab(tab) {
  document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('editorVisual').style.display = tab==='visual' ? 'block' : 'none';
  document.getElementById('editorHTML').style.display = tab==='html' ? 'block' : 'none';
  document.getElementById('editorPreview').style.display = tab==='preview' ? 'block' : 'none';

  if (tab === 'html') {
    document.getElementById('body_html_raw').value = quill.root.innerHTML;
  } else if (tab === 'visual') {
    const rawHtml = document.getElementById('body_html_raw').value;
    if (rawHtml && rawHtml !== quill.root.innerHTML) {
      quill.root.innerHTML = rawHtml;
    }
  } else if (tab === 'preview') {
    document.getElementById('previewContent').innerHTML = quill.root.innerHTML;
  }
}

// Word and character counts
function updateCounts() {
  const text = quill.getText().trim();
  const words = text ? text.split(/\\s+/).length : 0;
  const chars = text.length;
  document.getElementById('wordCount').textContent = words + ' word' + (words !== 1 ? 's' : '');
  document.getElementById('charCount').textContent = chars.toLocaleString() + ' characters';
}

// Autosave to localStorage
function autosave() {
  if (!isDirty) return;
  const key = 'cms_autosave_' + (postId || 'new');
  const data = gatherFormData();
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
    document.getElementById('autosaveStatus').textContent = 'Autosaved at ' + new Date().toLocaleTimeString();
  } catch(e) {}
}

// Check for autosave recovery
function checkAutosave() {
  const key = 'cms_autosave_' + (postId || 'new');
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const { data, timestamp } = JSON.parse(saved);
      const age = Date.now() - timestamp;
      if (age < 86400000) { // less than 24 hours
        const mins = Math.round(age / 60000);
        if (confirm('Found autosaved content from ' + mins + ' minutes ago. Restore it?')) {
          populateForm(data);
          showToast('Draft restored from autosave', 'info');
          return true;
        }
      }
      localStorage.removeItem(key);
    }
  } catch(e) {}
  return false;
}

function clearAutosave() {
  const key = 'cms_autosave_' + (postId || 'new');
  try { localStorage.removeItem(key); } catch(e) {}
}

// Unsaved changes warning
window.addEventListener('beforeunload', function(e) {
  if (isDirty) { e.preventDefault(); e.returnValue = ''; }
});

// Keyboard shortcut: Ctrl/Cmd+S to save
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    document.getElementById('postForm').dispatchEvent(new Event('submit', { cancelable: true }));
  }
});

// Strip HTML to plain text
function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

async function api(path, opts) { const r = await fetch(path, opts); return r.json(); }

async function loadCategories() {
  const cats = await api('/api/categories');
  document.getElementById('categoryCheckboxes').innerHTML = cats.map(c =>
    '<label style="display:inline-flex;align-items:center;gap:0.4rem;font-size:0.9rem;text-transform:none;font-weight:400;color:#2C2520;padding:0.3rem 0;">' +
    '<input type="checkbox" class="cat-cb" value="' + c.id + '" style="width:auto;"> ' + c.name + '</label>'
  ).join('');
  return cats;
}

function gatherFormData() {
  const html = quill.root.innerHTML;
  const catIds = [...document.querySelectorAll('.cat-cb:checked')].map(cb => parseInt(cb.value));
  return {
    title: document.getElementById('title').value,
    slug: document.getElementById('slug').value,
    subtitle: document.getElementById('subtitle').value,
    excerpt: document.getElementById('excerpt').value,
    body_html: html,
    body_text: stripHtml(html),
    date: document.getElementById('date').value,
    read_time: document.getElementById('read_time').value,
    status: document.getElementById('status').value,
    featured: document.getElementById('featured').checked,
    category_ids: catIds
  };
}

function populateForm(p) {
  document.getElementById('title').value = p.title || '';
  document.getElementById('slug').value = p.slug || '';
  document.getElementById('subtitle').value = p.subtitle || '';
  document.getElementById('excerpt').value = p.excerpt || '';
  if (p.body_html) { quill.root.innerHTML = p.body_html; }
  document.getElementById('date').value = p.date || '';
  document.getElementById('read_time').value = p.read_time || '';
  document.getElementById('status').value = p.status || 'draft';
  document.getElementById('featured').checked = !!p.featured;
  if (p.category_ids) {
    const ids = Array.isArray(p.category_ids) ? p.category_ids.map(String) : String(p.category_ids).split(',');
    document.querySelectorAll('.cat-cb').forEach(cb => { if (ids.includes(cb.value)) cb.checked = true; });
  }
  updateCounts();
}

async function loadPost() {
  if (!postId) return;
  const p = await api('/api/posts/' + postId);
  populateForm(p);
  initialData = JSON.stringify(gatherFormData());
  isDirty = false;
}

document.getElementById('title').addEventListener('input', function() {
  if (!postId) {
    document.getElementById('slug').value = this.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  isDirty = true;
  document.getElementById('unsavedIndicator').style.display = 'inline';
});

['subtitle','excerpt','date','read_time','status'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    isDirty = true;
    document.getElementById('unsavedIndicator').style.display = 'inline';
  });
});

async function savePost(e) {
  e.preventDefault();
  const saveBtn = document.getElementById('saveBtn');
  const spinner = document.getElementById('saveSpinner');
  saveBtn.disabled = true;
  spinner.style.display = 'inline';

  const data = gatherFormData();
  const url = postId ? '/api/posts/' + postId : '/api/posts';
  const method = postId ? 'PUT' : 'POST';

  try {
    const r = await api(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (r.error) { showToast('Error: ' + r.error, 'error'); return; }
    isDirty = false;
    clearAutosave();
    showToast(postId ? 'Post updated successfully!' : 'Post created!', 'success');
    document.getElementById('unsavedIndicator').style.display = 'none';
    setTimeout(() => { window.location.href = '/admin'; }, 1200);
  } catch(err) {
    showToast('Network error. Please try again.', 'error');
  } finally {
    saveBtn.disabled = false;
    spinner.style.display = 'none';
  }
}

async function archivePost() {
  if (!confirm('Archive this post? It can be restored later.')) return;
  try {
    await api('/api/posts/' + postId, { method: 'DELETE' });
    isDirty = false;
    clearAutosave();
    showToast('Post archived', 'info');
    setTimeout(() => { window.location.href = '/admin'; }, 1200);
  } catch(err) {
    showToast('Failed to archive post.', 'error');
  }
}

// Initialize
loadCategories().then(() => {
  if (!checkAutosave()) {
    loadPost();
  }
});
<\/script></body></html>`;
}

function categoryManager() {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Categories | Greg Pignataro Blog CMS</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>GP</text></svg>">
<style>${adminCSS()}</style></head><body>
${navBar('categories')}
<div class="container">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
<h2 style="font-family:Georgia,serif;font-weight:400;">Categories</h2>
<button class="btn btn-gold" onclick="document.getElementById('newCatForm').style.display='block'">New Category</button></div>
<div id="newCatForm" class="card" style="display:none;margin-bottom:1.5rem;">
<h3 style="font-family:Georgia,serif;font-weight:400;margin-bottom:1rem;">New Category</h3>
<div class="form-grid">
<div class="form-row"><label>Name</label><input type="text" id="newCatName" required placeholder="Category name"></div>
<div class="form-row"><label>Slug</label><input type="text" id="newCatSlug" placeholder="auto-generated"></div>
</div>
<div class="form-row"><label>Description</label><textarea id="newCatDesc" rows="2" placeholder="Optional description..."></textarea></div>
<div class="form-row"><label>Sort Order</label><input type="number" id="newCatOrder" value="0" style="width:100px;"></div>
<button class="btn btn-gold" onclick="createCat()">Create</button>
<button class="btn btn-outline" onclick="document.getElementById('newCatForm').style.display='none'" style="margin-left:0.5rem;">Cancel</button>
</div>

<!-- Edit modal -->
<div id="editCatModal" class="card" style="display:none;margin-bottom:1.5rem;border:2px solid #B8863A;">
<h3 style="font-family:Georgia,serif;font-weight:400;margin-bottom:1rem;">Edit Category</h3>
<input type="hidden" id="editCatId">
<div class="form-grid">
<div class="form-row"><label>Name</label><input type="text" id="editCatName"></div>
<div class="form-row"><label>Slug</label><input type="text" id="editCatSlug"></div>
</div>
<div class="form-row"><label>Description</label><textarea id="editCatDesc" rows="2"></textarea></div>
<div class="form-row"><label>Sort Order</label><input type="number" id="editCatOrder" style="width:100px;"></div>
<button class="btn btn-gold" onclick="updateCat()">Update</button>
<button class="btn btn-outline" onclick="document.getElementById('editCatModal').style.display='none'" style="margin-left:0.5rem;">Cancel</button>
</div>

<div class="card"><table><thead><tr><th>Name</th><th>Slug</th><th>Posts</th><th>Sort</th><th>Actions</th></tr></thead><tbody id="catList">
  <tr><td colspan="5"><div class="skeleton"></div><div class="skeleton" style="width:60%"></div></td></tr>
</tbody></table></div>
</div>
<script>
${toastScript()}
async function api(path,opts){const r=await fetch(path,opts);return r.json();}
async function loadCats(){
  const cats=await api('/api/categories');
  document.getElementById('catList').innerHTML=cats.map(c=>
    '<tr><td style="font-weight:500;">'+c.name+'</td><td style="font-size:0.82rem;color:#9E9285;">'+c.slug+'</td>'+
    '<td>'+c.post_count+'</td><td>'+c.sort_order+'</td>'+
    '<td style="display:flex;gap:0.4rem;"><button class="btn btn-outline btn-sm" onclick="editCat('+c.id+',\\''+c.name.replace(/'/g,"\\\\'")+'\\',\\''+c.slug+'\\',\\''+
    (c.description||'').replace(/'/g,"\\\\'")+'\\','+c.sort_order+')">Edit</button>'+
    '<button class="btn btn-danger btn-sm" onclick="deleteCat('+c.id+')">Delete</button></td></tr>'
  ).join('');
}
document.getElementById('newCatName').addEventListener('input',function(){
  document.getElementById('newCatSlug').value=this.value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
});
async function createCat(){
  const name = document.getElementById('newCatName').value.trim();
  if(!name){ showToast('Category name is required','error'); return; }
  await api('/api/categories',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
    name:name,slug:document.getElementById('newCatSlug').value,
    description:document.getElementById('newCatDesc').value,sort_order:parseInt(document.getElementById('newCatOrder').value)||0
  })});
  document.getElementById('newCatForm').style.display='none';
  document.getElementById('newCatName').value='';
  document.getElementById('newCatSlug').value='';
  document.getElementById('newCatDesc').value='';
  showToast('Category created!');
  loadCats();
}
function editCat(id,name,slug,desc,order){
  document.getElementById('editCatModal').style.display='block';
  document.getElementById('editCatId').value=id;
  document.getElementById('editCatName').value=name;
  document.getElementById('editCatSlug').value=slug;
  document.getElementById('editCatDesc').value=desc;
  document.getElementById('editCatOrder').value=order;
  window.scrollTo({top:0,behavior:'smooth'});
}
async function updateCat(){
  const id=document.getElementById('editCatId').value;
  await api('/api/categories/'+id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({
    name:document.getElementById('editCatName').value,
    slug:document.getElementById('editCatSlug').value,
    description:document.getElementById('editCatDesc').value,
    sort_order:parseInt(document.getElementById('editCatOrder').value)||0
  })});
  document.getElementById('editCatModal').style.display='none';
  showToast('Category updated!');
  loadCats();
}
async function deleteCat(id){if(!confirm('Delete this category? Posts will be unlinked but not deleted.'))return;await api('/api/categories/'+id,{method:'DELETE'});showToast('Category deleted','info');loadCats();}
loadCats();
<\/script></body></html>`;
}

function searchPage() {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Search / RAG | Greg Pignataro Blog CMS</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>GP</text></svg>">
<style>${adminCSS()}</style></head><body>
${navBar('search')}
<div class="container">
<h2 style="font-family:Georgia,serif;font-weight:400;margin-bottom:0.5rem;">Search Greg's Writing</h2>
<p style="color:#6B5E52;margin-bottom:1.5rem;font-size:0.9rem;">Query across all 42 essays. Search by topic, concept, keyword, or question. Results are ranked by relevance.</p>
<div class="search-box">
<input type="text" id="searchInput" placeholder="Search across all writing... (e.g. nervous system, identity, hunger)" autofocus>
<button class="clear-btn" id="clearSearch" onclick="document.getElementById('searchInput').value='';document.getElementById('results').innerHTML='';this.style.display='none';">\u2715</button>
</div>
<div style="display:flex;gap:0.6rem;margin-bottom:1.5rem;flex-wrap:wrap;">
<button class="btn btn-outline btn-sm" onclick="quickSearch('darkness retreat')">Darkness</button>
<button class="btn btn-outline btn-sm" onclick="quickSearch('nervous system')">Nervous System</button>
<button class="btn btn-outline btn-sm" onclick="quickSearch('identity')">Identity</button>
<button class="btn btn-outline btn-sm" onclick="quickSearch('hunger')">Hunger</button>
<button class="btn btn-outline btn-sm" onclick="quickSearch('pain')">Pain</button>
<button class="btn btn-outline btn-sm" onclick="quickSearch('meditation')">Meditation</button>
<button class="btn btn-outline btn-sm" onclick="quickSearch('training')">Training</button>
</div>
<div id="results"></div>
</div>
<script>
${toastScript()}
let timer;
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearSearch');
searchInput.addEventListener('input', function(){
  clearTimeout(timer);
  clearBtn.style.display = this.value ? 'block' : 'none';
  timer = setTimeout(() => doSearch(this.value), 300);
});
function quickSearch(q){ searchInput.value = q; clearBtn.style.display = 'block'; doSearch(q); }
function highlightText(text, query) {
  if (!query || !text) return text || '';
  const words = query.split(/\\s+/).filter(w => w.length > 1);
  let result = text;
  words.forEach(w => {
    const regex = new RegExp('(' + w.replace(/[.*+?^()|[\\]\\\\]/g, '\\\\$&') + ')', 'gi');
    result = result.replace(regex, '<mark style="background:#fef3c7;padding:0 2px;border-radius:2px;">$1</mark>');
  });
  return result;
}
async function doSearch(q){
  if(!q||q.length<2){document.getElementById('results').innerHTML='';return;}
  document.getElementById('results').innerHTML='<div style="text-align:center;padding:2rem;"><div class="skeleton" style="width:60%;margin:0 auto"></div></div>';
  const r=await fetch('/api/search?q='+encodeURIComponent(q));
  const data=await r.json();
  if(!data.results.length){
    document.getElementById('results').innerHTML='<div class="card" style="text-align:center;color:#9E9285;padding:3rem;">No results found for "'+q+'"</div>';
    return;
  }
  document.getElementById('results').innerHTML=
    '<p style="font-size:0.82rem;color:#9E9285;margin-bottom:1rem;">'+data.count+' result'+(data.count!==1?'s':'')+' for "'+data.query+'"</p>'+
    data.results.map(p=>
      '<div class="card" style="cursor:pointer;">'+
      '<div style="display:flex;justify-content:space-between;align-items:start;">'+
      '<div style="flex:1;min-width:0;">'+
      '<h3 style="font-family:Georgia,serif;font-weight:400;font-size:1.15rem;margin-bottom:0.3rem;">'+highlightText(p.title, q)+'</h3>'+
      '<p style="font-size:0.85rem;color:#6B5E52;margin-bottom:0.4rem;">'+highlightText(p.subtitle||'', q)+'</p>'+
      '<p style="font-size:0.82rem;color:#9E9285;">'+(p.categories||'Uncategorized')+' &middot; '+(p.date||'')+'</p>'+
      '<div style="margin-top:0.6rem;display:flex;gap:0.5rem;">'+
      '<a href="/admin/posts/'+p.id+'" class="btn btn-outline btn-sm" onclick="event.stopPropagation();">Edit</a>'+
      '<a href="https://gregpignataro.com/blog/'+p.slug+'.html" target="_blank" class="btn btn-outline btn-sm" onclick="event.stopPropagation();">View on Site \u2197</a>'+
      '</div></div>'+
      '<span class="badge badge-'+p.status+'">'+p.status+'</span></div></div>'
    ).join('');
}
<\/script></body></html>`;
}
