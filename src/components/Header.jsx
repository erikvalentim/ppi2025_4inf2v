import styles from "./Header.module.css";
import { Link } from "react-router";
import { ShoppingBasket } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../service/CartContext";

export function Header() {
  const { cart } = useContext(CartContext);
  const totalQty = cart.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoIcon}>🛒</span>
        <span className={styles.logoText}>Mercado Livre</span>
      </Link>
      <div>
        <Link to="/cart" className={styles.cartBtn}>
          <ShoppingBasket size={28} />
          <span className={styles.cartCount}>{totalQty}</span>
        </Link>
        <p>
          Total $: {cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}
        </p>
      </div>
    </header>
  );
}
