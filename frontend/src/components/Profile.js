import SideNavigation from "./ComponentsBase/SideNavigation";
import {
  AddSmallHomeComponent,
  SmallHomeComponent,
} from "./ComponentsBase/SmallHomeComponent";
export const Profile = () => {
  // const user = userFn();
  const user = { data: "Biển" };
  return (
    <div className="flex">
      <div className="fixed">
        <SideNavigation />
      </div>
      <div className="ml-80 m-5 p-2">
        <div className="text-3xl font-bold mb-4 text-center">Home's Biển</div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <SmallHomeComponent />
          </div>
          <div>
            <AddSmallHomeComponent />
          </div>
        </div>
      </div>
    </div>
  );
};
