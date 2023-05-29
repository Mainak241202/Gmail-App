import React from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";
import { ArrowBack, Delete } from "@mui/icons-material";
import { emptyProfilePic } from "../constants/constant";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";

const IconWrapper = styled(Box)({
  padding: 15,
});

const Subject = styled(Typography)({
  fontSize: 22,
  margin: "10px 0 20px 75px",
  display: "flex",
});

const Indicator = styled(Box)({
  fontSize: "12px !important",
  background: "#ddd",
  color: "#222",
  padding: "2px 4px",
  marginLeft: "6px",
  borderRadius: "4px",
  alignSelf: "center",
});

const Image = styled("img")({
  borderRadius: "50%",
  width: 40,
  height: 40,
  margin: "5px 10px 0 10px",
  backgroundColor: "#cccccc",
});

const Container = styled(Box)({
  marginLeft: 15,
  width: "100%",
  "& > div": {
    display: "flex",
    "& > p > span": {
      fontSize: 12,
      color: "#5E5E5E",
    },
  },
});

const Date = styled(Typography)({
  margin: "0 50px 0 auto",
  fontSize: 12,
  color: "#5E5E5E",
});

const ViewEmail = () => {
  const { openDrawer } = useOutletContext();
  const { state } = useLocation();
  const { email } = state;
  const moveEmailstoBinService = useApi(API_URLS.moveEmailstoBin);

  const deleteEmails = () => {
    moveEmailstoBinService.call([email._id]);
    window.history.back();
  };

  return (
    <Box
      style={
        openDrawer ? { marginLeft: 250, width: "100%" } : { width: "100%" }
      }
    >
      <IconWrapper>
        <ArrowBack
          onClick={() => window.history.back()}
          color="action"
          fontSize="small"
          style={{ cursor: "pointer" }}
        />
        <Delete
          fontSize="small"
          color="action"
          style={{ marginLeft: 40, cursor: "pointer" }}
          onClick={() => deleteEmails()}
        />
      </IconWrapper>
      <Subject>
        {email.subject} <Indicator component="span">Inbox</Indicator>
      </Subject>
      <Box style={{ display: "flex" }}>
        <Image src={emptyProfilePic} alt="dp" />
        <Container>
          <Box>
            <Typography>
              {email.name}
              <Box component="span">&nbsp;&#60;{email.to}&#62;</Box>
            </Typography>
            <Date>
              {new window.Date(email.date).getDate()}&nbsp;
              {new window.Date(email.date).toLocaleString("default", {
                month: "long",
              })}
              &nbsp;
              {new window.Date(email.date).getFullYear()}
            </Date>
          </Box>
          <Typography style={{ marginTop: 20 }}>{email.body}</Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default ViewEmail;
