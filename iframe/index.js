const BirrionSDK = (function () {
    return {
        iframe: "",
        loading: false,
        baseurl: "https://checkout.thebittle.com/",
        elementId: "birrion-widget",
        publicKey: "",
        refLocation: "",
        makeNewFrame: function () {
            // loading started
            this.loading = true;
            var frameId = this.generateFrameId();
            var user = document.location.href;
            var token = this.publicKey;
            var widgetsource =
                this.baseurl +
                "?frame=" +
                frameId +
                "&key=" +
                this.publicKey +
                "&host=" +
                user +
                "";
            // Setup Iframe
            var ifrm = document.createElement("IFRAME");
            ifrm.setAttribute("src", widgetsource);
            var style = {
                "z-index": "999999",
                display: "none",
                background: "rgba(0, 0, 0, 0.004)",
                border: "0px none transparent",
                overflow: "hidden",
                visibility: "visible",
                margin: "0px",
                padding: "0px",
                position: "fixed",
                left: "0px",
                top: "0px",
                width: "100%",
                height: "100%",
            };

            Object.assign(ifrm.style, style);
            ifrm.marginwidth = "0";
            ifrm.marginheight = "0";
            ifrm.frameBorder = "0";
            ifrm.vspace = "0";
            ifrm.id = ifrm.name = frameId;

            // Place iframe on DOM
            this.refLocation.parentNode.insertBefore(ifrm, this.refLocation);
            // save a reference
            this.iframe = ifrm;
        },
        generateFrameId: function () {
            for (
                var text = "",
                possible =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                i = 0;
                i < 5;
                i++
            )
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        },
        init: function (publicKey = null, setup = null) {
            if (publicKey == null) return;
            else this.publicKey = publicKey;

            if (document.getElementById(this.elementId) == null) {
                alert("Element with id: birrion-widget not found");
                return;
            }
            this.listenForCloseEvent();
            this.refLocation = document.getElementById(this.elementId);
            this.makeNewFrame();
            return this;
        },
        listenForCloseEvent: function () {
            var _this = this;
            var close = function (e) {
                // A better validation should be made to ensure that the event is coming from cclan.
                // Otherwise, code from other authors could unknowingly close the modal.
                if (e.data === "birrion-close") {
                    _this.close();
                } else if (e.data === "birrion-frame-loaded") {
                    _this.loaded();
                }
            };
            if (window.addEventListener) {
                window.addEventListener("message", close, false);
            } else {
                window.attachEvent("onmessage", close);
            }
        },

        close: function () {
            this.iframe.style.display = "none";
            this.iframe.remove();
        },
        open: function () {
            if (!this.publicKey) {
                alert("Error occurred setting up application.");
                return;
            }
            this.iframe.style.display = "block";
        },
    };
})();
s