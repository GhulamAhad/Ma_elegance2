from app import SessionLocal, Product
s=SessionLocal()
if s.query(Product).count()==0:
    s.add_all([
      Product(name='Royal Oud Perfume',slug='royal-oud-perfume',category='Perfume',brand='MA ELEGANCE',price=4999,old_price=5999,discount=17,rating=5,reviews=128,stock=20,image='/products/perfume1.jpg',description='A warm, luxurious oud fragrance designed for confident evenings and unforgettable occasions.',badge='Best Seller'),
      Product(name='Signature Perfume',slug='signature-perfume',category='Perfume',brand='MA ELEGANCE',price=3999,old_price=4999,discount=20,rating=5,reviews=110,stock=30,image='/products/perfume2.jpg',description='A refined everyday fragrance with a sophisticated long-lasting character.',is_new=True,badge='New'),
      Product(name='Golden Bloom Necklace',slug='golden-bloom-necklace',category='Jewelry',brand='MA ELEGANCE',price=3499,old_price=4299,discount=19,rating=4.8,reviews=74,stock=12,image='/products/jewelry1.jpg',description='A delicate statement necklace made to add a polished touch to any look.',is_new=True,badge='New'),
      Product(name='Pearl Elegance Set',slug='pearl-elegance-set',category='Jewelry',brand='MA ELEGANCE',price=4499,old_price=5499,discount=18,rating=5,reviews=89,stock=9,image='/products/jewelry2.jpg',description='An elegant pearl-inspired set for graceful everyday styling and special occasions.',badge='Best Seller')
    ])
    s.commit()
s.close()
