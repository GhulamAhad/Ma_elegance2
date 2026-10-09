import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag, Users, TrendingUp, Plus, Pencil, Trash2, LogOut, Search, X, CheckCircle2, Clock3, Truck, Ban, Eye, ArrowUpRight } from "lucide-react";
import { useCatalog } from "../../context/CatalogContext";
import { api } from "../../services/Services";

const money=n=>`Rs. ${Number(n||0).toLocaleString()}`;
const statuses=["Pending","Confirmed","Shipped","Delivered","Cancelled"];

function Stat({icon:Icon,label,value,sub}) {
  return <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm">
    <div className="flex items-start justify-between"><div className="w-11 h-11 rounded-2xl bg-[#FAF8F4] text-[#C9A227] flex items-center justify-center"><Icon size={20}/></div><ArrowUpRight size={16} className="text-gray-300"/></div>
    <p className="text-sm text-gray-500 mt-5">{label}</p><p className="text-3xl font-semibold mt-1">{value}</p><p className="text-xs text-gray-400 mt-2">{sub}</p>
  </div>
}

function ProductModal({product,onClose,onSave}) {
  const [form,setForm]=useState(product||{name:"",category:"Perfume",price:"",oldPrice:"",stock:10,rating:5,reviews:0,description:"",image:"",isNew:true,badge:"New"});
  const [uploading,setUploading]=useState(false);
  const [uploadError,setUploadError]=useState("");
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const upload=async e=>{ const file=e.target.files?.[0]; if(!file) return; setUploading(true); setUploadError(""); try { const result=await api.uploadImage(file); set("image",result.url); } catch(err){ setUploadError(err.message || "Upload failed"); } finally { setUploading(false); } };
  return <div className="fixed inset-0 z-[100] bg-black/60 p-4 overflow-y-auto"><div className="min-h-full flex items-center justify-center py-8">
    <form onSubmit={e=>{e.preventDefault();onSave(form)}} className="w-full max-w-2xl bg-white rounded-[2rem] p-6 sm:p-8 shadow-2xl">
      <div className="flex justify-between items-start"><div><p className="gold-label">CATALOG MANAGER</p><h2 className="text-3xl mt-2">{product?"Edit Product":"Add Product"}</h2></div><button type="button" onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"><X size={18}/></button></div>
      <div className="grid sm:grid-cols-2 gap-4 mt-7">
        <label className="sm:col-span-2 text-sm">Product Name<input required className="field mt-2" value={form.name} onChange={e=>set("name",e.target.value)}/></label>
        <label className="text-sm">Category<select className="field mt-2" value={form.category} onChange={e=>set("category",e.target.value)}><option>Perfume</option><option>Jewelry</option></select></label>
        <label className="text-sm">Stock<input required min="0" type="number" className="field mt-2" value={form.stock} onChange={e=>set("stock",e.target.value)}/></label>
        <label className="text-sm">Selling Price<input required min="0" type="number" className="field mt-2" value={form.price} onChange={e=>set("price",e.target.value)}/></label>
        <label className="text-sm">Old Price<input min="0" type="number" className="field mt-2" value={form.oldPrice} onChange={e=>set("oldPrice",e.target.value)}/></label>
        <div className="sm:col-span-2 text-sm"><label>Product Image<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={upload} className="field mt-2"/></label><div className="mt-3 flex gap-3 items-center"><input required className="field" placeholder="Cloud image URL" value={form.image} onChange={e=>set("image",e.target.value)}/>{uploading&&<span className="text-xs text-[#C9A227]">Uploading…</span>}</div>{uploadError&&<span className="text-xs text-red-500 block mt-2">{uploadError}</span>}<span className="text-xs text-gray-400 block mt-2">Upload up to 5 MB. Images are stored in Cloudinary.</span></div>
        <label className="sm:col-span-2 text-sm">Description<textarea required rows="4" className="field mt-2 resize-none" value={form.description} onChange={e=>set("description",e.target.value)}/></label>
        <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={form.isNew} onChange={e=>set("isNew",e.target.checked)}/> Mark as new arrival</label>
      </div>
      <div className="flex gap-3 mt-7"><button className="gold-button flex-1">{product?"Save Changes":"Add Product"}</button><button type="button" onClick={onClose} className="px-6 rounded-xl border">Cancel</button></div>
    </form>
  </div></div>
}

