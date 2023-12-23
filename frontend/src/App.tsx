import "./App.css";
import MainPage from "./pages/MainPage";
import { DialogContainer, Layout } from "./utills/lib/Layout";

function App() {
  return (
    <Layout>
      <MainPage />
      <DialogContainer />
    </Layout>
  );
}

export default App;
