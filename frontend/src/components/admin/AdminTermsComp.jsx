import { css, styled } from "styled-components";
import Modal from "styled-react-modal";

import DaumPostcode from "react-daum-postcode";

const ModalBox = Modal.styled`
  background: white;
  border-radius: 15px;
  padding: 5px;
`;

const StyledModal = styled.div`
  background: white;
  height: auto;
  width: 500px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
  padding: 5px;
`;

const SpanInModal = styled.span`
  width: auto;
`;

const StyledTextarea = styled.textarea`
  height: 600px;
  width: 100%;
`;

const DivInModal = styled.div`
  cursor: pointer;
  text-align: center;
  background: none;
  color: ${props => props.theme.red};
`;

const SubIdInput = styled.input`
  background: ${props => props.theme.white};
  color: ${props => props.theme.softblack};
  border: 1px solid ${props => props.theme.border};
  border-radius: 14px;
  margin-right: 10px;
  padding: 0 10px;
  height: 28px;
  width: 300px;

  &.zipcode {
    width: 40px;
  }
  ${props =>
    props.disabled &&
    css`
      background: gray;
      disabled
    `}
`;

const AdminBoardWrap = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 30px;
  width: 100%;
`;

const BoardContainer = styled.div`
  background: ${props => props.theme.smoke};

  &:first-child {
    margin-left: 1%;
    width: 35%;
  }
  &:last-child {
    margin-left: 1%;
    width: 62%;
  }
`;

const BoardName = styled.div`
  background: ${props => props.theme.adminColor};

  font-size: 20px;
  padding: 10px 20px;
  span {
    color: ${props => props.theme.white};
    margin-left: 10px;
  }
`;

const BoardTag = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid ${props => props.theme.border};
  padding: 10px;
`;

const Button = styled.button`
  cursor: pointer;
  background: ${props => props.theme.button};
  color: ${props => props.theme.buttonText};
  border: none;
  margin: 10px;
  padding: 7px 12px;

  &:hover {
    background: ${props => props.theme.hoverButton};
  }
`;

const BoardContent = styled.div`
  background: ${props => props.theme.smoke};
  padding: 30px;
`;

const ImgInput = styled.input`
  display: none;
`;

const ImageBox = styled.img`
  cursor: pointer;
  border-radius: 25px;
  border: 1px solid ${props => props.theme.border};
  height: 150px;
  width: 150px;
`;

const ImageBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
`;

const CompanyInform = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  height: 40px;

  &.noneBorder {
    border-bottom: none;
  }

  &.terms {
    margin: 10px 0;
  }
`;

const NameTag = styled.span`
  display: inline-block;
  font-weight: 600;
  margin-right: 20px;
  padding: 0px 10px;
  width: 70px;
`;

const Detail = styled.div`
  display: inline-block;
  padding: 5px 10px;
`;

const InputBox = styled.input`
  border-radius: 14px;
  margin-right: 10px;
  padding: 0 10px;
  height: 28px;
  width: 150px;

  &.detailAddress {
    width: 370px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 18px;
`;

const InformBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const AdminTermsComp = ({
  admin,
  modal,
  tableType,
  changeType,
  onChangeLogo,
  onUploadLogo,
  onChangeForm,
  onChangeInform,
  changeForm,
  onChange,
  businessNameRef,
  masterNameRef,
  phoneNumberRef,
  addr1,
  address1Ref,
  address2Ref,
  zipcodeRef,
  openModal,
  onCompletePost,
  onOpenTerms,
  onEditTerms,
  changeEditForm,
  termsRef,
  onChangeTerms,
}) => {
  return (
    <AdminBoardWrap>
      <BoardContainer>
        <BoardName>
          <span>약관관리</span>
        </BoardName>
        <BoardTag>
          <Button id="LOGO" onClick={changeType}>
            로고변경
          </Button>
          <Button id="INFORM" onClick={changeType}>
            정보변경
          </Button>
          <Button id="TERMS" onClick={changeType}>
            약관관리
          </Button>
        </BoardTag>
        {tableType === "LOGO" && (
          <BoardContent>
            <form encType="multipart/form-data">
              <ImageBoxContainer>
                {admin?.img ? (
                  <ImageBox src={`/assets/${admin.img}`} alt="img" />
                ) : (
                  <ImageBox src={"/assets/triplogo.png"} alt="img" />
                )}
                <ImgInput type="file" onChange={onUploadLogo} name="img" />
                <Button onClick={onChangeLogo}>로고변경</Button>
              </ImageBoxContainer>
            </form>
          </BoardContent>
        )}
        {tableType === "INFORM" && (
          <BoardContent>
            {!changeForm ? (
              <InformBox>
                <CompanyInform>
                  <NameTag>상호</NameTag>
                  <Detail>
                    {admin?.id?.slice(
                      admin?.id?.indexOf("@") + 1,
                      admin?.id?.lastIndexOf(".")
                    )}
                  </Detail>
                </CompanyInform>
                <CompanyInform>
                  <NameTag>주소</NameTag>
                  <Detail>
                    {admin?.addr1} {admin?.addr2}
                  </Detail>
                </CompanyInform>
                <CompanyInform>
                  <NameTag>책임자</NameTag>
                  <Detail>{admin?.nick}</Detail>
                </CompanyInform>
                <CompanyInform className="noneBorder">
                  <NameTag>전화번호</NameTag>
                  <Detail>{admin?.phone}</Detail>
                </CompanyInform>
                <ButtonBox>
                  <Button onClick={onChangeForm}>수정</Button>
                </ButtonBox>
              </InformBox>
            ) : (
              <InformBox>
                <CompanyInform>
                  <NameTag>상호</NameTag>
                  <InputBox
                    name="new_id"
                    type="text"
                    ref={businessNameRef}
                    onChange={onChange}
                  />
                </CompanyInform>
                <CompanyInform>
                  <NameTag>주소</NameTag>
                  {addr1 ? (
                    <>
                      <SubIdInput
                        className="zipcode"
                        placeholder="우편번호"
                        name="new_zipcode"
                        ref={zipcodeRef}
                        disabled={true}
                      />
                      <SubIdInput
                        placeholder="주소"
                        name="new_addr1"
                        type="text"
                        ref={address1Ref}
                        disabled={true}
                      />
                    </>
                  ) : (
                    <>
                      <SubIdInput
                        className="zipcode"
                        placeholder="우편번호"
                        name="new_zipcode"
                        ref={zipcodeRef}
                        disabled={true}
                      />
                      <SubIdInput
                        placeholder="주소"
                        name="new_addr1"
                        type="text"
                        ref={address1Ref}
                        disabled={true}
                      />
                    </>
                  )}
                  <Button onClick={openModal}>주소찾기</Button>
                </CompanyInform>
                <CompanyInform>
                  <NameTag>상세주소</NameTag>
                  <InputBox
                    className="detailAddress"
                    placeholder="상세주소"
                    name="new_addr2"
                    type="text"
                    ref={address2Ref}
                    onChange={onChange}
                  />
                </CompanyInform>
                <CompanyInform>
                  <NameTag>책임자</NameTag>
                  <InputBox
                    name="new_nick"
                    type="text"
                    ref={masterNameRef}
                    onChange={onChange}
                  />
                </CompanyInform>
                <CompanyInform className="noneBorder">
                  <NameTag>전화번호</NameTag>
                  <InputBox
                    name="new_phone"
                    type="text"
                    ref={phoneNumberRef}
                    onChange={onChange}
                  />
                </CompanyInform>
                <ButtonBox>
                  <Button onClick={onChangeInform}>수정완료</Button>
                  <Button onClick={onChangeForm}>취소</Button>
                </ButtonBox>
              </InformBox>
            )}
            <ModalBox
              isOpen={modal} //true = 열림 / false = 닫힘
              ariahideapp={"false"} //에러 안뜨게하기
              onEscapeKeydown={openModal} //esc키 눌렀을경우 함수 실행
              onBackgroundClick={openModal} //esc키 or 오버레이부분 클릭시 함수 실행
            >
              <StyledModal>
                <ModalHeader>
                  <SpanInModal>주소검색</SpanInModal>
                  <DivInModal onClick={openModal}>X</DivInModal>
                </ModalHeader>
                <DaumPostcode autoClose onComplete={onCompletePost} />
              </StyledModal>
            </ModalBox>
          </BoardContent>
        )}
        {tableType === "TERMS" && (
          <BoardContent>
            <CompanyInform className="noneBorder terms">
              <NameTag>이용약관</NameTag>
              <Button onClick={() => onOpenTerms("이용약관")}>수정</Button>
            </CompanyInform>
            <CompanyInform className="noneBorder terms">
              <NameTag>개인정보처리방침</NameTag>
              <Button onClick={() => onOpenTerms("개인정보처리방침")}>
                수정
              </Button>
            </CompanyInform>
            <CompanyInform className="noneBorder terms">
              <NameTag>이용안내</NameTag>
              <Button onClick={() => onOpenTerms("이용안내")}>수정</Button>
            </CompanyInform>
            <ModalBox
              isOpen={modal} //true = 열림 / false = 닫힘
              ariahideapp={"false"} //에러 안뜨게하기
              onEscapeKeydown={openModal} //esc키 눌렀을경우 함수 실행
              onBackgroundClick={openModal} //esc키 or 오버레이부분 클릭시 함수 실행
            >
              <StyledModal>
                <ModalHeader>
                  <SpanInModal>{changeEditForm}</SpanInModal>
                  <DivInModal onClick={openModal}>X</DivInModal>
                </ModalHeader>
                <StyledTextarea ref={termsRef} onChange={onChangeTerms} />
                <Button onClick={onEditTerms}>수정</Button>
                <Button onClick={openModal}>취소</Button>
              </StyledModal>
            </ModalBox>
          </BoardContent>
        )}
      </BoardContainer>
    </AdminBoardWrap>
  );
};

export default AdminTermsComp;
