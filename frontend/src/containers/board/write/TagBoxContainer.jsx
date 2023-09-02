import { useDispatch, useSelector } from "react-redux";
import TagBoxComp from "../../../components/board/write/TagBoxComp";
import { changeField } from "../../../modules/board/WriteMod";

const TagBoxContainer = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector(({ WriteMod }) => ({
    tags: WriteMod.tags,
  }));
  const onChangeTags = (nextTags) => {
    dispatch(
      changeField({
        key: "tags",
        value: nextTags,
      })
    );
  };

  return <TagBoxComp tags={tags} onChangeTags={onChangeTags} />;
};

export default TagBoxContainer;
