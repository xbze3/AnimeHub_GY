import { useEffect, useState } from "react";
import "../component_css/Content.css";
import Card from "react-bootstrap/Card";

interface Product {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
}

function Content() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/products", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                }
            } catch (err) {}
        };

        fetchProducts();
    }, []);

    return (
        <section id="content_section" className="content-container">
            <div className="d-flex flex-wrap justify-content-center gap-5">
                {products.map((product) => (
                    <Card key={product._id} className="card-fixed-height">
                        <Card.Img
                            variant="top"
                            className="card-img-fixed"
                            src={
                                product.image ||
                                "https://via.placeholder.com/150"
                            }
                        />
                        <Card.Body className="d-flex flex-column flex-grow-1">
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>
                                {product.description ||
                                    "No description available"}
                            </Card.Text>
                            <div className="mt-auto">
                                <strong>
                                    Price: ${product.price.toFixed(2)}
                                </strong>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </section>
    );
}

export default Content;
