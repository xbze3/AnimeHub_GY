import "../component_css/LoginForm.css";
import { ChangeEvent, FormEvent, useState } from "react";
import logo from "../assets/anime_hub_1.png";

function SignUpForm() {
    const [details, setDetails] = useState({
        username: "",
        email: "",
        password: "",
        address: "",
        phone_number: "",
    });
    const [error, setError] = useState<string | null>(null);

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(details),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);
                localStorage.setItem("ID", data.user_id);
                console.log(data);
                window.location.replace("http://localhost:5173/");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Sign Up failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    function forwardLogin() {
        window.location.replace("http://localhost:5173/login");
    }

    return (
        <div id="login_body" className="signup-wrapper">
            <div>
                <img src={logo} alt="" id="loginLogo" />
            </div>
            <div className="login_container">
                <div className="login_header">
                    <div className="text">Sign Up</div>
                    <div className="underline"></div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form className="inputs" onSubmit={handleSubmit}>
                    <div className="input">
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={details.username}
                            onChange={handleCheck}
                            required
                        />
                    </div>

                    <div className="input">
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={details.email}
                            onChange={handleCheck}
                            required
                        />
                    </div>

                    <div className="input">
                        <input
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={details.password}
                            onChange={handleCheck}
                            required
                        />
                    </div>

                    <div className="input">
                        <input
                            placeholder="Address"
                            type="text"
                            name="address"
                            value={details.address}
                            onChange={handleCheck}
                            required
                        />
                    </div>

                    <div className="input">
                        <input
                            placeholder="Phone Number"
                            type="tel"
                            name="phone_number"
                            value={details.phone_number}
                            onChange={handleCheck}
                            required
                        />
                    </div>

                    <div className="submit-container">
                        <button type="submit" className="submit">
                            Sign Up
                        </button>
                    </div>
                    <div id="signup-LoginAccount">
                        <p>Alredy have an account?</p>{" "}
                        <p id="signup-Login" onClick={forwardLogin}>
                            Login
                        </p>{" "}
                        <p>instead</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUpForm;
