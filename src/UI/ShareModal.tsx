import { Cancel, CheckCircledOutline, Copy, Mail, MessageText, Pinterest, Telegram, Twitter } from "iconoir-react";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { encodeGridState } from "../utils/compresser";
import styles from "./ShareModal.module.css";

export const SHAREICONPROPS = {
    width: "100%",
    strokeWidth: "1.5px",
    color: "black"
}

const ShareModal = (props: { onClose: () => void }) => {
    const grid = useAppSelector(state => state.grid.present);
    const [copiedClipboard, setCopiedClipboard] = useState(false)
    const encoded = encodeGridState(grid);
    const urlString = window.location.origin + "/" + encoded;

    const handleShare = (shareType: string) => {
        switch (shareType) {
            case "Clipboard":
                navigator.clipboard.writeText(urlString);
                setCopiedClipboard(true)
                setTimeout(function () {
                    setCopiedClipboard(false)
                    props.onClose()
                }, 1000);
                break;
            //list social url : https://crunchify.com/list-of-all-social-sharing-urls-for-handy-reference-social-media-sharing-buttons-without-javascript/
            case "WhatsApp":
                window.open("https://api.whatsapp.com/send?text=" + urlString)
                props.onClose()
                break;
            case "Telegram":
                window.open("https://t.me/share/url?url=" + urlString)
                props.onClose()
                break;
            case "Twitter":
                window.open("https://twitter.com/share?url=" + urlString)
                props.onClose()
                break;
            case "Gmail":
                window.open("https://mail.google.com/mail/?view=cm&fs=1&tf=1&body=" + urlString + "+'&ui=2&tf=1&pli=1';")
                props.onClose()
                break
            case "Pinterest":
                window.open("https://pinterest.com/pin/create/bookmarklet/?url=" + urlString)
                props.onClose()
                break;
        }
    }
    //no whatsapp icon in iconoir
    return (
        <div className={styles.modalContainer}>
            <div className={styles.shareModal}>
                {copiedClipboard
                    ? <div className={styles.copiedClipboard}><CheckCircledOutline /> Copied to the clipboard</div>
                    : <div className={styles.modalBody}>
                        <div className={styles.buttonsContainer}>
                            <div className={styles.buttonsBox}><ShareModalButton onClick={() => handleShare("WhatsApp")} title={"WhatsApp"}> <MessageText {...SHAREICONPROPS} /> </ShareModalButton></div>
                            <div className={styles.buttonsBox}><ShareModalButton onClick={() => handleShare("Telegram")} title={"Telegram"}> <Telegram {...SHAREICONPROPS} /> </ShareModalButton></div>
                            <div className={styles.buttonsBox}><ShareModalButton onClick={() => handleShare("Twitter")} title={"Twitter"}> <Twitter {...SHAREICONPROPS} /> </ShareModalButton></div>
                            <div className={styles.buttonsBox}><ShareModalButton onClick={() => handleShare("Gmail")} title={"Gmail"} > <Mail {...SHAREICONPROPS} /> </ShareModalButton></div>
                            <div className={styles.buttonsBox}><ShareModalButton onClick={() => handleShare("Pinterest")} title={"Pinterest"}> <Pinterest {...SHAREICONPROPS} /> </ShareModalButton></div>
                        </div>
                        <div className={styles.clipboardBox}>
                            <input type="text" defaultValue={urlString} className={styles.url}/>
                            <div className={styles.buttonsBox}><ShareModalButton onClick={() => handleShare("Clipboard")} title={""}> <Copy {...SHAREICONPROPS} /></ShareModalButton></div>
                        </div>
                        <div className={styles.closeShareModal} onClick={props.onClose} title={""}> <Cancel color="black" strokeWidth="2px" /> </div>
                    </div>
                }
            </div>
            <div className={styles.closeShareModalArea} onClick={props.onClose}></div>
        </div >
    );
}

export const ShareModalButton = (props: { title: string; onClick: React.MouseEventHandler, children: React.ReactNode; }) => {
    return (
        <button className={styles.shareModalButton} onClick={props.onClick} title={props.title}>
            <div className={styles.shareContainer}>
                <div className={styles.iconBox}>
                    {props.children}
                </div>
                <div className={styles.iconNameBox}>
                    {props.title}
                </div>
            </div>
        </button>
    );
}

export { ShareModal };
