import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCatalog } from "../../context/CatalogContext";
import ShopHero from "../../components/shop/ShopHero";
import ProductGrid from "../../components/shop/ProductGrid";
import Container from "../../components/common/Container";

function Shop(){
  const [params]=useSearchParams();
  const {products}=useCatalog();
  const [category,setCategory]=useState(params.get("category")||"All");
  const [search,setSearch]=useState("");
  const [sort,setSort]=useState("Featured");

  const filtered=useMemo(()=>{
    let d=products.filter(p=>(category==="All"||p.category===category)&&p.name.toLowerCase().includes(search.toLowerCase()));
    if(sort==="Price Low") d.sort((a,b)=>a.price-b.price);
    if(sort==="Price High") d.sort((a,b)=>b.price-a.price);
    if(sort==="Rating") d.sort((a,b)=>b.rating-a.rating);
    if(sort==="Newest") d.sort((a,b)=>Number(b.isNew)-Number(a.isNew));
    return d;
  },[products,category,search,sort]);

  return <><ShopHero/><section className="py-10 sm:py-16 bg-[#FAFAFA]">
    <Container>
      <div className="border-b pb-6 sm:pb-8">
        <p className="gold-label">THE SHOP</p>
        <div className="mt-2 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-semibold">Luxury, Curated For You</h1>
          <p className="text-sm text-gray-500">{filtered.length} products</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
        <div className="relative">
          <input className="field pr-10" placeholder="Search perfumes or jewelry..." value={search} onChange={e=>setSearch(e.target.value)}/>
          {search && <button type="button" aria-label="Clear search" onClick={()=>setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">×</button>}
        </div>
        <select className="field sm:w-48" value={sort} onChange={e=>setSort(e.target.value)}>
          <option>Featured</option><option>Newest</option><option>Price Low</option><option>Price High</option><option>Rating</option>
        </select>
      </div>
      <div className="mt-5 -mx-1 overflow-x-auto pb-1">
        <div className="flex min-w-max gap-2 px-1">
          {["All","Perfume","Jewelry"].map(c=><button key={c} onClick={()=>setCategory(c)} className={`px-4 sm:px-5 py-2 rounded-full border text-sm whitespace-nowrap ${category===c?"bg-[#111] text-white":"bg-white hover:border-[#C9A227]"}`}>{c}</button>)}
        </div>
      </div>
      <div className="mt-7"><ProductGrid products={filtered}/></div>
      {!filtered.length&&<div className="text-center py-20"><h2 className="text-2xl">No products found</h2><button className="gold-button mt-5" onClick={()=>{setSearch("");setCategory("All")}}>Clear Search</button></div>}
    </Container>
  </section></>;
}
export default Shop;
