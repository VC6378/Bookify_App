import { useEffect, useState } from "react";
import { Container, Navbar, Row, Col, Button } from "react-bootstrap";
import image from './bg-photo.jpg';

import AddBook from "./components/AddBook";
import BooksList from "./components/BooksList";
import Login from "./components/Login";

import { useFirebase } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./firebase-config.js";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [bookId, setBookId] = useState("");

  const firebase = useFirebase();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
      }
    });
  });

  const getBookIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setBookId(id);
  };
  if (user === null) {
    return <Login />;
  } else {
    return (
      <>
      <div className="hehe">
      
        <Navbar bg="dark" variant="dark" className="header">
          <Container>
            <Navbar.Brand >
            Bookify
            </Navbar.Brand>
          </Container>
          
          <Button
            style={{ width: "100px" }}
            onClick={() => {
              firebase.signout();
            }}
          >
            SignOut
          </Button>

        </Navbar>

        <Container style={{ width: "400px" }}>
          <Row>
            <Col>
              <AddBook id={bookId} setBookId={setBookId} user={user} />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <BooksList getBookId={getBookIdHandler} userId={user.uid} />
            </Col>
          </Row>
        </Container>
        <div className="footer">
          Made with ❤ by Vibhuti Chandrakar. Visit the{" "}
          <a href="https://github.com/VC6378/Bookify_App" target="_blank">
            Github repository
          </a>{" "}
          here.
        </div>
        
      </div>
      </>
    );
  }
}

export default App;