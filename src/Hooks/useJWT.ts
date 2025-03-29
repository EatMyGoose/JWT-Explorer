import React from "react";
import * as jose from 'jose'
import { jwt_encryption_algorithms_set } from "../Constants/algorithms";

export interface IInitialJWT
{
    header: string,
    body: string,
    secret: string
    algorithm: string
}

function PrettyPrintJson(obj: any) : string
{
    return JSON.stringify(obj, null, 2);
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
    catch(e)
    {
        return [false, undefined]
    }
}

function CreateJWTTokenAsync(
    body: string, 
    headers: string, 
    secret: string,
    algorithm: string,
    callback: (error: boolean, token: string) => void) : void
{
    const secretEncoded = new TextEncoder().encode(secret);

    const [bodyValid, bodyObj] = TryParseJson(body);
    const [headersValid, headerObj] = TryParseJson(headers);

    if(!bodyValid || !headersValid) callback(true, "");

    const headersWithAlgorithm = {
        ...headerObj,
        alg: algorithm
    };

    (
        new jose
            .SignJWT(bodyObj)
            .setProtectedHeader(headersWithAlgorithm)
            .sign(secretEncoded)
    )
        .then(token => {
            console.log(token)
            callback(false, token)
        })
        .catch(e => {
            console.error(e)
            callback(true, "")
        })
}

export function useJWT(initialSettings: IInitialJWT)
{
    const [jwtHeader, setJwtHeader] = React.useState<string>(initialSettings.header); 
    const [jwtHeaderValid, setJwtHeaderValid] = React.useState<boolean>(true);

    const [jwtBody, setJwtBody] = React.useState<string>(initialSettings.body);
    const [jwtBodyValid, setJwtBodyValid] = React.useState<boolean>(true);

    const [jwtSecret, setJwtSecret] = React.useState<string>(initialSettings.secret);

    const [algorithm, setAlgorithm] = React.useState<string>(initialSettings.algorithm);
    const [signatureVerified, setSignatureVerified] = React.useState<boolean>(true);

    const [encodedJwt, setEncodedJwt] = React.useState<string>();
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
                initialSettings.secret,
                initialSettings.algorithm,
                _setEncodedToken
            )
        },
        []
    )

    function onChangeJwtToken(newToken: string): void
    {
        const headersObj = TryDecodeHeader(newToken);
        if(headersObj)
        {
            setJwtHeader(PrettyPrintJson(headersObj));

            if(headersObj.alg !== undefined &&
              jwt_encryption_algorithms_set.has(headersObj.alg))
            {
                console.log("setting algo")
                setAlgorithm(headersObj.alg)
            }
        }

        const jwtBodyObj = TryDecodeBody(newToken);
        if(jwtBodyObj)
        {
            setJwtBody(PrettyPrintJson(jwtBodyObj))
        }

        const encodedSecret = new TextEncoder().encode(jwtSecret);
        jose.jwtVerify(newToken, encodedSecret)
            .then(_ => setSignatureVerified(true))
            .catch(_ => setSignatureVerified(false))

        setEncodedJwt(newToken)

        const tokenValid = headersObj !== undefined && jwtBodyObj !== undefined;
        setValidEncodedJwt(tokenValid)
    }

    function onChangeSecret(newSecret: string)
    {
        setJwtSecret(newSecret);

        CreateJWTTokenAsync(
            jwtBody,
            jwtHeader,
            newSecret,
            algorithm,
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
            jwtSecret,
            algorithm,
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
            jwtSecret,
            algorithm,
            _setEncodedToken
        )
    }

    function onChangeAlgorithm(newAlgorithm: string)
    {
        setAlgorithm(newAlgorithm);
        const [validJson, headerObj] = TryParseJson(jwtHeader);
        if(validJson)
        {
            headerObj["alg"] = newAlgorithm;
            setJwtHeader(PrettyPrintJson(headerObj))
        }

        CreateJWTTokenAsync(
            jwtBody,
            jwtHeader,
            jwtSecret,
            newAlgorithm,
            _setEncodedToken
        )
    }

    return {
        jwtHeader,
        jwtHeaderValid,

        jwtBody,
        jwtBodyValid,

        jwtSecret,
        algorithm,
        signatureVerified,

        encodedJwt,
        validEncodedJwt,

        onChangeJwtToken,
        onChangeSecret,
        onChangeBody,
        onChangeHeaders,
        onChangeAlgorithm
    }
}