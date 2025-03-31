import styles from "./Header.module.css"

export function AppHeader()
{
    return (
        <div className={`${styles.header_block_bg} ${styles.drop_shadow} block`}>
            <div className='container pt-3 pb-3 is-flex align-items-center'>
                <h1 className="mb-0 title is-3 has-text-white is-flex" >
                    <div 
                        className={styles.text_shadow}
                        style={{marginTop: "0.1em", marginRight: "0.2em"}}
                    >
                        JWT Explorer
                    </div>
                    <figure 
                        className={`image is-48x48 ${styles.header_icon_bg}`}
                    >
                        <img 
                            src="/edit.svg"
                            className={styles.img_drop_shadow}
                        />
                    </figure>
                </h1>
            
            </div>
        </div>
    )
}