import cart from "../../assets/CART.svg"
import logo from "../../assets/logo.svg"
import styles from "./styles.module.scss"
export const Header = () =>{

    return(
        <main className={styles.main}>
        <img className={styles.img} src={logo}/>
        <button className={styles.cart}><img src={cart}/>0</button>
        </main>
    )
}