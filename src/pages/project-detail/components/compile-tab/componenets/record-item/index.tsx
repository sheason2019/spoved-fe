import { FC } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps,
  Box,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

import { CompileRecord } from "../../../../../../api-lib/compile";
import STATUS_TEXT from "../../constant";

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

interface IProps {
  record: CompileRecord;
}

const RecordItem: FC<IProps> = ({ record }) => {
  return (
    <>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ borderRadius: 3, overflow: "hidden" }}
      >
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography fontWeight="bold">
                编译版本：{record.version}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography fontWeight="bold">
                编译镜像：{record.image}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography fontWeight="bold" sx={{ textAlign: "right" }}>
                当前状态：{STATUS_TEXT[record.statusCode!]}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body2" sx={{ textAlign: "right", mt: 1 }}>
            {record.operator}
            <Box component="span" fontWeight="bold" sx={{ mx: 1 }}>
              ·
            </Box>
            {record.createAt}
          </Typography>
        </Box>
        <Accordion
          disableGutters
          sx={{
            boxShadow: "none",
            border: "none",
            overflow: "hidden",
          }}
        >
          <AccordionSummary
            expandIcon={
              <ArrowForwardIosSharpIcon sx={{ fontSize: "0.85rem" }} />
            }
            sx={{
              background: "lightgray",
              boxShadow: "none",
              border: "none",
            }}
          >
            <Typography fontWeight="bold">点击查看Terminal输出</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              background: "black",
              color: "white",
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
              overflow: "auto",
              maxHeight: "65vh",
            }}
          >
            <Typography
              component="pre"
              sx={{
                wordBreak: "break-all",
                whiteSpace: "pre-wrap",
                overflow: "hidden",
              }}
              fontSize="0.85rem"
            >
              {record.output?.replaceAll("\r", "\n")}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  );
};

export default RecordItem;
