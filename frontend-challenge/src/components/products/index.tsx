import React, { useState, useEffect } from 'react';
import styles from "./styles.module.scss"
import bag from "../../assets/BAG.svg"
interface Product {
    id: number;
    name: string;
    brand: string;
    description: string;
    price: number;
    photo: string; // Adicionando a propriedade 'photo' à interface Product
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=10&sortBy=id&orderBy=DESC');
                if (!response.ok) {
                    throw new Error('Erro ao carregar os produtos');
                }
                const data = await response.json();
                console.log(data); // Verifique os dados recebidos da API

                const { products: productsData } = data;

                if (!Array.isArray(productsData)) {
                    throw new Error('Os dados recebidos não estão no formato esperado');
                }

                const formattedProducts: Product[] = productsData.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    brand: item.brand,
                    description: item.description,
                    price: parseFloat(item.price),
                    photo: item.photo // Adicionando a propriedade 'photo' ao produto
                }));
                console.log(formattedProducts); // Verifique os dados ajustados

                setProducts(formattedProducts);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
                setError('Erro ao carregar os produtos. Por favor, tente novamente mais tarde.');
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <ul className={styles.products}>
                {products.map((product: Product) => (

                    <li className={styles.product} key={product.id}>

                        <img src={product.photo} alt={product.name} style={{ maxWidth: '177px', maxHeight: '177px' }} />
                       <div className={styles.priceandname}>
                           <h2 className={styles.h1}>{product.name}</h2>
                           <p className={styles.price}> R$ {product.price}</p>
                       </div>
                        <p className={styles.description}>Descrição: {product.description}</p>
                        <button className={styles.button}><img src={bag}/>COMPRAR</button>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default ProductList;
