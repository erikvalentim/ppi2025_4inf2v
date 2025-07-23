import styles from "./Cart.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";

const garantiaOptions = [
  { label: "Sem garantia extra", value: 0 },
  { label: "Garantia 12 meses (+R$ 49,90)", value: 49.9 },
  { label: "Garantia 24 meses (+R$ 89,90)", value: 89.9 },
];

export function Cart({ cart, setCart }) {
  const [quantidades, setQuantidades] = useState(cart.map(() => 1));
  const [garantia, setGarantia] = useState(0);
  const navigate = useNavigate();

  // Funções para alterar quantidade
  const handleAdd = (idx) => {
    setQuantidades(q =>
      q.map((v, i) => i === idx ? v + 1 : v)
    );
  };
  const handleRemove = (idx) => {
    setQuantidades(q =>
      q.map((v, i) => i === idx ? Math.max(1, v - 1) : v)
    );
  };

  // Remover tudo do carrinho
  const handleClearCart = () => {
    setCart([]);
  };

  // Cálculos de valores
  const totalProdutos = cart.reduce(
    (acc, prod, idx) => acc + prod.price * quantidades[idx], 0
  );
  const total = totalProdutos + garantia;
  const totalPix = total * 0.9;
  const parcela = total / 10;

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartLeft}>
        <h2>Carrinho de Compras</h2>
        <div className={styles.cartActions}>
          <button className={styles.voltarBtn} onClick={() => navigate("/")}>
            Voltar para a loja
          </button>
          <button className={styles.removerTudoBtn} onClick={handleClearCart}>
            Remover tudo
          </button>
        </div>
        {cart.length === 0 ? (
          <p className={styles.empty}>Seu carrinho está vazio.</p>
        ) : (
          <ul className={styles.productList}>
            {cart.map((product, index) => (
              <li key={index} className={styles.productItem}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className={styles.productImg}
                />
                <div className={styles.productInfo}>
                  <h3>{product.title}</h3>
                  <p className={styles.price}>
                    R$ {product.price.toFixed(2)}
                  </p>
                  <div className={styles.qtdBox}>
                    <button
                      className={styles.qtdBtn}
                      onClick={() => handleRemove(index)}
                      type="button"
                    >−</button>
                    <span className={styles.qtdNum}>{quantidades[index]}</span>
                    <button
                      className={styles.qtdBtn}
                      onClick={() => handleAdd(index)}
                      type="button"
                    >+</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.garantiaSection}>
          <h4>Opções de Garantia</h4>
          {garantiaOptions.map((opt) => (
            <label key={opt.value} className={styles.garantiaOption}>
              <input
                type="radio"
                name="garantia"
                value={opt.value}
                checked={garantia === opt.value}
                onChange={() => setGarantia(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
      <div className={styles.cartRight}>
        <div className={styles.resumoBox}>
          <h3>Resumo da Compra</h3>
          <div className={styles.resumoLinha}>
            <span>Total:</span>
            <span className={styles.resumoPreco}>
              R$ {total.toFixed(2)}
            </span>
          </div>
          <div className={styles.resumoLinha}>
            <span>
              <span className={styles.pixLabel}>PIX</span> (10% off):
            </span>
            <span className={styles.pixPreco}>
              R$ {totalPix.toFixed(2)}
            </span>
          </div>
          <div className={styles.resumoLinha}>
            <span>Parcelamento:</span>
            <span className={styles.parcelaPreco}>
              10x de R$ {parcela.toFixed(2)} sem juros
            </span>
          </div>
          <button className={styles.continuarBtn}>Continuar</button>
        </div>
      </div>
    </div>
  );
}
