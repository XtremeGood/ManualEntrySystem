import { Grid } from "semantic-ui-react";
import { useState, createContext } from "react";
import { Tab } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import { useForm, FormProvider} from "react-hook-form";
import { ProfileMenu, TestsMenu} from "./SideBar"

export const TestContext = createContext();
export const TabContext = createContext();

const Main = () => {
  const [testList, setTestList] = useState({});
  const [counter, setCounter] = useState(0);

  const methods = useForm({ shouldUnregister: false });

  const [currentTabIndex, setCurrentTabIndex] = useState(1);


  const menuItems = [...ProfileMenu, ...TestsMenu];

  return (
    <Grid.Column width={16}>
      <FormProvider {...{ ...methods}}>
        <TestContext.Provider
          value={{ counter, setCounter, testList, setTestList }}
        >
          <TabContext.Provider value={{ currentTabIndex, setCurrentTabIndex }}>
            <Form
              className="attached fluid segment"
              method="post"
              action={"http://localhost:8000"}
            >
              <Tab
                menu={{ fluid: true, vertical: true, tabular: true }}
                panes={menuItems}
                activeIndex={currentTabIndex}
                onTabChange={(e, { activeIndex }) => {
                  setCurrentTabIndex(activeIndex);
                }}
              />
            </Form>
          </TabContext.Provider>
        </TestContext.Provider>
      </FormProvider>
    </Grid.Column>
  );
};

export default Main;
