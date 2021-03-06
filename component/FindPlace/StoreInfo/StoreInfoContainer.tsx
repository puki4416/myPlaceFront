import { useDispatch, useSelector } from "react-redux";
import {
  axiosDeleteBookMark,
  axiosPostBookMark,
} from "../../../lib/commonFn/api";
import { RootReducer } from "../../../store";
import {
  initializeStoreInfo,
  setBookmark,
} from "../../../store/reducers/storeInfo/storeInfoReducer";
import StoreInfo from "./StoreInfo";

const StoreInfoContainer = () => {
  const store = useSelector((state: RootReducer) => state.storeInfo);
  const loginedUser = useSelector(
    (state: RootReducer) => state.userLogin.loginStatus
  );
  const dispatch = useDispatch();

  const postBookMark = async (StoreId: number) => {
    if (!loginedUser) {
      alert("로그인을 해주세요");
    } else {
      try {
        await axiosPostBookMark(StoreId);
        dispatch(setBookmark(true));
      } catch (err) {
        alert("에러가 발생하였습니다");
      }
    }
  };

  const deleteBookMark = async (StoreId: number) => {
    if (!loginedUser) {
      alert("로그인을 해주세요");
    } else {
      try {
        await axiosDeleteBookMark(StoreId);
        dispatch(setBookmark(false));
      } catch (err) {
        alert("에러가 발생하였습니다");
      }
    }
  };

  const deleteStoreTab = () => {
    dispatch(initializeStoreInfo());
  };
  return (
    <StoreInfo
      store={store}
      postBookMark={postBookMark}
      deleteBookMark={deleteBookMark}
      deleteStoreTab={deleteStoreTab}
    />
  );
};

export default StoreInfoContainer;
