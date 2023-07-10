import { Sandbox } from "../types";

export default function getSandbox(data: Object) {
    let content = data as Sandbox
    return (
        <iframe src={content.url} width="100%" height="500rem" allowFullScreen></iframe>
    )
}