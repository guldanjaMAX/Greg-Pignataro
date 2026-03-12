// Greg Pignataro Blog CMS + Knowledge Base Worker
// D1 Database: greg-pignataro-blog (ef4caacc-5dfc-4c5e-966a-10a499dc1169)

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

// Admin UI Pages
function loginPage(error = '') {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Login | Greg Pignataro Blog CMS</title><style>${adminCSS()}</style></head><body>
<div style="max-width:400px;margin:100px auto;padding:2rem;">
<h1 style="font-family:Georgia,serif;text-align:center;margin-bottom:2rem;color:#2C2520;">Blog CMS</h1>
${error ? `<div style="background:#fee;border:1px solid #fcc;padding:0.8rem;border-radius:8px;margin-bottom:1rem;color:#c33;font-size:0.9rem;">${error}</div>` : ''}
<form method="POST" action="/admin/login">
<label style="display:block;font-size:0.8rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#6B5E52;margin-bottom:0.4rem;">Admin Token</label>
<input type="password" name="token" required style="width:100%;padding:0.8rem;border:1px solid rgba(184,134,58,0.2);border-radius:8px;font-size:1rem;font-family:inherit;margin-bottom:1rem;">
<button type="submit" style="width:100%;padding:0.8rem;background:#B8863A;color:#fff;border:none;border-radius:8px;font-size:0.85rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;">Sign In</button>
</form></div></body></html>`;
}

function adminCSS() {
  return `*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',-apple-system,sans-serif;background:#f8f6f3;color:#2C2520;font-size:15px;line-height:1.6}
.topbar{background:#2C2520;color:#fff;padding:0.8rem 2rem;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50}
.topbar h1{font-family:Georgia,serif;font-size:1.1rem;font-weight:400;letter-spacing:0.04em}
.topbar nav a{color:rgba(255,255,255,0.7);text-decoration:none;font-size:0.78rem;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;margin-left:2rem;transition:color 0.2s}
.topbar nav a:hover,.topbar nav a.active{color:#C99B4F}
.container{max-width:1100px;margin:0 auto;padding:2rem}
.card{background:#fff;border:1px solid rgba(184,134,58,0.12);border-radius:12px;padding:1.8rem;margin-bottom:1.2rem;box-shadow:0 2px 8px rgba(0,0,0,0.03)}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:2rem}
.stat-card{background:#fff;border:1px solid rgba(184,134,58,0.12);border-radius:12px;padding:1.4rem;text-align:center}
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
.btn-sm{padding:0.35rem 0.8rem;font-size:0.7rem}
input,textarea,select{font-family:inherit;font-size:0.95rem;padding:0.7rem;border:1px solid rgba(184,134,58,0.2);border-radius:8px;width:100%;transition:border-color 0.2s}
input:focus,textarea:focus,select:focus{outline:none;border-color:#B8863A}
label{display:block;font-size:0.72rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#6B5E52;margin-bottom:0.3rem}
.form-row{margin-bottom:1.2rem}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.search-box{position:relative;margin-bottom:1.5rem}
.search-box input{padding-left:2.4rem;font-size:1rem}
.search-box::before{content:"\uD83D\uDD0D";position:absolute;left:0.8rem;top:50%;transform:translateY(-50%);font-size:1rem}
@media(max-width:768px){.container{padding:1rem}.form-grid{grid-template-columns:1fr}.topbar nav a{margin-left:1rem;font-size:0.68rem}}`;
}

function adminDashboard() {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Dashboard | Greg Pignataro Blog CMS</title><style>${adminCSS()}</style></head><body>
<div class="topbar"><h1>Greg Pignataro CMS</h1><nav>
<a href="/admin" class="active">Dashboard</a><a href="/admin/posts/new">New Post</a><a href="/admin/categories">Categories</a><a href="/admin/search">Search / RAG</a>
<a href="https://gregpignataro.com/blog.html" target="_blank">View Site</a></nav></div>
<div class="container">
<div class="stats-grid" id="stats"></div>
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
<h2 style="font-family:Georgia,serif;font-weight:400;">All Posts</h2>
<div><select id="statusFilter" onchange="loadPosts()" style="width:auto;padding:0.4rem 0.8rem;font-size:0.8rem;margin-right:0.5rem;">
<option value="all">All Status</option><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select>
<a href="/admin/posts/new" class="btn btn-gold">New Post</a></div></div>
<div class="card"><table><thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody id="postsList"></tbody></table></div>
</div>
<script>
async function api(path){const r=await fetch(path);return r.json();}
async function loadStats(){
  const s=await api('/api/stats');
  document.getElementById('stats').innerHTML=
    '<div class="stat-card"><div class="num">'+s.total+'</div><div class="label">Total Posts</div></div>'+
    '<div class="stat-card"><div class="num">'+s.published+'</div><div class="label">Published</div></div>'+
    '<div class="stat-card"><div class="num">'+s.drafts+'</div><div class="label">Drafts</div></div>'+
    '<div class="stat-card"><div class="num">'+s.categories+'</div><div class="label">Categories</div></div>';
}
async function loadPosts(){
  const status=document.getElementById('statusFilter').value;
  const data=await api('/api/posts?status='+status);
  document.getElementById('postsList').innerHTML=data.posts.map(p=>
    '<tr><td><a href="/admin/posts/'+p.id+'" style="color:#2C2520;text-decoration:none;font-weight:500;">'+p.title+'</a></td>'+
    '<td style="font-size:0.82rem;color:#6B5E52;">'+(p.categories||'None')+'</td>'+
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
<title>${isEdit ? 'Edit' : 'New'} Post | Greg Pignataro Blog CMS</title><style>${adminCSS()}</style></head><body>
<div class="topbar"><h1>Greg Pignataro CMS</h1><nav>
<a href="/admin">Dashboard</a><a href="/admin/posts/new" ${!isEdit ? 'class="active"' : ''}>New Post</a><a href="/admin/categories">Categories</a><a href="/admin/search">Search / RAG</a></nav></div>
<div class="container">
<h2 style="font-family:Georgia,serif;font-weight:400;margin-bottom:1.5rem;">${isEdit ? 'Edit Post' : 'New Post'}</h2>
<div class="card">
<form id="postForm" onsubmit="savePost(event)">
<div class="form-row"><label>Title</label><input type="text" id="title" required></div>
<div class="form-grid">
<div class="form-row"><label>Slug</label><input type="text" id="slug" required></div>
<div class="form-row"><label>Date</label><input type="date" id="date"></div>
</div>
<div class="form-row"><label>Subtitle</label><input type="text" id="subtitle"></div>
<div class="form-row"><label>Excerpt</label><textarea id="excerpt" rows="3"></textarea></div>
<div class="form-row"><label>Body (HTML)</label><textarea id="body_html" rows="16" style="font-family:monospace;font-size:0.85rem;"></textarea></div>
<div class="form-row"><label>Body (Plain Text for Search)</label><textarea id="body_text" rows="10"></textarea></div>
<div class="form-grid">
<div class="form-row"><label>Read Time</label><input type="text" id="read_time" placeholder="6 min read"></div>
<div class="form-row"><label>Status</label><select id="status"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></div>
</div>
<div class="form-row"><label>Categories</label><div id="categoryCheckboxes"></div></div>
<div class="form-row"><label><input type="checkbox" id="featured"> Featured Post</label></div>
<div style="display:flex;gap:0.8rem;margin-top:1.5rem;">
<button type="submit" class="btn btn-gold">Save Post</button>
${isEdit ? '<button type="button" class="btn btn-outline" onclick="archivePost()">Archive</button>' : ''}
<a href="/admin" class="btn btn-outline">Cancel</a>
</div>
</form></div></div>
<script>
const postId=${isEdit ? postId : 'null'};
async function api(path,opts){const r=await fetch(path,opts);return r.json();}
async function loadCategories(){
  const cats=await api('/api/categories');
  document.getElementById('categoryCheckboxes').innerHTML=cats.map(c=>
    '<label style="display:inline-flex;align-items:center;gap:0.4rem;margin-right:1.2rem;font-size:0.9rem;text-transform:none;font-weight:400;color:#2C2520;">'+
    '<input type="checkbox" class="cat-cb" value="'+c.id+'"> '+c.name+'</label>'
  ).join('');
  return cats;
}
async function loadPost(){
  if(!postId)return;
  const p=await api('/api/posts/'+postId);
  document.getElementById('title').value=p.title||'';
  document.getElementById('slug').value=p.slug||'';
  document.getElementById('subtitle').value=p.subtitle||'';
  document.getElementById('excerpt').value=p.excerpt||'';
  document.getElementById('body_html').value=p.body_html||'';
  document.getElementById('body_text').value=p.body_text||'';
  document.getElementById('date').value=p.date||'';
  document.getElementById('read_time').value=p.read_time||'';
  document.getElementById('status').value=p.status||'draft';
  document.getElementById('featured').checked=!!p.featured;
  if(p.category_ids){
    const ids=p.category_ids.split(',');
    document.querySelectorAll('.cat-cb').forEach(cb=>{if(ids.includes(cb.value))cb.checked=true;});
  }
}
document.getElementById('title').addEventListener('input',function(){
  if(!postId){document.getElementById('slug').value=this.value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');}
});
async function savePost(e){
  e.preventDefault();
  const catIds=[...document.querySelectorAll('.cat-cb:checked')].map(cb=>parseInt(cb.value));
  const data={
    title:document.getElementById('title').value,
    slug:document.getElementById('slug').value,
    subtitle:document.getElementById('subtitle').value,
    excerpt:document.getElementById('excerpt').value,
    body_html:document.getElementById('body_html').value,
    body_text:document.getElementById('body_text').value,
    date:document.getElementById('date').value,
    read_time:document.getElementById('read_time').value,
    status:document.getElementById('status').value,
    featured:document.getElementById('featured').checked,
    category_ids:catIds
  };
  const url=postId?'/api/posts/'+postId:'/api/posts';
  const method=postId?'PUT':'POST';
  const r=await api(url,{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  if(r.error){alert('Error: '+r.error);return;}
  window.location.href='/admin';
}
async function archivePost(){
  if(!confirm('Archive this post?'))return;
  await api('/api/posts/'+postId,{method:'DELETE'});
  window.location.href='/admin';
}
loadCategories().then(()=>loadPost());
</script></body></html>`;
}

function categoryManager() {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Categories | Greg Pignataro Blog CMS</title><style>${adminCSS()}</style></head><body>
<div class="topbar"><h1>Greg Pignataro CMS</h1><nav>
<a href="/admin">Dashboard</a><a href="/admin/posts/new">New Post</a><a href="/admin/categories" class="active">Categories</a><a href="/admin/search">Search / RAG</a></nav></div>
<div class="container">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
<h2 style="font-family:Georgia,serif;font-weight:400;">Categories</h2>
<button class="btn btn-gold" onclick="document.getElementById('newCatForm').style.display='block'">New Category</button></div>
<div id="newCatForm" class="card" style="display:none;margin-bottom:1.5rem;">
<h3 style="font-family:Georgia,serif;font-weight:400;margin-bottom:1rem;">New Category</h3>
<div class="form-grid">
<div class="form-row"><label>Name</label><input type="text" id="newCatName"></div>
<div class="form-row"><label>Slug</label><input type="text" id="newCatSlug"></div>
</div>
<div class="form-row"><label>Description</label><textarea id="newCatDesc" rows="2"></textarea></div>
<div class="form-row"><label>Sort Order</label><input type="number" id="newCatOrder" value="0" style="width:100px;"></div>
<button class="btn btn-gold" onclick="createCat()">Create</button>
<button class="btn btn-outline" onclick="document.getElementById('newCatForm').style.display='none'" style="margin-left:0.5rem;">Cancel</button>
</div>
<div class="card"><table><thead><tr><th>Name</th><th>Slug</th><th>Posts</th><th>Sort</th><th>Actions</th></tr></thead><tbody id="catList"></tbody></table></div>
</div>
<script>
async function api(path,opts){const r=await fetch(path,opts);return r.json();}
async function loadCats(){
  const cats=await api('/api/categories');
  document.getElementById('catList').innerHTML=cats.map(c=>
    '<tr><td style="font-weight:500;">'+c.name+'</td><td style="font-size:0.82rem;color:#9E9285;">'+c.slug+'</td>'+
    '<td>'+c.post_count+'</td><td>'+c.sort_order+'</td>'+
    '<td><button class="btn btn-outline btn-sm" onclick="deleteCat('+c.id+')">Delete</button></td></tr>'
  ).join('');
}
document.getElementById('newCatName').addEventListener('input',function(){
  document.getElementById('newCatSlug').value=this.value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
});
async function createCat(){
  await api('/api/categories',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
    name:document.getElementById('newCatName').value,slug:document.getElementById('newCatSlug').value,
    description:document.getElementById('newCatDesc').value,sort_order:parseInt(document.getElementById('newCatOrder').value)||0
  })});
  document.getElementById('newCatForm').style.display='none';loadCats();
}
async function deleteCat(id){if(!confirm('Delete this category?'))return;await api('/api/categories/'+id,{method:'DELETE'});loadCats();}
loadCats();
</script></body></html>`;
}

function searchPage() {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Search / RAG | Greg Pignataro Blog CMS</title><style>${adminCSS()}</style></head><body>
<div class="topbar"><h1>Greg Pignataro CMS</h1><nav>
<a href="/admin">Dashboard</a><a href="/admin/posts/new">New Post</a><a href="/admin/categories">Categories</a><a href="/admin/search" class="active">Search / RAG</a></nav></div>
<div class="container">
<h2 style="font-family:Georgia,serif;font-weight:400;margin-bottom:0.5rem;">Search Greg's Writing</h2>
<p style="color:#6B5E52;margin-bottom:1.5rem;font-size:0.9rem;">Query across all 42 essays. Search by topic, concept, keyword, or question. Results are ranked by relevance.</p>
<div class="search-box"><input type="text" id="searchInput" placeholder="Search across all writing... (e.g. nervous system, identity, hunger)" autofocus></div>
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
let timer;
document.getElementById('searchInput').addEventListener('input',function(){
  clearTimeout(timer);
  timer=setTimeout(()=>doSearch(this.value),300);
});
function quickSearch(q){document.getElementById('searchInput').value=q;doSearch(q);}
async function doSearch(q){
  if(!q||q.length<2){document.getElementById('results').innerHTML='';return;}
  const r=await fetch('/api/search?q='+encodeURIComponent(q));
  const data=await r.json();
  if(!data.results.length){
    document.getElementById('results').innerHTML='<div class="card" style="text-align:center;color:#9E9285;padding:3rem;">No results found for "'+q+'"</div>';
    return;
  }
  document.getElementById('results').innerHTML=
    '<p style="font-size:0.82rem;color:#9E9285;margin-bottom:1rem;">'+data.count+' result'+(data.count!==1?'s':'')+' for "'+data.query+'"</p>'+
    data.results.map(p=>
      '<div class="card" style="cursor:pointer;" onclick="window.open(\'https://gregpignataro.com/blog/'+p.slug+'.html\',\'_blank\')">'+
      '<div style="display:flex;justify-content:space-between;align-items:start;">'+
      '<div><h3 style="font-family:Georgia,serif;font-weight:400;font-size:1.15rem;margin-bottom:0.3rem;">'+p.title+'</h3>'+
      '<p style="font-size:0.85rem;color:#6B5E52;margin-bottom:0.4rem;">'+p.subtitle+'</p>'+
      '<p style="font-size:0.82rem;color:#9E9285;">'+(p.categories||'Uncategorized')+' &middot; '+(p.date||'')+'</p></div>'+
      '<span class="badge badge-'+p.status+'">'+p.status+'</span></div></div>'
    ).join('');
}
</script></body></html>`;
}