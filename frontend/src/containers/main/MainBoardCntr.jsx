import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mainlistPosts } from "../../modules/main/MainMod";
import { useSearchParams } from "react-router-dom";
import MainBoardComp from "../../components/main/MainBoardComp";

const MainBoardListContainer = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { posts, user, error } = useSelector(({ MainMod, UserMod }) => ({
    posts: MainMod?.posts,
    error: MainMod.error,
    user: UserMod.user,
  }));

  useEffect(() => {
    const page = parseInt(searchParams.get("page"), 10) || 1;
    dispatch(mainlistPosts({ page }));
  }, [dispatch, searchParams]);

  return (
    <>
      <MainBoardComp posts={posts} error={error} />
    </>
  );
};

export default MainBoardListContainer;
