'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, ChevronDown, Heart, Menu, Minus, Plus, Search, ShoppingBag, Sparkles, Star, Truck, X, Zap } from 'lucide-react'

const categories = ['All products', 'Audio', 'Smart devices', 'Mobile accessories', 'Gaming', 'Workspace', 'Laptop accessories']
const productSeeds = [
  ['AeroPods Pro', 'Audio', 149, 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=85'],
  ['Halo Headphones', 'Audio', 229, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85'],
  ['Arc Mini Speaker', 'Audio', 119, 'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=85'],
  ['Pulse Watch S2', 'Smart devices', 279, 'https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=900&q=85'],
  ['Loop Fitness Band', 'Smart devices', 89, 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?auto=format&fit=crop&w=900&q=85'],
  ['NexCharge 65W', 'Mobile accessories', 69, 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=85'],
  ['Vault Power Bank', 'Mobile accessories', 99, 'https://images.unsplash.com/photo-1609592424989-9d0a3f2c77c8?auto=format&fit=crop&w=900&q=85'],
  ['Flow USB-C Cable', 'Mobile accessories', 29, 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=900&q=85'],
  ['Vector Mouse', 'Gaming', 109, 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85'],
  ['Strix Mechanical', 'Gaming', 159, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85'],
  ['Luma Desk Light', 'Workspace', 129, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85'],
  ['Elevate Stand', 'Workspace', 89, 'https://images.unsplash.com/photo-1616627561950-9f746e330187?auto=format&fit=crop&w=900&q=85'],
]
const products = Array.from({ length: 50 }, (_, index) => {
  const seed = productSeeds[index % productSeeds.length]
  return { id: index + 1, name: index < productSeeds.length ? seed[0] : `${seed[0]} ${Math.floor(index / productSeeds.length) + 1}`, category: seed[1], price: seed[2] + (index % 4) * 10, image: seed[3], rating: 4.7 - (index % 3) * 0.1, reviews: 24 + index * 7, description: 'Thoughtfully engineered essentials with a refined finish, made for the way you live and work.' }
})

function ProductCard({ product, wished, onWish, onAdd, onQuick }: { product: typeof products[number]; wished: boolean; onWish: () => void; onAdd: () => void; onQuick: () => void }) {
  return <article className="product-card group">
    <div className="product-image-wrap">
      <img src={product.image} alt={product.name} className="product-image" />
      <button aria-label={`Add ${product.name} to wishlist`} onClick={onWish} className={`wish-button ${wished ? 'is-wished' : ''}`}><Heart fill={wished ? 'currentColor' : 'none'} /></button>
      <button onClick={onQuick} className="quick-view">Quick view</button>
    </div>
    <div className="product-meta">
      <div className="product-category">{product.category}</div>
      <h3>{product.name}</h3>
      <div className="product-bottom"><span className="price">${product.price}</span><span className="rating"><Star fill="currentColor" /> {product.rating}</span></div>
      <button onClick={onAdd} className="add-button"><Plus /> Add to bag</button>
    </div>
  </article>
}

export default function Page() {
  const [activeCategory, setActiveCategory] = useState('All products')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [wishlist, setWishlist] = useState<number[]>([])
  const [quick, setQuick] = useState<typeof products[number] | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const [email, setEmail] = useState('')
  const filtered = useMemo(() => products.filter((p) => (activeCategory === 'All products' || p.category === activeCategory) && p.name.toLowerCase().includes(query.toLowerCase())), [activeCategory, query])
  const featured = products.slice(0, 4)
  const addToCart = (id: number) => { setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 })); setNotice('Added to your bag'); setTimeout(() => setNotice(''), 2200) }
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => sum + products.find((p) => p.id === Number(id))!.price * qty, 0)
  const toggleWish = (id: number) => setWishlist((w) => w.includes(id) ? w.filter((x) => x !== id) : [...w, id])

  return <main>
    <div className="announcement"><span><Zap /> Complimentary express shipping on orders over $150</span><button onClick={() => setNotice('Shipping details coming right up')}>Learn more <ArrowRight /></button></div>
    <header className="site-header">
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu"><Menu /></button>
      <a className="logo" href="#top">NEX<span>O</span>RA</a>
      <nav className={menuOpen ? 'nav open' : 'nav'}><a href="#shop">Shop</a><a href="#collections">Collections</a><a href="#story">Our story</a><a href="#journal">Journal</a></nav>
      <div className="header-actions"><button aria-label="Search" onClick={() => document.getElementById('shop')?.scrollIntoView()}><Search /></button><button aria-label="Wishlist" onClick={() => setNotice(`${wishlist.length} item${wishlist.length === 1 ? '' : 's'} saved`)}><Heart /><small>{wishlist.length}</small></button><button className="bag-trigger" aria-label="Shopping bag" onClick={() => setNotice(cartCount ? `${cartCount} item${cartCount === 1 ? '' : 's'} · $${cartTotal}` : 'Your bag is empty')}><ShoppingBag /><small>{cartCount}</small></button></div>
    </header>

    <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow">The new standard of living</p><h1>Make room<br /><em>for better.</em></h1><p className="hero-description">Technology that belongs in your world. Designed with intention, built for every day.</p><a href="#shop" className="gold-button">Explore the collection <ArrowRight /></a></div><div className="hero-image"><img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1600&q=90" alt="Minimal modern workspace with NEXORA technology" /><div className="hero-caption"><span>01 / 04</span><span>Objects for a considered life</span></div></div></section>

    <section className="trust-row"><div><Truck /><span><strong>Free express delivery</strong>On orders over $150</span></div><div><Sparkles /><span><strong>Two-year warranty</strong>Designed to last</span></div><div><Heart /><span><strong>Made for humans</strong>Thoughtful by design</span></div></section>

    <section className="section" id="shop"><div className="section-heading"><div><p className="eyebrow">Curated for you</p><h2>Featured essentials</h2></div><a className="text-link" href="#all">View all products <ArrowRight /></a></div><div className="product-grid">{featured.map((p) => <ProductCard key={p.id} product={p} wished={wishlist.includes(p.id)} onWish={() => toggleWish(p.id)} onAdd={() => addToCart(p.id)} onQuick={() => setQuick(p)} />)}</div></section>

    <section className="editorial" id="collections"><div className="editorial-image"><img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=85" alt="Premium headphones on a cream pedestal" /></div><div className="editorial-copy"><p className="eyebrow">The listening room</p><h2>Sound, in<br /><em>its purest form.</em></h2><p>From the first note to the last. Our audio collection is tuned for depth, clarity, and the quiet moments in between.</p><button className="outline-button" onClick={() => { setActiveCategory('Audio'); document.getElementById('all')?.scrollIntoView() }}>Shop audio <ArrowRight /></button></div></section>

    <section className="section shop-all" id="all"><div className="section-heading"><div><p className="eyebrow">Explore NEXORA</p><h2>All products</h2></div><div className="search-box"><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" /></div></div><div className="category-scroll">{categories.map((c) => <button key={c} className={activeCategory === c ? 'active' : ''} onClick={() => setActiveCategory(c)}>{c}</button>)}</div><div className="product-grid">{filtered.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} wished={wishlist.includes(p.id)} onWish={() => toggleWish(p.id)} onAdd={() => addToCart(p.id)} onQuick={() => setQuick(p)} />)}</div><button className="load-more" onClick={() => setNotice(`${filtered.length} products available in this collection`)}>Load more products <ChevronDown /></button></section>

    <section className="story" id="story"><div><p className="eyebrow">Why NEXORA</p><h2>Less noise.<br /><em>More living.</em></h2></div><div><p>We believe the best technology doesn&apos;t ask for attention. It earns a place in your life by making everyday moments feel a little more effortless.</p><a className="text-link" href="#footer">Discover our story <ArrowRight /></a></div></section>

    <section className="newsletter" id="journal"><p className="eyebrow">Stay in the know</p><h2>Good things, thoughtfully shared.</h2><p>New releases, considered stories, and a little inspiration. No noise.</p><form onSubmit={(e) => { e.preventDefault(); if (email) { setNotice('You are on the list'); setEmail('') } }}><input type="email" required placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} /><button className="gold-button" type="submit">Subscribe <ArrowRight /></button></form></section>

    <footer id="footer"><div className="footer-brand"><a className="logo" href="#top">NEX<span>O</span>RA</a><p>Technology, considered.</p></div><div><h4>Explore</h4><a href="#shop">Shop all</a><a href="#collections">Collections</a><a href="#story">Our story</a></div><div><h4>Support</h4><a href="#footer">Contact us</a><a href="#footer">Shipping & returns</a><a href="#footer">FAQ</a></div><div><h4>Follow along</h4><a href="#footer">Instagram</a><a href="#footer">Pinterest</a><a href="#footer">X / Twitter</a></div><div className="footer-bottom">© 2025 NEXORA. All rights reserved. <span>Privacy · Terms</span></div></footer>

    {notice && <div className="toast" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss"><X /></button></div>}
    {quick && <div className="modal-backdrop" onClick={() => setQuick(null)}><div className="quick-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setQuick(null)} aria-label="Close"><X /></button><img src={quick.image} alt={quick.name} /><div><p className="eyebrow">{quick.category}</p><h2>{quick.name}</h2><div className="modal-rating"><Star fill="currentColor" /> {quick.rating} ({quick.reviews} reviews)</div><p>{quick.description}</p><strong className="modal-price">${quick.price}</strong><button className="gold-button" onClick={() => { addToCart(quick.id); setQuick(null) }}>Add to bag <ArrowRight /></button></div></div></div>}
  </main>
}
