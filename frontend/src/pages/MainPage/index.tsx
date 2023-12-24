import Board from "./components/Board";
import Controller from "./components/Controller";
import PageLayout from "../../components/layout/PageLayout";

const MainPage = () => {
  return (
    <PageLayout>
      <Board></Board>
      <Controller></Controller>
    </PageLayout>
  );
};

export default MainPage;
