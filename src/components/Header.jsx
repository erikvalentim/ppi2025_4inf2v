import { Link } from "react-router";
import styles from "./Header.module.css";
import { ShoppingBasket } from "lucide-react";

export function Header({ cart }) {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoIcon}>🛒</span>
        <span className={styles.logoText}>Mercado Livre</span>
      </Link>
      <div className={styles.cartInfo}>
        <Link to="/cart" className={styles.cartBtn}>
          <ShoppingBasket size={28} />
          <span className={styles.cartCount}>{cart.length}</span>
        </Link>
        <span className={styles.cartTotal}>
          Total: R$ {cart.reduce((total, product) => total + product.price, 0).toFixed(2)}
        </span>
      </div>
    </header>
  );
}
