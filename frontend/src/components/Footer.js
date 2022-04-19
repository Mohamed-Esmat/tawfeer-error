import React from 'react';
import './Footer.css';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter bgColor="dark" className="text-center text-lg-start text-muted">
      <section className=" border-bottom">
        <section className="container d-flex justify-content-center justify-content-lg-between p-4 ">
          <div className=" me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            
              <a
                
                className="me-4 text-reset" href="#!"
              >
                <i className=" fab fa-facebook-f"></i>
              </a>
            <a href="#!" className="me-4 text-reset">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#!" className="me-4 text-reset">
              <i className="fab fa-google"></i>
            </a>
            <a href="#!" className="me-4 text-reset">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#!" className="me-4 text-reset">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#!" className="me-4 text-reset">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>
      </section>

      <section className="bg-img">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h5 className="text-uppercase fw-bold mb-4">
                <i className=" fas fa-gem me-3"></i>
                <span className="tawfeer-hover cursor-pointer">TAWFEER</span>
              </h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum
                dolor sit amet, consectetur adipisicing elit
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#!" className="text-reset">
                  Clothes
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Computers
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Laptops
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Acc
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Settings
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-3"></i> CAIRO, NY 10012, EG
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                info@example.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> + 02 011 232 560 73
              </p>
              <p>
                <i className="fas fa-print me-3"></i> + 02 012 242 590 76
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
      >
        &copy;{new Date().getFullYear()} Copyright :{' '}
        <a
          className="text-reset fw-bold text-decoration-none tawfeer-hover"
          href="https://tawfeer.herokuapp.com/"
        >
          Tawfeer
        </a>
      </div>
    </MDBFooter>
  );
}

