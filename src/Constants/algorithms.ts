// Supported by browsers
// as per Jose's documentation
// https://github.com/panva/jose/issues/263
export const jwt_encryption_algorithms: string[] = [
    'RS256', 'RS384', 'RS512',
    'PS256', 'PS384', 'PS512',
    'ES256', 'ES384', 'ES512',
    'EdDSA', 'Ed25519',
    'HS256', 'HS384', 'HS512',
]

export const jwt_encryption_algorithms_set: Set<string> = new Set(jwt_encryption_algorithms)