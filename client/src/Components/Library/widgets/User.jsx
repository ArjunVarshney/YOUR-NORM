import React from "react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { API } from "../../../Services/api.js";

//context
import { color } from "../../../Context/ColorContext";

//mui components
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

const User = ({ user }) => {
  const [username, setUsername] = useState("Unknown");
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
  );

  const { secondaryBgColor, primaryThemeColor } = useContext(color);

  const getUser = async (id) => {
    const response = await API.getUsername("", `/user/get/${id}`);
    const data = await response.data;
    if (data.success) {
      setUsername(data.data.username);
      setImage(data.data.image_url);
    }
  };

  useEffect(() => {
    getUser(user);
  }, []);

  const UserBox = styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: secondaryBgColor,
    padding: "7px 10px",
    borderRadius: "50px",
    maxHeight: "40px",
    boxShadow: `0 0 1px 0.1px ${primaryThemeColor}`,
    cursor: "pointer",
    width: "max-content",
  });

  const ImageBox = styled(Box)({
    height: "30px",
    width: "30px",
    overflow: "hidden",
    borderRadius: "50%",
    "& > img": {
      borderRadius: "50px",
      height: "100%",
      width: "100%",
      objectFit: "cover",
      marginRight: "10px",
      boxShadow: `0 0 1px 0.1px ${primaryThemeColor}`,
    },
  });

  const NameBox = styled(Box)({
    "& > p": {
      fontWeight: "bold",
      margin: "0 10px",
    },
  });

  return (
    <UserBox>
      <ImageBox>
        <Box component="img" src={image} alt={`${username}'s image`} />
      </ImageBox>
      <NameBox>
        <Typography>{username}</Typography>
      </NameBox>
    </UserBox>
  );
};

export default User;
