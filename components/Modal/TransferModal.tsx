import { MouseEvent, useState } from 'react';
import {
  useAuthContext,
  useModalContext,
  TransferOrBurnNFTModalProps,
} from '../Provider';
import {
  Background,
  ModalBox,
  Section,
  CloseIconContainer,
  Title,
  Description,
  ErrorMessage,
  Column,
  HalfButton,
} from './Modal.styled';
import InputField from '../InputField';
import { useWindowSize } from '../../hooks';
import ProtonSDK from '../../services/proton';
import proton from '../../services/proton-rpc';
import Image from 'next/image';
import Spinner from '../Spinner';
import { DropdownMenu } from '../AssetFormBuy/AssetFormBuy.styled';

export const TransferModal = (): JSX.Element => {
  const { currentUser } = useAuthContext();
  const { closeModal, modalProps } = useModalContext();
  const {
    assetIds,
    fetchPageData,
    templateMint,
  } = modalProps as TransferOrBurnNFTModalProps;
  const [recipient, setRecipient] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { isMobile } = useWindowSize();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [assetId, setAssetId] = useState('');
  const transfer = async () => {
    try {
      if (recipient.length < 4 || recipient.length > 12 || !isValid) {
        return;
      }

      const user = await proton.getUserByChainAccount(recipient);

      if (!user) {
        setError('Invalid user. Please try again.');
        return;
      }

      const res = await ProtonSDK.transfer({
        sender: currentUser ? currentUser.actor : '',
        recipient,
        asset_id: assetId,
        memo,
      });

      if (!res.success && !res.error.includes('Modal closed')) {
        throw new Error(res.error);
      }

      if (res.success) {
        fetchPageData();
        closeModal();
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const handleBackgroundClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Background onClick={handleBackgroundClick}>
      <ModalBox>
        <Section>
          <Title>Transfer NFT</Title>
          <CloseIconContainer role="button" onClick={closeModal}>
            <Image src="/close.svg" width={16} height={16} />
          </CloseIconContainer>
        </Section>
        <Description>
          You can transfer NFTs from your account to another.
        </Description>
        <Column>
        {assetIds.length === 0 ? <div style={{marginBottom: '10px'}}><Spinner size={30} /></div> : <DropdownMenu
                name="Available Assets For Sale"
                value={assetId}
                onChange={(e) => {
                    setAssetId(e.target.value);
                }}>
                <option key="blank" value="" disabled>
                - - Select a Assets Number - -
                </option>
                {assetIds.length > 0 &&
                assetIds.map((val, index) => val ? (
                    <option key={index} value={[val]}>
                        #{modalProps['templateMint'][index]} - {val}
                    </option>
                ) : null)}
          </DropdownMenu>
          }
          <InputField
            value={recipient}
            setValue={setRecipient}
            setFormError={setError}
            placeholder="Receiver name"
            mb="16px"
            checkIfIsValid={(input: string) => {
              const isValid =
                input.length >= 4 &&
                input.length < 13 &&
                !!input.match(/^[a-z1-5.]+$/);
              setIsValid(isValid);
              const errorMessage =
                "Recipient's name must be 4-12 characters and only contain the numbers 1-5 or lowercase letters a-z";
              return {
                isValid,
                errorMessage,
              };
            }}
          />
          <InputField
            value={memo}
            setValue={setMemo}
            setFormError={setError}
            placeholder="Memo"
            mb="24px"
          />
          <HalfButton
            fullWidth={isMobile}
            onClick={transfer}
            margin="0"
            disabled={!isValid}>
            Transfer
          </HalfButton>
          {error ? <ErrorMessage>{error}</ErrorMessage> : null}
        </Column>
      </ModalBox>
    </Background>
  );
};
