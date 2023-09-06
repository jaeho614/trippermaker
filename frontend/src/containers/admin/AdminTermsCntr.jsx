import { useCallback, useEffect, useRef, useState } from "react";
import AdminTermsComp from "../../components/admin/AdminTermsComp";
import { useDispatch, useSelector } from "react-redux";
import { changePhoto } from "../../lib/api/admin/terms";
import {
  changeInform,
  changePhotoFailure,
  changePhotoSuccess,
  changeValue,
  editAdminTerms,
  getAdmin,
  getNewAdmin,
  getAdminTerms,
  initializeForm,
  inputAddress,
  clearTerms,
} from "../../modules/admin/AdminTermsMod";
import { check } from "../../modules/auth/UserMod";

const AdminTermsCntr = () => {
  const dispatch = useDispatch();
  const {
    id,
    user,
    admin,
    newAdmin,
    nick,
    phone,
    addr1,
    addr2,
    zipcode,
    changeInformError,
    getTerms,
    editTerms,
  } = useSelector(({ UserMod, AdminTermsMod }) => ({
    id: UserMod?.user?.id,
    admin: AdminTermsMod?.admin,
    newAdmin: AdminTermsMod?.newAdmin,
    nick: AdminTermsMod?.admin?.nick,
    phone: AdminTermsMod?.admin?.phone,
    addr1: AdminTermsMod?.admin?.addr1,
    addr2: AdminTermsMod?.admin?.addr2,
    zipcode: AdminTermsMod?.admin?.zipcode,
    changeInformError: AdminTermsMod?.changeInformError,
    getTerms: AdminTermsMod?.getTerms,
    editTerms: AdminTermsMod?.editTerms,
  }));
  const [tableType, setTableType] = useState("LOGO");
  const [logo, setLogo] = useState();
  const [content, setContent] = useState();
  const [changeForm, setChangeForm] = useState(false);
  const [changeEditForm, setChangeEditForm] = useState(null);
  const [changeTerms, getChangeTerms] = useState(null);
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState({});
  const businessNameRef = useRef(null);
  const masterNameRef = useRef();
  const phoneNumberRef = useRef();
  const address1Ref = useRef();
  const address2Ref = useRef();
  const zipcodeRef = useRef();

  //ref는 modal안에서 작동하지 않는다. 그래서 useCallback을 사용하여 리렌더링을 발생시켜 ref값이 바뀌었다는 것을 알려줘야함.
  const termsRef = useCallback(
    ref => {
      if (ref !== null) {
        if (getTerms && modal) {
          ref.value = getTerms.content;
        }
      }
    },
    [getTerms]
  );

  const changeType = e => {
    const type = e.target.id;
    setTableType(type);
    setChangeForm(false);
  };

  const onUploadLogo = e => {
    setContent(e.target.files[0]);
  };

  const onChangeLogo = async e => {
    e.preventDefault();
    if (!content) {
      return alert("사진을 먼저 선택해주세요.");
    }
    const formData = new FormData();
    formData.append("img", content);
    await changePhoto({
      id,
      formData,
    }).then(res => {
      if (res.status === 200) {
        const { img } = res.data;
        setLogo(img);
        dispatch(
          changePhotoSuccess({
            img,
          })
        );
      } else {
        const { imgError } = res.data;
        dispatch(
          changePhotoFailure({
            imgError,
          })
        );
      }
    });
  };

  const onChangeForm = () => {
    setChangeForm(!changeForm);
  };

  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeValue({
        form: "newAdmin",
        value,
        key: name,
      })
    );
  };

  const onChangeInform = () => {
    const { new_id, new_nick, new_phone, new_zipcode, new_addr1, new_addr2 } =
      newAdmin;
    dispatch(
      changeInform({
        id,
        businessName: new_id,
        nick: new_nick,
        phone: new_phone,
        zipcode: new_zipcode,
        addr1: new_addr1,
        addr2: new_addr2,
      })
    );
  };

  const openModal = e => {
    e.preventDefault();
    setModal(!modal);
  };

  const onCompletePost = data => {
    const { roadAddress, zonecode } = data;
    setAddress({ roadAddress, zonecode });
    setModal(!modal);
    dispatch(
      inputAddress({
        addr1: roadAddress,
        zipcode: zonecode,
      })
    );
    address1Ref.current.value = roadAddress;
    zipcodeRef.current.value = zonecode;
  };

  const onOpenTerms = type => {
    setModal(!modal);
    setChangeEditForm(type);
    dispatch(
      getAdminTerms({
        id,
        type,
      })
    );
  };

  const onEditTerms = () => {
    dispatch(
      editAdminTerms({
        id,
        type: changeEditForm,
        content: changeTerms,
      })
    );
  };

  const onChangeTerms = e => {
    const { value } = e.target;
    getChangeTerms(value);
  };

  useEffect(() => {
    const BusinessName = admin?.id?.slice(
      admin?.id.indexOf("@") + 1,
      admin?.id.lastIndexOf(".")
    );

    if (changeForm) {
      businessNameRef.current.value = BusinessName;
      masterNameRef.current.value = nick;
      phoneNumberRef.current.value = phone;
      zipcodeRef.current.value = zipcode;
      address1Ref.current.value = addr1;
      address2Ref.current.value = addr2;

      dispatch(
        getNewAdmin({ id: BusinessName, nick, phone, zipcode, addr1, addr2 })
      );
    }

    if (!changeForm) {
      dispatch(initializeForm());
    }
  }, [changeForm]);

  //상호변경시 localStorage와 UserMod의 user를 갱신하여 로그아웃 없이 계속해서 정보 수정가능
  useEffect(() => {
    const USER_KEY = "USER";
    localStorage.setItem(USER_KEY, JSON.stringify(admin));
    dispatch(check());
  }, [admin]);

  useEffect(() => {
    if (changeInformError === false) {
      alert("수정완료");
      setChangeForm(false);
    }
  }, [changeInformError]);

  useEffect(() => {
    dispatch(
      getAdmin({
        id,
      })
    );
  }, [dispatch, logo]);

  useEffect(() => {
    if (editTerms !== null && editTerms !== undefined) {
      alert(`${changeEditForm} 이/가 수정되었습니다.`);
      setModal(!modal);
      dispatch(clearTerms());
    }
  }, [editTerms]);

  return (
    <AdminTermsComp
      admin={admin}
      modal={modal}
      tableType={tableType}
      changeType={changeType}
      onChangeLogo={onChangeLogo}
      onUploadLogo={onUploadLogo}
      onChangeForm={onChangeForm}
      onChangeInform={onChangeInform}
      changeForm={changeForm}
      onChange={onChange}
      businessNameRef={businessNameRef}
      masterNameRef={masterNameRef}
      phoneNumberRef={phoneNumberRef}
      addr1={addr1}
      address1Ref={address1Ref}
      address2Ref={address2Ref}
      zipcodeRef={zipcodeRef}
      openModal={openModal}
      onCompletePost={onCompletePost}
      onEditTerms={onEditTerms}
      onOpenTerms={onOpenTerms}
      changeEditForm={changeEditForm}
      termsRef={termsRef}
      onChangeTerms={onChangeTerms}
    />
  );
};

export default AdminTermsCntr;
