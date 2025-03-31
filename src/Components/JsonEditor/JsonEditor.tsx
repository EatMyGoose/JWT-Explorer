import CodeEditor from '@uiw/react-textarea-code-editor';
import styles from "./JsonEditor.module.css";
import { TAB_WIDTH } from '../../Constants/initialSettings';

export interface IJsonEditor
{
    height: string,
    warning: boolean
    value: string,
    onChange: (newValue: string) => void
}

export function JsonEditor(props: IJsonEditor)
{
    return (
        <div 
            style={{height: `${props.height}` }}
            className={`${styles.json_editor} ${props.warning? styles.warning : ""}`}
        >
            <CodeEditor         
                indentWidth={TAB_WIDTH}         
                language='json'
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                style= {{
                    fontFamily: "var(--bulma-body-family)",
                    fontSize: "var(--bulma-control-size)",
                    minHeight: "100%"
                }}
            />  
        </div>
      )
}