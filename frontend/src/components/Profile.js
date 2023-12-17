import SideNavigation from "./ComponentsBase/SideNavigation";
import {
  AddSmallHomeComponent,
  SmallHomeComponent,
} from "./ComponentsBase/SmallHomeComponent";
import { getListHome } from "../api/getListHome";
import React from "react";
import { Modal, Button, TextInput } from "flowbite-react";
import { addHome } from "../api/addHome";

export const Profile = () => {
  const [data, setData] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [nameHome, setNameHome] = React.useState("");
  function onCloseModal() {
    setOpenModal(false);
  }
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListHome();
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [openModal]);
  return (
    <div className="flex">
      <div className="fixed">
        <SideNavigation />
      </div>
      <div className="ml-80 m-5 p-2">
        <div className="text-3xl font-bold mb-4 text-center">Home's Biển</div>
        <div className="grid grid-cols-2 gap-4">
          {data?.map((item) => (
            <div>
              <SmallHomeComponent label={item} />
            </div>
          ))}
          <div onClick={() => setOpenModal(true)}>
            <AddSmallHomeComponent />
          </div>
          <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <Modal.Header />
            <Modal.Body>
              <div className="text-3xl font-bold mb-4 text-center">
                Add new home
              </div>
              <TextInput
                id="text"
                type="text"
                required
                onChange={(event) => setNameHome(event.target.value)}
              />
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  color="failure"
                  onClick={async () => {
                    if (nameHome === "") return alert("Please enter name home");
                    else {
                      await addHome(JSON.stringify({ idHome: nameHome }));
                      setOpenModal(false);
                    }
                  }}
                >
                  {"Add new home"}
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  No, cancel
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};
