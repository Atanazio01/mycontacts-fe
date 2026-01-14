import { BrowserRouter } from "react-router-dom";

import Header from "../Header";

import { Container } from "./styles";
import Router from "../../Router";
import ToastContainer from "../Toast/ToastContainer";

const App = function () {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Container>
        <Header />
        <Router />
      </Container>
    </BrowserRouter>
  );
};

export default App;
