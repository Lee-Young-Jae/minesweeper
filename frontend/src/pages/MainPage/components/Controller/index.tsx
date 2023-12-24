import { useSelector } from "react-redux";
import Dialog from "../../../../components/Dialog";
import { withLayout, EnhancedLayoutProps } from "../../../../utills/lib/Layout";
import Timer from "../Timer";
import {
  StyledContainer,
  StyledDifficulty,
  StyledGameInfo,
  StyledEmotion,
} from "./Controller.styles";
import { RootState } from "../../../../redux/rootReducer";

const MineCounter = () => {
  const { mineCount } = useSelector((state: RootState) => state.game);
  return <div>💣X{mineCount}</div>;
};

const Emotion = () => {
  const { emotion } = useSelector((state: RootState) => state.game);
  return <StyledEmotion>{emotion}</StyledEmotion>;
};

interface ControllerProps extends EnhancedLayoutProps {}

const Controller = ({ openDialog }: ControllerProps) => {
  const handleCustomDifficulty = () => {
    openDialog(
      <Dialog>
        <div>가로</div>
        <div>세로</div>
        <div>지뢰 개수</div>
      </Dialog>
    );
  };

  return (
    <StyledContainer>
      <StyledGameInfo>
        <MineCounter />
        <Emotion />
        <Timer />
      </StyledGameInfo>
      <StyledDifficulty>
        <button>Beginner (8X8), 지뢰 10개</button>
        <button>Intermediate (16X16) 지뢰 40개</button>
        <button>Expert (32X16) 지뢰 100개</button>
        <button onClick={handleCustomDifficulty}>Custom</button>
      </StyledDifficulty>
    </StyledContainer>
  );
};

export default withLayout(Controller);
