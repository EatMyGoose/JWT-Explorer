// Supported by browsers
// as per Jose's documentation
// https://github.com/panva/jose/issues/263
export const jwt_encryption_algorithms: string[] = [
    'RS256', 'RS384', 'RS512',
    'PS256', 'PS384', 'PS512',
    'ES256', 'ES384', 'ES512',
    'HS256', 'HS384', 'HS512',
]

export const jwt_encryption_algorithms_set: Set<string> = new Set(jwt_encryption_algorithms)

const symmetric_encryption_algorithms: Set<string> = new Set<string>([
    'HS256', 'HS384', 'HS512',
])

export function is_symmetric_crypto_algorithm(algorithm: string) : boolean
{
    return symmetric_encryption_algorithms.has(algorithm);
}


