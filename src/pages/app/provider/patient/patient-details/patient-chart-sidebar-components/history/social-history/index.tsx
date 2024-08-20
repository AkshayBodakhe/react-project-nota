import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { SocialHistory } from "../../../../../../../../mock-data/social-history";
import SocialHitoryTable from "./social-history-table";
export interface Column {
  id: string;
  label: string | JSX.Element;
  minWidth?: number;
}
export const SocialHistoryFormColumns: Column[] = [
  { id: "title", label: "Title", minWidth: 400 },
  { id: "form", label: "Form", minWidth: 250 },
  { id: "answer", label: "Answer/Score", minWidth: 250 },
  { id: "recordeddate", label: "Recorded Date", minWidth: 80 },
  //   { id: "action", label: "Action", minWidth: 100 },
];
export interface Row {
  [key: string]: string | JSX.Element | number | any;
}

function createProblemsForms(
  title: string,
  form: string,
  answer: string,
  recordeddate: string
  // action: boolean
): Row {
  return {
    title,
    form,
    answer,
    recordeddate,
    //   action,
  };
}

function SocialHistoryIndex() {
  const [socialHistoryData, setSocialHistoryData] = useState<Row[]>([]);

  useEffect(() => {
    const newRows = SocialHistory?.content.map((data: any) => {
      return createProblemsForms(
        data.title,
        data.form,
        data.answer,
        data.recordeddate
        // data.action
      );
    });
    setSocialHistoryData(newRows);
  }, []);
  
  return (
    <div>
      <Grid>
        <SocialHitoryTable
          SocialHistoryFormColumns={SocialHistoryFormColumns}
          socialHistoryData={socialHistoryData}
          title="Social History"
          btnTitle="Add SH"
        />
      </Grid>
      <Grid mt={1}>
        <SocialHitoryTable
          SocialHistoryFormColumns={SocialHistoryFormColumns}
          socialHistoryData={socialHistoryData}
          title="Psychological History"
          btnTitle="Add PH"
        />
      </Grid>
      <Grid mt={1}>
        <SocialHitoryTable
          SocialHistoryFormColumns={SocialHistoryFormColumns}
          socialHistoryData={socialHistoryData}
          title="Excersise History"
          btnTitle="Add EH"
        />
      </Grid>
      <Grid mt={1}>
        <SocialHitoryTable
          SocialHistoryFormColumns={SocialHistoryFormColumns}
          socialHistoryData={socialHistoryData}
          title="Habits"
          btnTitle="Add Habits"
        />
      </Grid>
      <Grid mt={1}>
        <SocialHitoryTable
          SocialHistoryFormColumns={SocialHistoryFormColumns}
          socialHistoryData={socialHistoryData}
          title="Cognitive"
          btnTitle="Add cognitive"
        />
      </Grid>
      <Grid mt={1}>
        <SocialHitoryTable
          SocialHistoryFormColumns={SocialHistoryFormColumns}
          socialHistoryData={socialHistoryData}
          title="Functional"
          btnTitle="Add Functional"
        />
      </Grid>
      <Grid mt={1}>
        <SocialHitoryTable
          SocialHistoryFormColumns={SocialHistoryFormColumns}
          socialHistoryData={socialHistoryData}
          title="Diet"
          btnTitle="Add Diet"
        />
      </Grid>
    </div>
  );
}

export default SocialHistoryIndex;
