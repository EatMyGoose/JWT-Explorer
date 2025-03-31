import React from "react";
import * as jose from 'jose'
import { is_symmetric_crypto_algorithm, jwt_encryption_algorithms_set } from "../Constants/algorithms";
import { PrettyPrintJson } from "../Util/json";
import { publicPrivateKeyMap } from "../Constants/initialSettings";

export interface IInitialJWT
{
    header: string,
    body: string,
    symmetricSecret: string,
    algorithm: string,
}

function TryDecodeHeader(jwtToken: string) : jose.ProtectedHeaderParameters | undefined
{
    try
    {
        return jose.decodeProtectedHeader(jwtToken);
    }
    catch(e)
    {
        console.error(e)
        return undefined
    }
}

function TryDecodeBody(jwtToken: string) : jose.JWTPayload | undefined
{
    try
    {
        return jose.decodeJwt(jwtToken);
    }
    catch(e)
    {
        console.error(e)
        return undefined
    }
}

function TryParseJson(str: string) : [true, any] | [false, undefined]
{
    try
    {
        return [true, JSON.parse(str)]
    }
    catch
    {
        return [false, undefined]
    }
}

async function CreateJWTTokenAsync(
    body: string, 
    headers: string, 
    symmetricSecret: string,
    asymmetricSecret: string,
    algorithm: string,
    setPrivateKeyValid: (newState: boolean) => void,
    callback: (error: boolean, token: string) => void) : Promise<void>
{
    async function _getSecret() : Promise<jose.CryptoKey | Uint8Array | undefined>
    {
        const isSymmetricAlgorithm = is_symmetric_crypto_algorithm(algorithm)
        
        if(isSymmetricAlgorithm)
        {
            return new TextEncoder().encode(symmetricSecret);
        }
        else
        {
            try
            {
                const key = await jose.importPKCS8(asymmetricSecret, algorithm);
                setPrivateKeyValid(true);
                return key;
            }
            catch(e)
            {
                console.error(e);
                setPrivateKeyValid(false);
                return undefined;
            }
        }
        
    }

    const [bodyValid, bodyObj] = TryParseJson(body);
    const [headersValid, headerObj] = TryParseJson(headers);

    if(!bodyValid || !headersValid) callback(true, "");

    const headersWithAlgorithm = {
        ...headerObj,
        alg: algorithm
    };
    
    const secretEncoded = await _getSecret();
    if(secretEncoded === undefined) return callback(true, "");

    try
    {
        const token = await new jose
            .SignJWT(bodyObj)
            .setProtectedHeader(headersWithAlgorithm)
            .sign(secretEncoded)

        return callback(false, token);
    }
    catch(e)
    {
        console.error(e);
        return callback(true, "");
    }
}

