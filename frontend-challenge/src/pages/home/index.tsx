import {Header} from "../../components/header";
import styles from "./styles.module.scss"
import ProductList from "../../components/products";

export const Home = () =>{
    return(
        <main className={styles.main} >
            <Header/>
            <ProductList/>
        </main>
    )
}