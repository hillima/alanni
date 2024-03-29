import styled from 'styled-components';
import { MaxWidth } from '../../styles/MaxWidth.styled';
import { StyledButton, ButtonProps } from '../Button/Button.styled';
import { breakpoint } from '../../styles/Breakpoints';

interface HalfButtonProps extends ButtonProps {
  color?: string;
  hoverColor?: string;
  height?: string;
  padding?: string;
  disabled?: boolean;
}

interface DescriptionProps {
  mb?: string;
}

export const Background = styled.div`
  z-index: 104;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const ModalBox = styled(MaxWidth)`
  display: flex;
  height: calc(100% - 40px);
  max-height: 700px;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 30px !important; 
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 8px 8px -4px rgba(0, 0, 0, 0.1), 0 0 4px 0 rgba(0, 0, 0, 0.08);
  background-color: ${props => props.theme.colors.bgColor};

  @media (min-width: 600px) {
    width: 416px;
  }
`;

export const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const CloseIconContainer = styled.div`
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 24px;
  line-height: 1.2;
  color: ${props => props.theme.colors.titleColor};
  margin-bottom: 10px;
  font-weight: normal;
`;

export const Description = styled.p<DescriptionProps>`
  font-size: 14px;
  line-height: 24px;
  color: ${props => props.theme.colors.genColor};
  margin-bottom: ${({ mb }) => mb || '24px'};
`;

export const InputLabel = styled(Description).attrs({ as: 'label' })`
  font-size: 12px;
  line-height: 24px;
  display: flex;
  flex-direction: column;
  margin: 0;
`;

export const LinkDescription = styled(Description)`
  margin-bottom: 4px;
  text-align: center;
  font-size: 12px;
`;

export const FeeLabel = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 24px;
  color: #FFFFFF;
  margin: 16px 0 16px;
`;

export const AvailableBalance = styled.span`
  font-weight: 600;
  color: #8a9ef5;
`;

export const ErrorMessage = styled(Description).attrs({ as: 'span' })`
  font-size: 12px;
  color: red;
  margin-bottom: 20px;
`;

export const Row = styled.div`
  display: flex;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModalButton = styled(StyledButton)`
  height: 48px;
`;

export const HalfButton = styled(StyledButton)<HalfButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 144px;
  align-self: flex-end;
  padding: ${({ padding }) => padding || '11px 16px 13px'};

  ${({ color }) =>
    color &&
    `
    background-color: ${color};
  `};

  ${({ hoverColor }) =>
    hoverColor &&
    `
    :hover {
      background-color: ${hoverColor};
    }
  `};

  ${({ disabled }) =>
    disabled &&
    `
    pointer-events: none;
    opacity: 0.2;
  `};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 500px;
  overflow-y: scroll;
  padding-right: 10px;
  padding-left: 5px;
  ${breakpoint.mobile`
  padding-right: 0;
  padding-left: 0;
  `};
  ::-webkit-scrollbar {
    width: 5px;
    border-radius: 30px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #D9D9D9;
  }
  ::-webkit-scrollbar-track {
    background-color: none;
  }
`;

export const DragDropButton = styled(StyledButton)`
  width: 50%;
  margin: 0;
  padding: 3px 16px;
  background: #f2f2f2;
  color: #7B0A75;
  font-size: 14px;
  border-radius: 4px;
  margin-left: 10px;
  :active,
  :hover,
  :focus {
    background: #7B0A75;
    color: #f2f2f2;
  }
`;

export const Link = styled.a`
  font-size: 14px;
  line-height: 24px;
  color: #7B0A75;

  :hover {
    color: rgba(117, 46, 235, 0.6);
    cursor: pointer;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 160px;
  margin-bottom: 24px;
  padding: 11px 16px 101px;
  border-radius: 8px;
  border: solid 1px #e6e6e6;
  font-size: 16px;
  line-height: 1.5;

  ::-webkit-scrollbar {
    width: 0;
    color: transparent;
    background-color: transparent;
  }

  ::placeholder {
    font-size: 16px;
    line-height: 1.5;
    color: #808080;
  }
`;
