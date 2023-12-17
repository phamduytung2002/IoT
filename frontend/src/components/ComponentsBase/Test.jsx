import { Button } from "flowbite-react";
import { Avatar } from "flowbite-react";
import React from "react";
export default function MyPage() {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button>Click me</Button>

        <Avatar
          size={"lg"}
          img="https://cdn-i.vtcnews.vn/upload/2023/08/03/3642625617402519181115964418899524451642231n-13524500.jpg"
          alt="avatar of Jese"
          rounded
        />
      </div>
    </div>
  );
}