export function useJWT(initialSettings: IInitialJWT)
{
    const [jwtHeader, setJwtHeader] = React.useState<string>(initialSettings.header); 
    const [jwtHeaderValid, setJwtHeaderValid] = React.useState<boolean>(true);

    const [jwtBody, setJwtBody] = React.useState<string>(initialSettings.body);
    const [jwtBodyValid, setJwtBodyValid] = React.useState<boolean>(true);

    const [jwtSymmetricSecret, setJwtSymmetricSecret] = React.useState<string>(initialSettings.symmetricSecret);
    
    // Note - public key is in the SPKI format
    const [publicKey, setPublicKey] = React.useState<string>("");
    const [publicKeyValid, setPublicKeyValid] = React.useState<boolean>(true);
    const [privateKey, setPrivateKey] = React.useState<string>("");
    const [privateKeyValid, setPrivateKeyValid] = React.useState<boolean>(true);

    const [algorithm, setAlgorithm] = React.useState<string>(initialSettings.algorithm);
    const [signatureVerified, setSignatureVerified] = React.useState<boolean>(true);

    const [encodedJwt, setEncodedJwt] = React.useState<string>("");
    const [validEncodedJwt, setValidEncodedJwt] = React.useState<boolean>(true);

    function _setEncodedToken(error: boolean, newToken: string) : void
    {
        if(error) return;

        setEncodedJwt(newToken);
        setValidEncodedJwt(true);
        setSignatureVerified(true);
    }


    // For page load
    React.useEffect(
        () => {
            CreateJWTTokenAsync(
                initialSettings.body,
                initialSettings.header,
                initialSettings.symmetricSecret,
                "",
                initialSettings.algorithm,
                setPrivateKeyValid,
                _setEncodedToken
            )
        },
        []
    )

    async function _verifySignatureAsymmetric(publicKey: string, encodedJwt: string)
    {
        let importedKey = undefined
        try
        {
            importedKey = await jose.importSPKI(publicKey, algorithm)
            setPublicKeyValid(true)
        }
        catch
        {
            setPublicKeyValid(false)
            setSignatureVerified(false);
            return;
        }
        
        try
        {
            await jose.jwtVerify(encodedJwt, importedKey)
            setSignatureVerified(true)
        }
        catch
        {
            setSignatureVerified(false)
        }
    }

    async function onChangeJwtToken(newToken: string): Promise<void>
    {
        setEncodedJwt(newToken)

        const headersObj = TryDecodeHeader(newToken);
        if(headersObj)
        {
            setJwtHeader(PrettyPrintJson(headersObj));

            if(headersObj.alg !== undefined &&
              jwt_encryption_algorithms_set.has(headersObj.alg))
            {
                setAlgorithm(headersObj.alg)
            }
        }

        const jwtBodyObj = TryDecodeBody(newToken);
        if(jwtBodyObj)
        {
            setJwtBody(PrettyPrintJson(jwtBodyObj))
        }
        
        const tokenValid = headersObj !== undefined && jwtBodyObj !== undefined;
        setValidEncodedJwt(tokenValid)

        //Verify token
        if(is_symmetric_crypto_algorithm(algorithm))
        {
            const encodedSecret = new TextEncoder().encode(jwtSymmetricSecret);
            jose.jwtVerify(newToken, encodedSecret)
                .then(_ => setSignatureVerified(true))
                .catch(_ => setSignatureVerified(false))
        }
        else
        {
            await _verifySignatureAsymmetric(publicKey, newToken);
        }
    }

    function onChangeSymmetricSecret(newSecret: string)
    {
        setJwtSymmetricSecret(newSecret);

        CreateJWTTokenAsync(
            jwtBody,
            jwtHeader,
            newSecret,
            privateKey,
            algorithm,
            setPrivateKeyValid,
            _setEncodedToken
        )
    }

    function onChangeBody(newBody: string)
    {
        setJwtBody(newBody);
        const [validJson, _] = TryParseJson(newBody);
        setJwtBodyValid(validJson);
        
        CreateJWTTokenAsync(
            newBody,
            jwtHeader,
            jwtSymmetricSecret,
            privateKey,
            algorithm,
            setPrivateKeyValid,
            _setEncodedToken
        )
    }

    function onChangeHeaders(newHeaders: string)
    {
        setJwtHeader(newHeaders);
        const [validJson, headerObj] = TryParseJson(newHeaders);
        setJwtHeaderValid(validJson);

        if(
            validJson && 
            headerObj.alg !== undefined && 
            jwt_encryption_algorithms_set.has(headerObj.alg)
          )
        {
            setAlgorithm(headerObj.alg)
        }

        CreateJWTTokenAsync(
            jwtBody,
            newHeaders,
            jwtSymmetricSecret,
            privateKey,
            algorithm,
            setPrivateKeyValid,
            _setEncodedToken
        )
    }

    function onChangeAlgorithm(newAlgorithm: string)
    {
        setAlgorithm(newAlgorithm);

        //Add 'alg' to header
        const [validJson, headerObj] = TryParseJson(jwtHeader);
        if(validJson)
        {
            headerObj["alg"] = newAlgorithm;
            setJwtHeader(PrettyPrintJson(headerObj))
        }

        //Update with default Public & Private Keys for asymmetric algorithms
        let selectedPrivateKey: string = privateKey;
        if(!is_symmetric_crypto_algorithm(newAlgorithm))
        {
            const keyPair = publicPrivateKeyMap.get(newAlgorithm)!;
            selectedPrivateKey = keyPair.privateKey;
            setPrivateKey(keyPair.privateKey);
            setPublicKey(keyPair.publicKey);
        }

        CreateJWTTokenAsync(
            jwtBody,
            jwtHeader,
            jwtSymmetricSecret,
            selectedPrivateKey,
            newAlgorithm,
            setPrivateKeyValid,
            _setEncodedToken
        )
    }

    function onChangePrivateKey(newPrivateKey: string)
    {
        setPrivateKey(newPrivateKey);

        CreateJWTTokenAsync(
            jwtBody,
            jwtHeader,
            jwtSymmetricSecret,
            newPrivateKey,
            algorithm,
            setPrivateKeyValid,
            _setEncodedToken
        )
    }

    async function onChangePublicKey(newPublicKey: string) : Promise<void>
    {
        setPublicKey(newPublicKey);
        
        await _verifySignatureAsymmetric(newPublicKey, encodedJwt);
    }

    //Public/Private keys generated programmatically
    //Assume both keys are valid
    async function onChangeAsymmetricKey(privateKey: string, publicKey: string)
    {
        setPrivateKey(privateKey);
        setPublicKey(publicKey);

        setPublicKeyValid(true);
        setSignatureVerified(true);

        await CreateJWTTokenAsync(
            jwtBody,
            jwtHeader,
            jwtSymmetricSecret,
            privateKey,
            algorithm,
            setPrivateKeyValid,
            _setEncodedToken
        )
    }

    return {
        jwtHeader,
        jwtHeaderValid,

        jwtBody,
        jwtBodyValid,

        jwtSymmetricSecret,

        privateKey,
        privateKeyValid,

        publicKey,
        publicKeyValid,

        algorithm,
        signatureVerified,

        encodedJwt,
        validEncodedJwt,

        onChangeJwtToken,
        onChangeSymmetricSecret,
        onChangeBody,
        onChangeHeaders,
        onChangeAlgorithm,
        onChangePrivateKey,
        onChangePublicKey,
        onChangeAsymmetricKey
    }
}