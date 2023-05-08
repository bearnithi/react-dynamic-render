import { formJson } from "./config/form";
import { renderChild } from "./renderer";

export const CustomForm = () => {
    return <div>{renderChild(formJson)}</div>
}