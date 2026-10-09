import os
import re
import secrets
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Optional

import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, Field
from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, Text, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, relationship, sessionmaker

BASE = Path(__file__).resolve().parent
load_dotenv(BASE / ".env")

DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{BASE / 'ma_elegance.db'}")
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, pool_pre_ping=True, connect_args=connect_args)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

JWT_SECRET = os.getenv("JWT_SECRET")
if not JWT_SECRET:
    JWT_SECRET = secrets.token_urlsafe(48)
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_MINUTES = int(os.getenv("ACCESS_TOKEN_MINUTES", "30"))

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@maelegance.pk").strip().lower()
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
if not ADMIN_PASSWORD and not os.getenv("ALLOW_INSECURE_DEV_DEFAULTS"):
    ADMIN_PASSWORD = None

CORS_ORIGINS = [x.strip().rstrip("/") for x in os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",") if x.strip()]
CORS_DEV_REGEX = r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$"

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True,
)

app = FastAPI(title="MA ELEGANCE API", version="2.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_origin_regex=CORS_DEV_REGEX,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    max_age=86400,
)

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
bearer = HTTPBearer(auto_error=False)


class Base(DeclarativeBase):
    pass


class AdminUser(Base):
    __tablename__ = "admin_users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(500))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))


class Product(Base):
    __tablename__ = "products"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(180))
    slug: Mapped[str] = mapped_column(String(220), unique=True, index=True)
    category: Mapped[str] = mapped_column(String(50), index=True)
    brand: Mapped[str] = mapped_column(String(100), default="MA ELEGANCE")
    price: Mapped[float] = mapped_column(Float)
    old_price: Mapped[float] = mapped_column(Float, default=0)
    discount: Mapped[float] = mapped_column(Float, default=0)
    rating: Mapped[float] = mapped_column(Float, default=5)
    reviews: Mapped[int] = mapped_column(Integer, default=0)
    stock: Mapped[int] = mapped_column(Integer, default=0)
    image: Mapped[str] = mapped_column(Text)
    description: Mapped[str] = mapped_column(Text, default="")
    is_new: Mapped[bool] = mapped_column(Boolean, default=False)
    badge: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))


