type TStringAction = (newValue:string) => void

export interface ISecretInput
{
    isSymmetricAlgorithm: boolean;

    symmetricSecret: string;
    onSymmetricSecretChanged: TStringAction;

    publicKey: string;
    publicKeyValid: boolean;
    onPublicKeyChanged: TStringAction
    privateKey: string;
    privateKeyValid: boolean;
    onPrivateKeyChanged: TStringAction
}

const textAreaSettings = {
    spellCheck: false,
    autoComplete: "off",
    autoCapitalize: "off",
    autoCorrect: "off",
}

export function SecretInput(props: ISecretInput)
{
    if(props.isSymmetricAlgorithm)
    {
        return(
            <div className='field'>
              <label className='label'>Secret</label>
              <textarea 
                {...textAreaSettings}
                className={`textarea has-fixed-size`}
                rows={2} 
                value={props.symmetricSecret}
                onChange={(e) => props.onSymmetricSecretChanged(e.target.value)}
              >
              </textarea>
            </div>
        )
    }   
    else
    {
        return(
            <>
                <div className='field'>
                    <label className='label'>Public Key</label>
                    <textarea 
                        {...textAreaSettings}
                        className={`textarea has-fixed-size ${!props.publicKeyValid? "is-warning": ""}`}
                        rows={5} 
                        value={props.publicKey}
                        onChange={(e) => props.onPublicKeyChanged(e.target.value)}
                    >
                    </textarea>
                </div>
                <div className='field'>
                    <label className='label'>Private Key</label>
                    <textarea 
                        {...textAreaSettings}
                        className={`textarea has-fixed-size ${!props.privateKeyValid? "is-warning": ""}`}
                        rows={5} 
                        value={props.privateKey}
                        onChange={(e) => props.onPrivateKeyChanged(e.target.value)}
                    >
                    </textarea>
                </div>
            </>
        )
    }
}