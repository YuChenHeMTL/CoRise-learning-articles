import { Sandbox } from "../types";

export default function Sandbox(data: Object) {
    let content = data as Sandbox

    // returning an iframe with the sandbox url
    return (
        <iframe src={content.url} width="100%" height="500rem" allowFullScreen></iframe>
    )
}