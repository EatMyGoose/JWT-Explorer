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

export const DEFAULT_PUBLIC_KEY = (
`-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHhGjlGriA9q1S8IUGvXLSvdm0It
UqVNP1yfIRkztKs+E7s6NS/W7U/tNhaotQ5AiRtVwFIpjxqMPQBLrqmyHkeOPmPl
gZO1Jq282U8uhFfEZ+Y9QYexZFCzckN+j8ZovPSU2a9ni+4OhpC7O+3ounsuhNYA
oi5zn0UxakMJEaRHAgMBAAE=
-----END PUBLIC KEY-----`
)

export const DEFAULT_PRIVATE_KEY = (
`-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgHhGjlGriA9q1S8IUGvXLSvdm0ItUqVNP1yfIRkztKs+E7s6NS/W
7U/tNhaotQ5AiRtVwFIpjxqMPQBLrqmyHkeOPmPlgZO1Jq282U8uhFfEZ+Y9QYex
ZFCzckN+j8ZovPSU2a9ni+4OhpC7O+3ounsuhNYAoi5zn0UxakMJEaRHAgMBAAEC
gYA+FnYLVNf01XpdQBZ7xOVNmqU2IT1jlZ/ayU6FuvpN18rJwL+KBZIVy2c7hTWJ
uOjOEpMoFsoHs1MeHvN4KDmWkBFcqeYQiSd/mVzNbMQPQBg1j9ewnqscKp0g1pru
Jya5g5/bLDTIkweHYyy4oYAXdtSk6jWb/6vN/1F8PEOH+QJBANUR6Bu0lOitnBWH
QzUED1Sk93SDbdICKqXUsB+vh4KwkB9Nz9hzNdt2cymhJPI6s6IssmHXWJRTn/ah
9UbhPZUCQQCQgldOQYoRcjMxEzwJOrJMTnTF5y3PGehS0FET8vQFtbMV4ZoEfeCO
SkuSKeyf5YqFUE8njBSdqw2QFPQZSYtrAkEAlb6G/Om1+a0B1FOC1UCsMZXa38T6
qqyhInjO6wXm29+Q+p8qIvodcMbXevtoxuCgnKqDF6ZL97qp4qDCi/UC3QJAMaFS
MsI3lP5Pro8Yk2LhUWuwlzdqeDJBpA9/iQZr4Hoi42Tz7I7+zF+fzLcxWUkQZfDK
/p4RhoT0x4MqwnSLuQJAXVXw0/3qwRhCL7s5bZnubVhzLX+2S5rYCZU29QRmG+n0
Fo2a7nQAQpKnOrM+CaLWPJbrvpNU8MPSZCTBlg4A0A==
-----END RSA PRIVATE KEY-----`
)

type TPublicPrivateKey = {
    privateKey: string,
    publicKey: string
}

