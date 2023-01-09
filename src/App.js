import Header from './components/Header';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpendForm from "./SpendForm"
import Home from "./Home"
import ContributionForm from './ContributionForm';
import SpendDetail from './SpendDetail';


function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
      <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/spend-form" element={<SpendForm />}></Route>
          <Route path="/contribution-form" element={<ContributionForm />}></Route>
          <Route path="/spend-detail" element={<SpendDetail />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