class Order(Base):
    __tablename__ = "orders"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    reference: Mapped[str] = mapped_column(String(40), unique=True, index=True)
    customer_name: Mapped[str] = mapped_column(String(150))
    phone: Mapped[str] = mapped_column(String(30))
    city: Mapped[str] = mapped_column(String(100))
    address: Mapped[str] = mapped_column(Text)
    notes: Mapped[str] = mapped_column(Text, default="")
    subtotal: Mapped[float] = mapped_column(Float)
    delivery: Mapped[float] = mapped_column(Float)
    total: Mapped[float] = mapped_column(Float)
    status: Mapped[str] = mapped_column(String(30), default="Pending", index=True)
    payment_method: Mapped[str] = mapped_column(String(30), default="COD")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))
    items: Mapped[list["OrderItem"]] = relationship(back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id"))
    product_id: Mapped[int] = mapped_column(Integer)
    name: Mapped[str] = mapped_column(String(180))
    image: Mapped[str] = mapped_column(Text)
    price: Mapped[float] = mapped_column(Float)
    quantity: Mapped[int] = mapped_column(Integer)
    order: Mapped[Order] = relationship(back_populates="items")


Base.metadata.create_all(engine)


def db():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


def ensure_admin(session: Session):
    if not ADMIN_PASSWORD:
        return
    existing = session.query(AdminUser).filter(AdminUser.email == ADMIN_EMAIL).first()
    if not existing:
        session.add(AdminUser(email=ADMIN_EMAIL, password_hash=pwd_context.hash(ADMIN_PASSWORD), is_active=True))
        session.commit()


with SessionLocal() as startup_db:
    ensure_admin(startup_db)


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def public_product(p: Product):
    return {
        "id": p.id, "name": p.name, "slug": p.slug, "category": p.category, "brand": p.brand,
        "price": p.price, "oldPrice": p.old_price, "discount": p.discount, "rating": p.rating,
        "reviews": p.reviews, "stock": p.stock, "image": p.image, "description": p.description,
        "isNew": p.is_new, "badge": p.badge,
    }


def make_access_token(admin: AdminUser) -> str:
    now = datetime.now(timezone.utc)
    payload = {"sub": str(admin.id), "email": admin.email, "iat": int(now.timestamp()), "exp": now + timedelta(minutes=ACCESS_TOKEN_MINUTES)}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def auth(credentials: HTTPAuthorizationCredentials = Depends(bearer), session: Session = Depends(db)):
    if not credentials or credentials.scheme.lower() != "bearer":
        raise HTTPException(401, "Authentication required")
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        admin_id = int(payload["sub"])
    except (JWTError, KeyError, ValueError):
        raise HTTPException(401, "Invalid or expired admin token")
    admin = session.get(AdminUser, admin_id)
    if not admin or not admin.is_active:
        raise HTTPException(401, "Admin account is inactive")
    return admin


class LoginIn(BaseModel):
    email: str
    password: str


class ProductIn(BaseModel):
    name: str
    category: str
    price: float = Field(ge=0)
    oldPrice: float = Field(default=0, ge=0)
    stock: int = Field(ge=0)
    image: str
    description: str = ""
    brand: str = "MA ELEGANCE"
    discount: float = Field(default=0, ge=0)
    rating: float = Field(default=5, ge=0, le=5)
    reviews: int = Field(default=0, ge=0)
    isNew: bool = False
    badge: Optional[str] = None
    slug: Optional[str] = None


class OrderItemIn(BaseModel):
    productId: int
    quantity: int = Field(gt=0)


class OrderIn(BaseModel):
    customer: dict
    items: list[OrderItemIn]
    notes: str = ""
    paymentMethod: str = "COD"


class StatusIn(BaseModel):
    status: str


@app.get("/api/health")
def health():
    return {"ok": True, "service": "MA ELEGANCE API", "database": "postgresql" if DATABASE_URL.startswith("postgres") else "sqlite"}


@app.post("/api/auth/login")
def login(data: LoginIn, session: Session = Depends(db)):
    admin = session.query(AdminUser).filter(AdminUser.email == data.email.strip().lower()).first()
    if not admin or not admin.is_active or not pwd_context.verify(data.password, admin.password_hash):
        raise HTTPException(401, "Invalid administrator credentials")
    return {"access_token": make_access_token(admin), "expires_in": ACCESS_TOKEN_MINUTES * 60, "admin": {"id": admin.id, "email": admin.email, "name": "MA ELEGANCE Admin"}}


@app.get("/api/products")
def products(session: Session = Depends(db)):
    return [public_product(p) for p in session.query(Product).order_by(Product.created_at.desc()).all()]


@app.post("/api/products", dependencies=[Depends(auth)])
def create_product(data: ProductIn, session: Session = Depends(db)):
    slug = slugify(data.slug or data.name)
    if session.query(Product).filter(Product.slug == slug).first():
        slug += "-" + secrets.token_hex(3)
    product = Product(name=data.name, slug=slug, category=data.category, brand=data.brand, price=data.price,
                      old_price=data.oldPrice, discount=data.discount, rating=data.rating, reviews=data.reviews,
                      stock=data.stock, image=data.image, description=data.description, is_new=data.isNew, badge=data.badge)
    session.add(product); session.commit(); session.refresh(product)
    return public_product(product)


@app.put("/api/products/{product_id}", dependencies=[Depends(auth)])
def update_product(product_id: int, data: ProductIn, session: Session = Depends(db)):
    product = session.get(Product, product_id)
    if not product: raise HTTPException(404, "Product not found")
    for attr, value in [("name", data.name), ("category", data.category), ("price", data.price), ("old_price", data.oldPrice),
                        ("stock", data.stock), ("image", data.image), ("description", data.description), ("brand", data.brand),
                        ("discount", data.discount), ("rating", data.rating), ("reviews", data.reviews), ("is_new", data.isNew), ("badge", data.badge)]:
        setattr(product, attr, value)
    session.commit(); session.refresh(product)
    return public_product(product)


@app.delete("/api/products/{product_id}", dependencies=[Depends(auth)])
def delete_product(product_id: int, session: Session = Depends(db)):
    product = session.get(Product, product_id)
    if not product: raise HTTPException(404, "Product not found")
    session.delete(product); session.commit()
    return {"ok": True}


@app.post("/api/admin/upload-image", dependencies=[Depends(auth)])
async def upload_image(file: UploadFile = File(...)):
    if not os.getenv("CLOUDINARY_CLOUD_NAME") or not os.getenv("CLOUDINARY_API_KEY") or not os.getenv("CLOUDINARY_API_SECRET"):
        raise HTTPException(503, "Cloud image storage is not configured")
    if file.content_type not in {"image/jpeg", "image/png", "image/webp", "image/avif"}:
        raise HTTPException(400, "Only JPG, PNG, WEBP or AVIF images are allowed")
    content = await file.read()
    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(400, "Image must be 5 MB or smaller")
    try:
        result = cloudinary.uploader.upload(content, folder="ma-elegance/products", resource_type="image", overwrite=False)
        return {"url": result["secure_url"], "public_id": result["public_id"]}
    except Exception:
        raise HTTPException(502, "Image upload failed")


@app.get("/api/orders", dependencies=[Depends(auth)])
def orders(session: Session = Depends(db)):
    out = []
    for order in session.query(Order).order_by(Order.created_at.desc()).all():
        out.append({"id": order.reference, "customer": {"name": order.customer_name, "phone": order.phone, "city": order.city, "address": order.address, "notes": order.notes},
                    "items": [{"id": i.product_id, "name": i.name, "image": i.image, "price": i.price, "quantity": i.quantity} for i in order.items],
                    "subtotal": order.subtotal, "delivery": order.delivery, "total": order.total, "status": order.status, "date": order.created_at.isoformat()})
    return out


@app.post("/api/orders")
def create_order(data: OrderIn, session: Session = Depends(db)):
    if not data.items: raise HTTPException(400, "Cart is empty")
    if data.paymentMethod != "COD": raise HTTPException(400, "Only Cash on Delivery is enabled")
    subtotal = 0; rows = []
    for item in data.items:
        product = session.get(Product, item.productId)
        if not product: raise HTTPException(404, f"Product {item.productId} not found")
        if product.stock < item.quantity: raise HTTPException(400, f"Insufficient stock for {product.name}")
        subtotal += product.price * item.quantity; rows.append((product, item.quantity))
    customer = data.customer
    delivery = 0 if subtotal >= 5000 else 250
    reference = "MA" + secrets.token_hex(4).upper()
    order = Order(reference=reference, customer_name=customer.get("name", ""), phone=customer.get("phone", ""), city=customer.get("city", ""),
                  address=customer.get("address", ""), notes=data.notes or customer.get("notes", ""), subtotal=subtotal, delivery=delivery,
                  total=subtotal + delivery, status="Pending", payment_method="COD")
    session.add(order)
    for product, quantity in rows:
        product.stock -= quantity
        order.items.append(OrderItem(product_id=product.id, name=product.name, image=product.image, price=product.price, quantity=quantity))
    session.commit(); session.refresh(order)
    return {"id": reference, "status": order.status, "total": order.total}


@app.patch("/api/orders/{reference}/status", dependencies=[Depends(auth)])
def status(reference: str, data: StatusIn, session: Session = Depends(db)):
    allowed = {"Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"}
    if data.status not in allowed: raise HTTPException(400, "Invalid order status")
    order = session.query(Order).filter(Order.reference == reference).first()
    if not order: raise HTTPException(404, "Order not found")
    if order.status != "Cancelled" and data.status == "Cancelled":
        for item in order.items:
            product = session.get(Product, item.product_id)
            if product: product.stock += item.quantity
    elif order.status == "Cancelled" and data.status != "Cancelled":
        for item in order.items:
            product = session.get(Product, item.product_id)
            if product and product.stock >= item.quantity: product.stock -= item.quantity
            elif product: raise HTTPException(400, f"Not enough stock to restore order {reference}")
    order.status = data.status; session.commit()
    return {"ok": True, "status": order.status}


@app.get("/api/dashboard", dependencies=[Depends(auth)])
def dashboard(session: Session = Depends(db)):
    all_orders = session.query(Order).all(); products_count = session.query(Product).count()
    active = [o for o in all_orders if o.status != "Cancelled"]
    return {"orders": len(all_orders), "sales": sum(o.total for o in active), "pending": sum(o.status in {"Pending", "Confirmed"} for o in all_orders),
            "delivered": sum(o.status == "Delivered" for o in all_orders), "products": products_count}
