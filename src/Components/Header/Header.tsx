import styles from "./Header.module.css"

export interface IAppHeader
{
    isWednesday: boolean
}

export function AppHeader(props: IAppHeader)
{
    return (
        <div className={`${styles.header_block_bg} ${styles.drop_shadow} block`}>
            <div className='container pt-3 pb-3 is-flex align-items-center is-flex is-justify-content-space-between'>
                <h1 className="mb-0 title is-3 has-text-white is-flex" >
                    <div 
                        className={`${styles.text_shadow} ${styles.header_text}`}
                    >
                        JWT Explorer
                    </div>
                    <figure 
                        className={`image is-48x48 ${styles.header_icon_bg} ${styles.rounded} ${styles.icon_margin}`}
                    >
                        <img 
                            src="/edit.svg"
                            className={styles.img_drop_shadow}
                        />
                    </figure>
                </h1>
                {
                    props.isWednesday && (
                        <h1 className="mb-0 title is-3 has-text-white is-flex">
                            <figure 
                                className={`image is-48x48 ${styles.drop_shadow} ${styles.drop_shadow_dark} ${styles.icon_margin}`}
                            >
                                <img 
                                    src="/frogge.png"
                                    className={`${styles.rounded} ${styles.wiggle}`}
                                />
                            </figure>
                            <div 
                                className={`${styles.text_shadow} ${styles.header_text}`}
                            >
                                It is Wednesday my dudes
                            </div>
                        </h1>
                    )
                }
            </div>
        </div>
    )
}