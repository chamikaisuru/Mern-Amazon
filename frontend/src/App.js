import './App.css';
import data from './data';

function App() {
  return (
    <div>
      <header>
        <a href="/">Link</a>
      </header>
      <main>
        <h1>Product List</h1>
        <div className="Products">
          {data.products.map((product) => (
            <div className="Product" key={product.slug}>
              <a href={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </a>
              <div className="Product-info">
                <a href={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </a>
                <p>
                  <strong>${product.price}</strong>
                </p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
