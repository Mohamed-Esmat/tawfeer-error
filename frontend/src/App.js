// import data from './data';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/esm/Badge';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import Button from 'react-bootstrap/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import MapScreen from './screens/MapScreen';
import Footer from './components/Footer';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store); //get context (by  using the dispatch we will have access to the state of context and change the context)
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <div className="page-container">
        <div
          className={
            sidebarIsOpen
              ? fullBox
                ? 'site-container active-cont d-flex flex-column full-box'
                : 'site-container active-cont d-flex flex-column'
              : fullBox
              ? 'site-container d-flex flex-column full-box'
              : 'site-container d-flex flex-column'
          }
        >
          <div className="content-wrap">
            <ToastContainer position="bottom-center" limit={1} />
            <header>
              <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                  <Button
                    variant="dark"
                    onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                  >
                    <i className="fas fa-bars"></i>
                  </Button>

                  <LinkContainer to="/">
                    <Navbar.Brand>Tawfeer</Navbar.Brand>
                  </LinkContainer>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBox />
                    <Nav className="me-auto  w-100  justify-content-end">
                      <Link to="/cart" className="nav-link">
                        Cart
                        {cart.cartItems.length > 0 && (
                          <Badge pill bg="danger">
                            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                          </Badge>
                        )}
                      </Link>
                      {userInfo ? (
                        <NavDropdown
                          title={userInfo.name}
                          id="basic-nav-dropdown"
                        >
                          <LinkContainer to="/profile">
                            <NavDropdown.Item>User Profile</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/orderhistory">
                            <NavDropdown.Item>Order History</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Divider />
                          <Link
                            className="dropdown-item"
                            to="#signout"
                            onClick={signoutHandler}
                          >
                            Sign Out
                          </Link>
                        </NavDropdown>
                      ) : (
                        <Link className="nav-link" to="/signin">
                          Sign In
                        </Link>
                      )}
                      {userInfo && userInfo.isAdmin && (
                        <NavDropdown title="Admin" id="admin-nav-dropdown">
                          <LinkContainer to="/admin/dashboard">
                            <NavDropdown.Item>Dashboard</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/admin/products">
                            <NavDropdown.Item>Products</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/admin/orders">
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/admin/users">
                            <NavDropdown.Item>Users</NavDropdown.Item>
                          </LinkContainer>
                        </NavDropdown>
                      )}
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </header>
            <div
              className={
                sidebarIsOpen
                  ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
                  : 'side-navbar d-flex justify-content-between flex-wrap flex-column position-absolute top-0'
              }
            >
              <Nav className="flex-column text-white w-100 p-2">
                <div className='d-flex justify-content-between align-items-center'>
                <Nav.Item >
                  <strong >Categories</strong>
                </Nav.Item>
                <Nav.Item>
                <Button
                    variant="dark"
                    onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                  >
                    <i className="fas fa-bars"></i>
                  </Button>
                </Nav.Item>
                </div>
                {categories.map((category) => (
                  <Nav.Item key={category}>
                    <LinkContainer
                      to={`/search?category=${category}`}
                      onClick={() => setSidebarIsOpen(false)}
                    >
                      <Nav.Link>{category}</Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                ))}
              </Nav>
            </div>
            <main>
              <Container className="mt-4 mb-4">
                <Routes>
                  <Route path="/product/:slug" element={<ProductScreen />} />
                  <Route path="/cart" element={<CartScreen />} />
                  <Route path="/search" element={<SearchScreen />} />
                  <Route path="/signin" element={<SigninScreen />} />
                  <Route path="/signup" element={<SignupScreen />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfileScreen />
                      </ProtectedRoute>
                    }
                  />
                   <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <MapScreen />
                  </ProtectedRoute>
                }
              />
                  <Route path="/placeorder" element={<PlaceOrderScreen />} />
                  <Route
                    path="/order/:id"
                    element={
                      <ProtectedRoute>
                        <OrderScreen />
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route
                    path="/orderhistory"
                    element={
                      <ProtectedRoute>
                        <OrderHistoryScreen />
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route path="/shipping" element={<ShippingAddressScreen />} />
                  <Route path="/payment" element={<PaymentMethodScreen />} />
                  <Route
                    path="/admin/dashboard"
                    element={
                      <AdminRoute>
                        <DashboardScreen />
                      </AdminRoute>
                    }
                  ></Route>
                  <Route
                    path="/admin/orders"
                    element={
                      <AdminRoute>
                        <OrderListScreen />
                      </AdminRoute>
                    }
                  ></Route>
                  <Route
                    path="/admin/users"
                    element={
                      <AdminRoute>
                        <UserListScreen />
                      </AdminRoute>
                    }
                  ></Route>
                  <Route
                    path="/admin/products"
                    element={
                      <AdminRoute>
                        <ProductListScreen />
                      </AdminRoute>
                    }
                  ></Route>
                  <Route
                    path="/admin/product/:id"
                    element={
                      <AdminRoute>
                        <ProductEditScreen />
                      </AdminRoute>
                    }
                  ></Route>
                  <Route
                    path="/admin/user/:id"
                    element={
                      <AdminRoute>
                        <UserEditScreen />
                      </AdminRoute>
                    }
                  ></Route>
                  <Route path="/" element={<HomeScreen />} />
                </Routes>
              </Container>
            </main>
            {/* <footer>
          <div className="text-center">All rights reserved</div>
        </footer> */}
            {/* <footer>
        <div class="fottter_head">
            <div class="fottter_position"></div>
            <div class="contanier text-center">
                <img src="img/icon.png" alt="">
            </div>
            <div class=" container p-5">
                <div class="row m-auto">
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="contact">
                            <h5>Contact Info</h5>
                            <div class="contact_p">
                                <p>1650 Lombard Street,
                                    San Francisco, CA 94123</p>
                                <p>+1 (415) 876-3250
                                    [email protected]</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="contact">
                            <h5>Useful Links</h5>
                            <ul>
                                <a href="#"><li>Support</li></a>
                                <a href="#"><li>Privacy Policy</li></a>
                                <a href="#"><li>Terms  Conditions</li></a>
                                <a href="#"><li>Affiliate Program</li></a>
                                <a href="#"><li>Careers</li></a>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="contact">
                            <h5>Recent Posts</h5>
                            <ul>
                                <a href="#"><li>Sunset in Venice</li></a>
                                <a href="#"><li>Aerial View of Village</li></a>
                                <a href="#"><li>Lighted Concrete City</li></a>
                                <a href="#"><li>The Little Ghost</li></a>
                                <a href="#"><li>Royal Oats ft. Waldo</li></a>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="contact">
                            <h5>Popular Tags</h5>
                            <div class="row">
                                <div class="col-4 " style="padding-left: 0px; padding-right: 0px;">
                                    <button type="button" class="btn btn-outline-danger">HTML5</button>
                                </div>
                                <div class="col-4" style="padding-left: 0px; padding-right: 0px;">
                                    <button type="button" class="btn btn-outline-danger">CSS3</button>
                                </div>
                                <div class="col-4" style="padding-left: 0px; padding-right: 0px;">
                                    <button type="button" class="btn btn-outline-danger">jQuery</button>
                                </div>
                            </div>
                            <div class="row mt-1 mb-1">
                                <div class="col-5 " style="padding-left: 0px; padding-right: 0px;">
                                    <button type="button" class="btn btn-outline-danger">UX / UI</button>
                                </div>
                                <div class="col-3" style="padding-left: 0px; padding-right: 0px;">
                                    <button type="button" class="btn btn-outline-danger">Web</button>
                                </div>
                                <div class="col-4" style="padding-left: 0px; padding-right: 0px;">
                                    <button type="button" class="btn btn-outline-danger">Graphic</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-4" style="padding-left: 0px; padding-right: 0px;">
                                    <button type="button" class="btn btn-outline-danger">Design</button>
                                </div>
                                <div class="col-8" style="padding-left: 0px; padding-right: 0px;">
                                    <button type="button" class="btn btn-outline-danger">Development</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer_tail">
            <div class=" container">
                <div class="row d-flex pt-4 pb-4">
                    <div class="footer_tail_ul">
                        <ul>
                            <a href="#"><li class="mr-4"><i class="fab fa-twitter fa-fw"></i></li></a>
                            <a href="#"><li class="mr-4"><i class="fab fa-facebook-f fa-fw"></i></li></a>
                            <a href="#"><li class="mr-4"><i class="fab fa-instagram fa-fw"></i></li></a>
                            <a href="#"><li class="mr-4"><i class="fab fa-dribbble fa-fw"></i></li></a>
                            <a href="#"><li class="mr-4"><i class="fab fa-pinterest fa-fw"></i></li></a>
                        </ul>
                    </div>
                    <div class="footer_copy ml-auto">
                        <p>Copyright © 2020 <span>Angora</span></p>
                    </div>
                </div>
            </div>
        </div>
          </footer> */}
          </div>
          <Footer></Footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
