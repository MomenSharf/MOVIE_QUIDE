import {  Spinner } from "@nextui-org/react";

export default function loading() {


  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Spinner size="lg" color="primary"/>
    </div>
  )
}