const _2048RsaKey: TPublicPrivateKey = {
    privateKey: (
`-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCo1ZGOCXoDtfTQ
ZGeeSeKStHWsr9DxOajnaDxBZaZTGtbCF5/B+OaOhDqtQ/mAosrCmyWstQ7icK73
zqRxzk0cLG1RhVTbczhaEdf2Sp2gSytR9nA+TWYPtXNxtKEPQ7H4ajpYhJKCxDuZ
6dYqsK0FAkj5j6ploKhSfEzayAnIHb4jxcXmZ2Y3BnEhYq4TDMaodZsv+qTnc6nM
zIKuShbU+eiHp7JZURmNpfa220OaZqu0p4VE6X/TbThPkW/N32+BuAP5OryrfYyt
fvfM4k4EFh+NJa3yVDLyKnj+F0Rc9JrD6bC/+z2m9fOUnaWmGKdc95hCV2GWbke3
dTrE1jxnAgMBAAECgf9BHpCT2XKxnOUvCdbajAO7iInavAhyyWvEky1VKHeDSnf8
sK4wSLPnAen+sXuKk9dU/1Lw/nMLHLcwWLyP5lfEmRJOve8ZYDsZnuS21+rXwr41
F7v6XsOWjeFOfs68yKHcS0Knn0tCGz6o73VMthrDmu6dnxfhJGImsOc/oVCWUC8e
+WYmxNmPXAsrTIiEF8cCs7FmhC/L0va6fM26SHLL2Lhg7VNlTGV13AyRBriI468d
QsssqB9pZdeln+CC3k96sFs/+eR34Ockub86wnICPG7/FKlenunN3S8x4XBQRuGC
yKXj34AVVPNWWRT2J1OzlJ1UGIi29hKXpCJ3IkECgYEA1QLsvd+Jqbh6mLe1tP9B
oRjRcU+xz+cLsIcSMooBtqGsGRbqMwwGV/KsKkGEsM8+UNFm+9mEeSLjB6lHsrD+
u440Xo0DOFne6kAHTlwMWheHppax830+3WlPb4RjBYhuB87EQ7YNIFMsjDlWE6xy
sZkh94eL5pUw1ccA6C4AWzcCgYEAyuhDbAvO2WivojqZlFkJL5FHgDltn5HzWcjI
ZLWI1NsoRSh8AdNzoCRlFLdNqpfuXZEaLH3pcOgh6+BTCfbXFS+5E9Ej2NHs5FbP
CihFzKzCI5IeMYMK/4w3ut8IcsF7aUHf4HDcfXbi9FA7JxDym350+frTU6VnxFVA
47GBoFECgYEAhHXnJkPF5YbUpfdHxaAd/cHjLGV0m2Z//GxiQo9TdXCgBpIbXVcS
8snzietoSlL122f8dIzVNkcdivwXm+U44wURR+LEp9wrJNxgLrhK7hNHxa5cRqAR
4bnFLgHTWfN3CN/paHnjO8C9KQ3WmzFXuV0SpEzkEKWh0q6Hv9orWo0CgYA95ldT
KdMDnh0ed5QMnpDf0wkmA97+dA7yD/+aQYsprGX/mxchk3lNnGy9wiHObiUIpFCA
zDSf/iEDDV8nxgbdbr6eXgn6hignjJgCuEB67SUYpuXRIvIC/aqutoWkRIQ6mx8K
IEQTfmZENAmnpFLuvsg+zpcTiH08dumhzLAH0QKBgQCQ5T+WP2rS6+oxLdrh7Afc
9oIKHEoagkFbIQKfvkR904XF3jndjsxqyuWWpCM3MNIpAamUSq+YUMGDTaiq+zFv
MLKujY+xWZrrmcUNmuAhA2fjZBMd+gzUqX0ayr0zg3kJcJ5uKvecxyBx8VkoACO3
LR2kpT7315ja9G0sJVWqHA==
-----END PRIVATE KEY-----`
),
    publicKey: (
`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqNWRjgl6A7X00GRnnkni
krR1rK/Q8Tmo52g8QWWmUxrWwhefwfjmjoQ6rUP5gKLKwpslrLUO4nCu986kcc5N
HCxtUYVU23M4WhHX9kqdoEsrUfZwPk1mD7VzcbShD0Ox+Go6WISSgsQ7menWKrCt
BQJI+Y+qZaCoUnxM2sgJyB2+I8XF5mdmNwZxIWKuEwzGqHWbL/qk53OpzMyCrkoW
1Pnoh6eyWVEZjaX2tttDmmartKeFROl/0204T5Fvzd9vgbgD+Tq8q32MrX73zOJO
BBYfjSWt8lQy8ip4/hdEXPSaw+mwv/s9pvXzlJ2lphinXPeYQldhlm5Ht3U6xNY8
ZwIDAQAB
-----END PUBLIC KEY-----`
)
}

