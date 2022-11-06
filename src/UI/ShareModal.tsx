import { MessageText, Telegram, Twitter, Pinterest, Copy, Mail, Cancel, CheckCircledOutline } from "iconoir-react";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleSound } from "../store/ui";
import RoundButton from "../UI/RoundButton";
import styles from "./ShareModal.module.css";
import { encodeGridState } from "../utils/compresser";
import { wait } from "@testing-library/user-event/dist/utils";

export const SHAREICONPROPS = {
    width: "50%",
    height: "50%",
    strokeWidth: "1.5px",
    color: "black"
}

const ShareModal = (props: { onClose: () => void }) => {
    const grid = useAppSelector(state => state.grid.present);
    const [copiedClipboard, setCopiedClipboard] = useState(false)

    const handleShare = (shareType: string) => {
        const encoded = encodeGridState(grid);
        const urlString = window.location.origin + "/" + encoded;

        console.log(shareType)
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
        <div className={styles.shareModal} >
            <div className={styles.modalBody}>
                {copiedClipboard
                    ? <div className={styles.copiedClipboard}><CheckCircledOutline color="green" strokeWidth="1px" /> Copied to the clipboard</div>
                    : <div className={styles.buttonsContainer}>
                        <div> <ShareModalButton onClick={() => handleShare("Clipboard")} title={"Copy link"}> <Copy {...SHAREICONPROPS} /></ShareModalButton></div>
                        <div><ShareModalButton onClick={() => handleShare("WhatsApp")} title={"WhatsApp"}> <MessageText {...SHAREICONPROPS} /> </ShareModalButton></div>
                        <div><ShareModalButton onClick={() => handleShare("Telegram")} title={"Telegram"}> <Telegram {...SHAREICONPROPS} /> </ShareModalButton></div>
                        <div><ShareModalButton onClick={() => handleShare("Twitter")} title={"Twitter"}> <Twitter {...SHAREICONPROPS} /> </ShareModalButton></div>
                        <div><ShareModalButton onClick={() => handleShare("Gmail")} title={"Gmail"} > <Mail {...SHAREICONPROPS} /> </ShareModalButton></div>
                        <div><ShareModalButton onClick={() => handleShare("Pinterest")} title={"Pinterest"}> <Pinterest {...SHAREICONPROPS} /> </ShareModalButton></div>
                    </div>
                }
                <div className={styles.closeShareModal} onClick={props.onClose} title={""}> <Cancel color="black" strokeWidth="2px" /> </div>
            </div>
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