import Carousel from "react-bootstrap/Carousel";
import "./index.css";
import pic from "./../../images/carousel/pexels-quang-nguyen-vinh-2161449.jpg";
import picTwo from "./../../images/carousel/eg.jpeg";
import picThree from "./../../images/carousel/pexels-arefin-shamsul-879478.jpg";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Slider(props) {
  const navigate = useNavigate();
  return (
    <Carousel className="w-100 position-relative">
      <Carousel.Item>
        <div className="over-lay"></div>
        <img className="d-block w-100" src={picTwo} alt="Second slide" />
        <Carousel.Caption>
          <h1>
            Choose<p>The Best Tour Package</p>
          </h1>
          <h3>Egypt ,Giza</h3>
          <p>Pyramids</p>
          <Button
            onClick={() => {
              navigate("/packages");
            }}
          >
            Book Now
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="over-lay"></div>
        <img className="d-block w-100" src={pic} alt="First slide" />
        <Carousel.Caption>
          <h1>
            Travel<p>to the Beutiful places</p>
          </h1>
          <h3>Italy</h3>
          <Button
            onClick={() => {
              navigate("/packages");
            }}
          >
            Book Now
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="over-lay"></div>
        <img className="d-block w-100" src={picThree} alt="Third slide" />
        <Carousel.Caption>
          <h1>
            Turkey ,<br />
            Istanbul
          </h1>
          <Button
            onClick={() => {
              navigate("/packages");
            }}
          >
            Book Now
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
