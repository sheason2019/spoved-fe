import { TabContext, TabPanel } from "@mui/lab";
import { Paper, Tab, Tabs } from "@mui/material";
import { FC, useState } from "react";
import CompileTab from "../compile-tab";

const TAB_OPTIONS = ["编译工单", "部署工单", "小流量部署"];

const ActionTabs: FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <TabContext value={TAB_OPTIONS[tabIndex]}>
      <Paper sx={{ mt: 2, px: 2 }}>
        <Tabs value={tabIndex} onChange={(_, index) => setTabIndex(index)}>
          {TAB_OPTIONS.map((option) => (
            <Tab key={option} label={option} />
          ))}
        </Tabs>
        <TabPanel value={TAB_OPTIONS[0]} sx={{ px: 1, py: 2 }}>
          <CompileTab />
        </TabPanel>
        <TabPanel value={TAB_OPTIONS[1]} sx={{ px: 1, py: 2 }}>
          部署
        </TabPanel>
      </Paper>
    </TabContext>
  );
};

export default ActionTabs;
