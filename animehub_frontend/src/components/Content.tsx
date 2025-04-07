import "../component_css/Content.css";
import Card from "react-bootstrap/Card";

function Content() {
    return (
        <section id="content_section" className="content-container">
            <div className="d-flex flex-wrap justify-content-center gap-5">
                <Card className="card-fixed-height">
                    <Card.Img
                        variant="top"
                        className="card-img-fixed"
                        src="https://th.bing.com/th/id/OIP.Ge65eYRuibiKGqm4DW2N0QHaKp?rs=1&pid=ImgDetMain"
                    />
                    <Card.Body className="d-flex flex-column flex-grow-1">
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title.
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="card-fixed-height">
                    <Card.Img
                        variant="top"
                        className="card-img-fixed"
                        src="https://dwgkfo5b3odmw.cloudfront.net/manga/thumbs/thumb-35477-DemonSlayer_GN03_Web-3.jpg"
                    />
                    <Card.Body className="d-flex flex-column flex-grow-1">
                        <Card.Title>Another Card</Card.Title>
                        <Card.Text>
                            Another example text to showcase multiple cards.
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="card-fixed-height">
                    <Card.Img
                        variant="top"
                        className="card-img-fixed"
                        src="https://imaginaire.com/en/images/DEMON-SLAYER-KIMETSU-NO-YAIBA-FRENCH-V-01__9782809482317(1).JPG"
                    />
                    <Card.Body className="d-flex flex-column flex-grow-1">
                        <Card.Title>Another Card</Card.Title>
                        <Card.Text>
                            Another example text to showcase multiple cards.
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="card-fixed-height">
                    <Card.Img
                        variant="top"
                        className="card-img-fixed"
                        src="https://th.bing.com/th/id/OIP.KewTl38n6uNDfS3rhWP3EgAAAA?rs=1&pid=ImgDetMain"
                    />
                    <Card.Body className="d-flex flex-column flex-grow-1">
                        <Card.Title>Another Card</Card.Title>
                        <Card.Text>
                            Another example text to showcase multiple cards.
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="card-fixed-height">
                    <Card.Img
                        variant="top"
                        className="card-img-fixed"
                        src="https://th.bing.com/th/id/R.a6f848fb829a51edacfc48aae850fa8e?rik=jxlvoNLFy0mcbQ&pid=ImgRaw&r=0"
                    />
                    <Card.Body className="d-flex flex-column flex-grow-1">
                        <Card.Title>Another Card</Card.Title>
                        <Card.Text>
                            Another example text to showcase multiple cards.
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="card-fixed-height">
                    <Card.Img
                        variant="top"
                        className="card-img-fixed"
                        src="https://th.bing.com/th/id/OIP.6nkGQWybMoLOKzU9PgZnMgHaLH?w=730&h=1095&rs=1&pid=ImgDetMain"
                    />
                    <Card.Body className="d-flex flex-column flex-grow-1">
                        <Card.Title>Another Card</Card.Title>
                        <Card.Text>
                            Another example text to showcase multiple cards.
                        </Card.Text>
                    </Card.Body>
                </Card>

                {/* <Card className="card-fixed-height">
                    <Card.Img
                        variant="top"
                        className="card-img-fixed"
                        src="https://imgix.ranker.com/user_node_img/50093/1001848882/original/my-hero-academia-school-briefs-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500"
                    />
                    <Card.Body className="d-flex flex-column flex-grow-1">
                        <Card.Title>Another Card</Card.Title>
                        <Card.Text>
                            Another example text to showcase multiple cards.
                        </Card.Text>
                    </Card.Body>
                </Card> */}
            </div>
        </section>
    );
}

export default Content;
