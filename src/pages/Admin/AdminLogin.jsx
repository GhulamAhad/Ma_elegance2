import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, LockKeyhole, ArrowLeft } from "lucide-react";
import { useCatalog } from "../../context/CatalogContext";

export default function AdminLogin(){
  const {loginAdmin}=useCatalog();
  const nav=useNavigate();
  const [form,setForm]=useState({email:"",password:""});
  const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
  const submit=async e=>{ e.preventDefault(); setError(""); setBusy(true); try { await loginAdmin(form.email,form.password); nav("/admin"); } catch (err) { setError(err.message || "Invalid administrator credentials."); } finally { setBusy(false); } };
  return <main className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center p-5">
    <div className="w-full max-w-md">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#C9A227] mb-8"><ArrowLeft size={16}/> Back to store</Link>
      <div className="rounded-[2rem] bg-[#151515] border border-white/10 p-7 sm:p-10 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-[#C9A227] text-white flex items-center justify-center"><ShieldCheck size={28}/></div>
        <p className="gold-label mt-7">MA ELEGANCE</p>
        <h1 className="text-4xl mt-2">Admin Portal</h1>
        <p className="text-gray-400 mt-3">Secure access to products, orders and sales.</p>
        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block text-sm text-gray-300">Admin Email<input className="field mt-2 text-black" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
          <label className="block text-sm text-gray-300">Password<input className="field mt-2 text-black" type="password" autoFocus required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>
          {error&&<p className="text-red-400 text-sm">{error}</p>}
          <button className="gold-button w-full inline-flex items-center justify-center gap-2"><LockKeyhole size={17}/>{busy ? "Signing in…" : "Sign in securely"}</button>
        </form>
        <div className="mt-6 rounded-2xl bg-white/5 border border-white/10 p-4 text-xs text-gray-400">Use the administrator credentials configured on the server.</div>
      </div>
    </div>
  </main>
}