export default function AdminDashboard(){
  const {products,orders,admin,deleteProduct,addProduct,updateProduct,updateOrderStatus,logoutAdmin}=useCatalog();
  const nav=useNavigate();
  const [tab,setTab]=useState("overview");
  const [query,setQuery]=useState("");
  const [modal,setModal]=useState(null);
  const [selectedOrder,setSelectedOrder]=useState(null);
  const safeOrders=orders||[];
  const sales=safeOrders.filter(o=>o.status!=="Cancelled").reduce((s,o)=>s+Number(o.total||0),0);
  const pending=safeOrders.filter(o=>["Pending","Confirmed"].includes(o.status||"Pending")).length;
  const delivered=safeOrders.filter(o=>o.status==="Delivered").length;
  const filtered=products.filter(p=>p.name.toLowerCase().includes(query.toLowerCase()));
  const logout=()=>{logoutAdmin();nav("/admin/login")};
  const saveProduct=form=>{
    if(modal?.product) updateProduct(modal.product.id,form); else addProduct(form);
    setModal(null);
  };
  if(!admin) { nav("/admin/login"); return null; }

  return <div className="min-h-screen bg-[#F7F5F1] text-[#171717]">
    <header className="sticky top-0 z-40 bg-[#111] text-white border-b border-white/10">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-xl sm:text-2xl font-semibold" style={{fontFamily:"Playfair Display"}}>MA <span className="text-[#C9A227]">ELEGANCE</span><span className="block text-[9px] tracking-[.35em] text-gray-400 font-sans">ADMIN CONSOLE</span></Link>
        <div className="flex items-center gap-3"><Link to="/" className="hidden sm:inline-flex px-4 py-2 rounded-xl border border-white/10 text-sm hover:border-[#C9A227]">View Store</Link><button onClick={logout} className="p-2 rounded-xl hover:bg-white/10" title="Logout"><LogOut size={19}/></button></div>
      </div>
    </header>
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 lg:grid lg:grid-cols-[240px_1fr] gap-7">
      <aside className="lg:sticky lg:top-28 lg:self-start bg-white rounded-3xl border p-3 h-fit mb-6 lg:mb-0">
        <div className="p-4 mb-2"><p className="text-xs text-gray-400">SIGNED IN AS</p><p className="font-semibold mt-1 truncate">{admin.email}</p></div>
        {[["overview",LayoutDashboard,"Overview"],["products",Package,"Products"],["orders",ShoppingBag,"Orders"]].map(([key,Icon,label])=><button key={key} onClick={()=>setTab(key)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left ${tab===key?"bg-[#111] text-white":"hover:bg-[#FAF8F4]"}`}><Icon size={18}/>{label}</button>)}
      </aside>
      <main>
        {tab==="overview"&&<><div className="mb-7"><p className="gold-label">COMMAND CENTER</p><h1 className="text-4xl sm:text-5xl mt-2">Good morning, Admin.</h1><p className="text-gray-500 mt-3">Your MA ELEGANCE store at a glance.</p></div>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4"><Stat icon={ShoppingBag} label="Total Orders" value={safeOrders.length} sub="All received orders"/><Stat icon={TrendingUp} label="Total Sales" value={money(sales)} sub="Excluding cancelled"/><Stat icon={Clock3} label="Pending Orders" value={pending} sub="Need attention"/><Stat icon={Package} label="Products" value={products.length} sub={`${delivered} delivered orders`}/></div>
          <section className="mt-7 grid xl:grid-cols-[1.4fr_1fr] gap-6">
            <div className="bg-white rounded-3xl border p-5"><div className="flex justify-between items-center"><h2 className="text-xl font-semibold">Recent Orders</h2><button onClick={()=>setTab("orders")} className="text-sm text-[#C9A227]">View all</button></div><div className="mt-5 space-y-3">{safeOrders.slice(0,5).map(o=><button onClick={()=>setSelectedOrder(o)} key={o.id} className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-[#FAF8F4] text-left"><div className="w-10 h-10 rounded-xl bg-[#111] text-[#C9A227] flex items-center justify-center"><ShoppingBag size={17}/></div><div className="flex-1 min-w-0"><p className="font-medium">#{o.id}</p><p className="text-xs text-gray-500 truncate">{o.customer?.name} · {new Date(o.date).toLocaleDateString()}</p></div><div className="text-right"><b className="text-sm">{money(o.total)}</b><span className="block text-xs text-[#C9A227]">{o.status||"Pending"}</span></div></button>)}{!safeOrders.length&&<p className="text-gray-500 py-10 text-center">No orders yet.</p>}</div></div>
            <div className="bg-[#111] text-white rounded-3xl p-6"><p className="gold-label">STORE HEALTH</p><h2 className="text-2xl mt-2">Inventory snapshot</h2><div className="mt-6 space-y-4">{products.slice(0,5).map(p=><div key={p.id}><div className="flex justify-between text-sm"><span>{p.name}</span><span>{p.stock} left</span></div><div className="h-1.5 bg-white/10 rounded-full mt-2"><div className="h-full bg-[#C9A227] rounded-full" style={{width:`${Math.min(100,p.stock*5)}%`}}/></div></div>)}</div></div>
          </section>
        </>}
        {tab==="products"&&<section><div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6"><div><p className="gold-label">CATALOG</p><h1 className="text-4xl mt-2">Products</h1></div><button onClick={()=>setModal({})} className="gold-button inline-flex items-center justify-center gap-2"><Plus size={18}/> Add Product</button></div><div className="bg-white rounded-3xl border p-4 mb-5"><div className="relative"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input className="field pl-10" placeholder="Search products..." value={query} onChange={e=>setQuery(e.target.value)}/></div></div><div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">{filtered.map(p=><div key={p.id} className="bg-white rounded-3xl border overflow-hidden"><div className="h-52 bg-[#FAF8F4]"><img src={p.image} className="w-full h-full object-cover" alt={p.name}/></div><div className="p-5"><div className="flex justify-between gap-3"><div><p className="text-xs text-[#C9A227]">{p.category}</p><h3 className="font-semibold text-lg mt-1">{p.name}</h3></div><span className={`text-xs px-2 py-1 h-fit rounded-full ${p.stock<5?"bg-red-50 text-red-600":"bg-green-50 text-green-600"}`}>{p.stock} stock</span></div><p className="font-semibold mt-4">{money(p.price)}</p><div className="flex gap-2 mt-5"><button onClick={()=>setModal({product:p})} className="flex-1 border rounded-xl py-2.5 inline-flex items-center justify-center gap-2"><Pencil size={15}/> Edit</button><button onClick={()=>{if(confirm(`Delete ${p.name}?`))deleteProduct(p.id)}} className="w-12 border rounded-xl text-red-500 inline-flex items-center justify-center"><Trash2 size={15}/></button></div></div></div>)}</div></section>}
        {tab==="orders"&&<section><div className="mb-6"><p className="gold-label">SALES CENTER</p><h1 className="text-4xl mt-2">Orders</h1><p className="text-gray-500 mt-2">{safeOrders.length} orders received · {money(sales)} sales</p></div><div className="bg-white rounded-3xl border overflow-x-auto"><table className="w-full min-w-[760px] text-sm"><thead className="bg-[#FAF8F4]"><tr><th className="text-left p-4">Order</th><th className="text-left p-4">Customer</th><th className="text-left p-4">Date</th><th className="text-left p-4">Total</th><th className="text-left p-4">Status</th><th className="text-left p-4">Action</th></tr></thead><tbody>{safeOrders.map(o=><tr key={o.id} className="border-t"><td className="p-4 font-semibold">#{o.id}</td><td className="p-4">{o.customer?.name}<span className="block text-xs text-gray-400">{o.customer?.phone}</span></td><td className="p-4">{new Date(o.date).toLocaleDateString()}</td><td className="p-4 font-semibold">{money(o.total)}</td><td className="p-4"><select className="border rounded-lg px-3 py-2" value={o.status||"Pending"} onChange={e=>updateOrderStatus(o.id,e.target.value)}>{statuses.map(s=><option key={s}>{s}</option>)}</select></td><td className="p-4"><button onClick={()=>setSelectedOrder(o)} className="p-2 rounded-lg hover:bg-[#FAF8F4]"><Eye size={17}/></button></td></tr>)}</tbody></table>{!safeOrders.length&&<p className="py-16 text-center text-gray-500">No orders received yet.</p>}</div></section>}
      </main>
    </div>
    {modal&&<ProductModal product={modal.product} onClose={()=>setModal(null)} onSave={saveProduct}/>}
    {selectedOrder&&<div className="fixed inset-0 z-[90] bg-black/60 p-4 overflow-y-auto"><div className="min-h-full flex items-center justify-center"><div className="w-full max-w-xl bg-white rounded-[2rem] p-6 sm:p-8"><div className="flex justify-between"><div><p className="gold-label">ORDER DETAILS</p><h2 className="text-3xl mt-2">#{selectedOrder.id}</h2></div><button onClick={()=>setSelectedOrder(null)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"><X size={18}/></button></div><div className="mt-6 p-5 rounded-2xl bg-[#FAF8F4]"><p className="font-semibold">{selectedOrder.customer?.name}</p><p className="text-sm text-gray-500">{selectedOrder.customer?.phone} · {selectedOrder.customer?.city}</p><p className="text-sm text-gray-500 mt-1">{selectedOrder.customer?.address}</p></div><div className="mt-6 space-y-3">{selectedOrder.items?.map(i=><div key={i.id} className="flex justify-between"><span>{i.name} × {i.quantity}</span><b>{money(i.price*i.quantity)}</b></div>)}</div><div className="border-t mt-5 pt-4 flex justify-between text-lg"><span>Total</span><b>{money(selectedOrder.total)}</b></div></div></div></div>}
  </div>
}
