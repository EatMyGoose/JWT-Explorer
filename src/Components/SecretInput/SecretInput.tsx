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

    onGenerateNewKey: () => Promise<void>
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
                    <div className="is-flex is-justify-content-space-between is-align-items-end">
                        <label className='label'>Public Key</label>
                        <button 
                            className="mb-3 button is-small is-primary is-dark"
                            onClick={() => props.onGenerateNewKey()}
                        >
                                Generate New Pair
                        </button>
                    </div>
                    <textarea 
                        {...textAreaSettings}
                        className={`textarea has-fixed-size ${!props.publicKeyValid? "is-warning": ""}`}
                        rows={4} 
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
                        rows={4} 
                        value={props.privateKey}
                        onChange={(e) => props.onPrivateKeyChanged(e.target.value)}
                    >
                    </textarea>
                </div>
            </>
        )
    }
}