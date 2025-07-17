import styles from "./Header.module.css";

export function Header({ cart }) {
  return (
    <header className={styles.header}>
      <h1>TRJ Megastore</h1>
      <div>
        {cart.length > 0 && <p>{cart.length} products</p>}
        <p>
          Total $: {cart.reduce((total, product) => total + product.price, 0).toFixed(2)}
        </p>
      </div>
    </header>
  );
}