const _P256EllipticKey = {
    privateKey: (
`-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgCSxpZTu8a/ZbQE5B
tEgcaiL/9hBDDpAHDvDbXbH6x7ihRANCAARZHidhOBOQWuR9k+DiQBWZdItJmg4n
KjkCe3lXRin9P1TE4S7EiPUdFAJkURufa4eE0Ycg7HpO9DDVQvJRaD9T
-----END PRIVATE KEY-----`
),
    publicKey: (
`-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEWR4nYTgTkFrkfZPg4kAVmXSLSZoO
Jyo5Ant5V0Yp/T9UxOEuxIj1HRQCZFEbn2uHhNGHIOx6TvQw1ULyUWg/Uw==
-----END PUBLIC KEY-----`
)
} 

const _P384EllipticKey = {
    privateKey: (
`-----BEGIN PRIVATE KEY-----
MIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDBKGdo7WWKZ7YBm+C/d
o7w6iusYrgzo/oy0HrN4I18T8jFdD/f/cvOgAmXdF1PGCZahZANiAASN5n4ZNbSD
PtHgwJAZHiqIKTmWrRewslWqxSuiT4tChi+Whlry8fldvIQexhLyGgDWn4TYNGqh
mZ0SXmNOC7V+k1MGSDy+XGnzlqAfKnlncCkB0m86TSrarLwbDanyOiE=
-----END PRIVATE KEY-----`
),
    publicKey: (
`-----BEGIN PUBLIC KEY-----
MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEjeZ+GTW0gz7R4MCQGR4qiCk5lq0XsLJV
qsUrok+LQoYvloZa8vH5XbyEHsYS8hoA1p+E2DRqoZmdEl5jTgu1fpNTBkg8vlxp
85agHyp5Z3ApAdJvOk0q2qy8Gw2p8joh
-----END PUBLIC KEY-----`
)
} 

const _P521EllipticKey = {
    privateKey: (
`-----BEGIN PRIVATE KEY-----
MIHuAgEAMBAGByqGSM49AgEGBSuBBAAjBIHWMIHTAgEBBEIBNrdi+2LfgK9WAaMM
ldG+K0GKNYA+SvHNZi0mvKcQlcWrsNqpx8+xN1XQ+bVAi/9vmh5H3CNmK2G4XS0l
lAUT7M+hgYkDgYYABACnA2CWZFFbzu6y2moGKyz5+XHPm+cFR4ZFxOY+3WcRw8FF
i/dwahKEraaAX6xvAZkSOpu+YC6MXwJCGcu/FLGqOAEYcb8q08edeinHERvmJtM9
zEsdtNEO/iNuI1Yz8e1sDifmNcjMD8td3aSiqkGkw68njZG/swsAlu/Sk9SMoVSB
zQ==
-----END PRIVATE KEY-----`
),
    publicKey: (
`-----BEGIN PUBLIC KEY-----
MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQApwNglmRRW87ustpqBiss+flxz5vn
BUeGRcTmPt1nEcPBRYv3cGoShK2mgF+sbwGZEjqbvmAujF8CQhnLvxSxqjgBGHG/
KtPHnXopxxEb5ibTPcxLHbTRDv4jbiNWM/HtbA4n5jXIzA/LXd2koqpBpMOvJ42R
v7MLAJbv0pPUjKFUgc0=
-----END PUBLIC KEY-----`
)
} 

export const publicPrivateKeyMap: Map<string, TPublicPrivateKey> = new Map<string, TPublicPrivateKey>(
    [
        ["PS256", _2048RsaKey],
        ["PS384", _2048RsaKey],
        ["PS512", _2048RsaKey],
        ["RS256", _2048RsaKey],
        ["RS384", _2048RsaKey],
        ["RS512", _2048RsaKey],

        ["ES256", _P256EllipticKey],
        ["ES384", _P384EllipticKey],
        ["ES512", _P521EllipticKey],
    ]
)