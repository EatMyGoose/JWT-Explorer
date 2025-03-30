import { TAB_WIDTH } from "../Constants/initialSettings";

export function PrettyPrintJson(obj: any) : string
{
    return JSON.stringify(obj, null, TAB_WIDTH);
}
