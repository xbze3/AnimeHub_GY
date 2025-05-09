import "../component_css/LoginForm.css";
import { ChangeEvent, FormEvent, useState } from "react";
import logo from "../assets/anime_hub_1.png";

function LoginForm() {
    const [details, setDetails] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(details),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);
                localStorage.setItem("ID", data.user_id);
                console.log(data);
                window.location.replace("http://localhost:5173/");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Login failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    function forwardSignUp() {
        window.location.replace("http://localhost:5173/signup");
    }

    return (
        <div id="login_body">
            <div>
                <img src={logo} alt="" id="loginLogo" />
            </div>
            <div className="login_container">
                <div className="login_header">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form className="inputs" onSubmit={handleSubmit}>
                    <div className="input">
                        <input
                            type="email"
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
                    <div className="submit-container">
                        <button type="submit" className="submit">
                            Login
                        </button>
                    </div>
                    <div id="login-CreateAccount">
                        <p>Don't have an account?</p>{" "}
                        <p id="login-SignUp" onClick={forwardSignUp}>
                            Sign-Up
                        </p>{" "}
                        <p>instead</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
