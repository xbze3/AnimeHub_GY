import { useEffect, useState } from "react";
import "../component_css/Content.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

interface Product {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
}

function Content() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

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
            } catch (err) {
                console.error("Failed to fetch products:", err);
            }
        };

        fetchProducts();
    }, []);

    const toggleSelect = (id: string) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        );
    };

    const handleCheckout = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("ID");

        if (!token) {
            Swal.fire("Not logged in", "Please log in first.", "warning");
            return;
        }

        const result = await Swal.fire({
            title: "Confirm Checkout",
            text: `You are about to purchase ${selected.length} item(s). Continue?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Checkout",
        });

        if (!result.isConfirmed) return;

        try {
            const response = await fetch("http://localhost:5000/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user_id: userId,
                    product_ids: selected,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire(
                    "Success",
                    data.message || "Order placed!",
                    "success"
                );
                setSelected([]);
            } else {
                Swal.fire("Error", data.error || "Order failed", "error");
            }
        } catch (err) {
            console.error("Checkout error:", err);
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    return (
        <section id="content_section" className="content-container">
            <div className="d-flex justify-content-end pe-5 mb-3">
                {selected.length > 0 && (
                    <Button
                        variant="success"
                        onClick={handleCheckout}
                        id="checkout-button"
                    >
                        Checkout ({selected.length})
                    </Button>
                )}
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-5">
                {products.map((product) => (
                    <Card
                        key={product._id}
                        className={`card-fixed-height ${
                            selected.includes(product._id)
                                ? "selected-card"
                                : ""
                        }`}
                        onClick={() => toggleSelect(product._id)}
                        style={{
                            cursor: "pointer",
                            border: selected.includes(product._id)
                                ? "2px solid #28a745"
                                : "",
                        }}
                    >
                        <Card.Img
                            variant="top"
                            className="card-img-fixed"
                            src={product.image}
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
