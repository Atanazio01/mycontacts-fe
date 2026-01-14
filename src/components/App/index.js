import { BrowserRouter } from "react-router-dom";

import Header from "../Header";

import { Container } from "./styles";
import Routes from "../../Routes";
import ToastContainer from "../Toast/ToastContainer";

const App = function () {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Container>
        <Header />
        <Routes />
      </Container>
    </BrowserRouter>
  );
};

export default App;
