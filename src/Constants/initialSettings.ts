export const DEFAULT_ALGORITHM = "HS256"

export const DEFAULT_HEADER = JSON.stringify(
    {
        alg: DEFAULT_ALGORITHM,
        typ: "JWT"
    },
    null,
    2
)

export const DEFAULT_BODY = JSON.stringify(
    {
        "name": "John Doe",
    },
    null,
    2
)

export const DEFAULT_SECRET = "a-very-secure-secret"
