import { PrettyPrintJson } from "../Util/json";

export const TAB_WIDTH = 2;

export const DEFAULT_ALGORITHM = "HS256"

export const DEFAULT_HEADER = PrettyPrintJson(
    {
        alg: DEFAULT_ALGORITHM,
        typ: "JWT"
    }
);
    

export const DEFAULT_BODY = PrettyPrintJson(
    {
        "name": "John Doe",
    }
)

export const DEFAULT_SECRET = "a-very-secure-secret"
