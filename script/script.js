/*------------------------------------------------------*
    *   Disney ID UIv2 (Lightbox) Integration Sample 
    * - * - * - * - * - * - * - * - * - * - * - * - *
    *   For More Info, please ready the documentation @
    *   https://devcentraldocs.disney.com/pages/releaseview.action?pageId=23658548
*------------------------------------------------------*/
// Create oneid account
class OneIDAccount {

    // Constructor
    constructor(params) {
        this.params = params;
        this.initUI();
    }

    // Generate instance account
    getInstance() {
        if (this.oneId !== undefined) {
            return this.oneId;
        }
        this.oneId = DisneyID.get({
            // Put your client ID here.  Append the environment to your client id (-STAGE || -PROD)
            clientId: this.params.clientId
            // site hosted using HTTPS
            // Responder page is required.
            , responderPage: this.params.responderPage
            // CSS File to override default lightbox styles (HTTPS Only)
            // CSS file must be on a publicly accessible https URL
            //, cssOverride: this.params.cssOverride
        })
        // Init ondeid instance
        this.oneId.init();
        console.log("this.oneId:,", this.oneId);
        // Add listners to oneid
        this.addEventListners(this.oneId);
        return this.oneId;
    }

    // LaunchLogin
    launchLogin(cb) {
        this.getInstance().launchLogin().then((data) => {
            if (cb) {
                cb(data);
            }
        }).catch((err) => {
            console.log("err:", err);
            window.location.href = '/profile';
        });
    }

    // Launch create account
    launchCreateAccount(cb) {
        this.getInstance().launchRegistration().then((data) => {
            if (cb) {
                cb(data);
            }
        }).catch((err) => {
            window.location.href = '/profile';
        });
    }

    // Launch profile account 
    launchProfileAccount(cb) {
        this.getInstance().launchProfile().then((data) => {
            if (cb) {
                cb(data);
            }
        }).catch((err) => {
            window.location.href = '/login';
        });
    }

    // Launch logout account 
    launchLogoutAccount(cb) {
        this.getInstance().logout().then((data) => {
            if (cb) {
                cb(data);
            }
        }).catch((err) => {
            window.location.href = '/login';
        });
    }

    // Launch recover user name 
    launchRecoverUsername(cb) {
        this.getInstance().launchRecoverUsername().then((data) => {
            if (cb) {
                cb(data);
            }
        }).catch((err) => {
            //window.location.href = '/login';
        });
    }

    // Do Action
    doActionAccount(type, cb) {
        switch (type) {
            case "login":
                this.launchLogin(cb);
                break;
            case "create":
                this.launchCreateAccount(cb);
                break;
            case "profile":
                this.launchProfileAccount(cb);
                break;
            case "logout":
                this.launchLogoutAccount(cb)
                break;
            case "recover":
                this.launchRecoverUsername(cb);
                break;
            default:
                console.error("You have to set type of action");
                break;
        }
    }

    // EventListners
    addEventListners(oneId) {
        oneId.on('login', (data) => {
            console.log("data:", data);
            //window.postMessage("loggedin")
            window.location.href = '/profile';
        });
        oneId.on('logout', (data) => {
            console.log("logout", data);
            //window.postMessage("logout")
            window.location.href = '/login';
        });
        oneId.on('error', (error) => {
            //console.log("error", JSON.parse(error));
            console.log("error", error);
            alert(error);
            //window.postMessage("error")
        });
        oneId.on('done', (error) => {
            // this.initUI();
        });
        // to remove
        oneId.setDebug();
    }

    // Override ui of ondeid 
    initUI() {
        //var iframe = document.getElementById('disneyid-iframe');
        //innerDoc = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
        //console.log("innerDoc:,", innerDoc);
    }

}