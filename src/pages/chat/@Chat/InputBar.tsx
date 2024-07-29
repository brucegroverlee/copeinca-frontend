import { useContext } from "react";
// import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { styled } from "@mui/material/styles";

import { MessagesContext } from "../models/MessagesProvider";

const Form = styled("form")({
  display: "flex",
  flexDirection: "row",
  minHeight: 52,
  padding: "16px",
});

const InputMessage = styled("textarea")({
  flexGrow: 1,
});

/* const StyledInputBase = styled(InputBase)(({ theme }) => ({
  height: 52,
  padding: theme.spacing(0, 2),
  backgroundColor: "rgb(248 248 248)",
  borderTopLeftRadius: 13,
  borderTopRightRadius: 13,
  borderTop: "0.5px solid #cacaca",
  borderLeft: "0.5px solid #cacaca",
  borderRight: "0.5px solid #cacaca",
})); */

export const InputBar = () => {
  const { handleSubmit, isAnswerPending } = useContext(MessagesContext);

  return (
    <Form onSubmit={handleSubmit}>
      <InputMessage />

      <Button
        disableElevation
        disabled={isAnswerPending}
        type="submit"
        variant="contained"
        color="inherit"
        sx={{
          minWidth: "unset",
          padding: "4px",
          borderRadius: "13px",
        }}
      >
        <ArrowUpwardRoundedIcon />
      </Button>
      {/* <StyledInputBase
        fullWidth
        name="message"
        placeholder="Haz tu consulta aquí"
        disabled={isAnswerPending}
        endAdornment={
          <Button
            disableElevation
            disabled={isAnswerPending}
            type="submit"
            variant="contained"
            color="inherit"
            sx={{
              minWidth: "unset",
              padding: "4px",
              borderRadius: "13px",
            }}
          >
            <ArrowUpwardRoundedIcon />
          </Button>
        }
      /> */}
    </Form>
  );
};
