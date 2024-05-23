import toast from "react-hot-toast";

export class EventHandler {
    static copyPageLink() {
        if (window != null) {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Copied page link to clipboard (ctrl-c)", {
                duration: 4000
            });
        }

    }
}