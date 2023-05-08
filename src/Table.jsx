
import { tableJson } from "./config/table";
import { renderChild } from "./renderer";

  export const CustomTable = () => {
    return <div>{renderChild(tableJson)}</div>
  }

  