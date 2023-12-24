import { StyledContainer, StyledInput, StyledLabel } from "./Input.styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const Input = ({ onChange, label, ...rest }: InputProps) => {
  return (
    <StyledContainer>
      <StyledLabel htmlFor={rest.id}>{label}</StyledLabel>
      <StyledInput id={rest.id} onChange={onChange} {...rest} />
    </StyledContainer>
  );
};

export default Input;
