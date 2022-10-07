import React from "react";
import { useContext } from "react";

//context
import { color } from "../../../Context/ColorContext";

//library components
import User from "./User";
import PrimaryTag from "./PrimaryTag";
import CommentCount from "./CommentCount";
import LikeCount from "./LikeCount";
import DislikeCount from "./DislikeCount";

//mui components
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const Post = () => {
  const { secondaryBgColor } = useContext(color);

  const PostBox = styled(Box)({
    boxShadow: `0 0 3px 0.5px ${secondaryBgColor}`,
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    width: "100%",
    background: "rgba(0,0,0,0.06)",
    padding: "30px",
    borderRadius: "10px",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
    "&:hover": {
      scale: "1.02",
    },
    ["@media (max-width: 550px)"]: {
      padding: "30px 20px",
    },
  });

  const CountBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "240px",
    width: "100%",
  });

  const WidgetBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ["@media (max-width: 650px)"]: {
      flexDirection: "column",
      gap: "20px",
    },
  });

  const DetailBox = styled(Box)({
    padding: "5px",
    display: "flex",
    flexDirection: "row",
    gap: "25px",
    ["@media (max-width: 750px)"]: {
      flexDirection: "column",
      alignItems: "center",
    },
  });

  const ImageBox = styled(Box)({
    boxShadow: `0 0 3px 0.2px`,
    background: "url(https://source.unsplash.com/random) center/cover",
    height: "150px",
    width: "150px",
    minWidth: "150px",
    borderRadius: "10px",
    ["@media (max-width: 750px)"]: {
      width: "100%",
      height: "200px",
    },
  });

  const TextBox = styled(Box)({
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "10px 0",
    gap: "5px",
    height: "80%",
    maxHeight: "120px",
    "& > div": {
      fontFamily: "Inter",
    },
  });

  const TitleBox = styled(Box)({
    fontSize: "24px",
    fontWeight: "bold",
    width: "100%",
    ["@media (max-width: 900px)"]: {
      fontSize: "20px",
    },
    ["@media (max-width: 750px)"]: {
      fontSize: "16px",
    },
  });

  const DateBox = styled(Box)({
    fontFamily: "Inter",
    fontSize: "14px",
    opacity: "0.7",
    margin: "10px 0px",
  });

  return (
    <PostBox>
      <User
        name="Arjun Varshney"
        image="https://source.unsplash.com/random/?user"
      />
      <DetailBox>
        <ImageBox />
        <Box>
          <TextBox>
            <TitleBox>
              What is docker, How to use it, How it works, Basic Docker Commands
              title title title title title tit
            </TitleBox>
          </TextBox>
          <DateBox>Oct 3 | 5m read</DateBox>
        </Box>
      </DetailBox>
      <WidgetBox>
        <PrimaryTag text="Development" />
        <CountBox>
          <CommentCount comments={2} />
          <LikeCount likes={25} />
          <DislikeCount dislikes={15} />
        </CountBox>
      </WidgetBox>
    </PostBox>
  );
};

export default Post;