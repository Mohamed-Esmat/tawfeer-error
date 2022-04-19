import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`); //AJAX Request to backend
    if (data.countInStock < quantity) {
      toast.error('Sorry. Product is out of stock');
      // window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  return (
    <div className="wrapper">
      <Card className="card">
        <Card.Body>
          <Link to={`/product/${product.slug}`}>
            <div width="70">
              <img
                src={product.image}
                className="card-img-top card-img"
                alt={product.name}
              />
            </div>
          </Link>

          <Link to={`/product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Text>${product.price}</Card.Text>
          {product.countInStock === 0 ? (
            <Button variant="light" disabled>
              Out of stock
            </Button>
          ) : (
            <Button
              onClick={() => addToCartHandler(product)}
              className="btn-yellow"
            >
              Add to cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
export default Product;
