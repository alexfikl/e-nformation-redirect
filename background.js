const DEFAULT_UNIVERSITY = "UnivdeVestTM";

const ENFORMATION_URL = "https://z.e-nformation.ro/$@?action=source&sourceID=$@";
const ENFORMATION_SOURCE_IDS = {
    "www.sciencedirect.com": "ScienceDirectEbooks_AnelisPlus",
};

function transformUrl(url, callback) {
    browser.storage.sync.get({"university_id": DEFAULT_UNIVERSITY}, (items) => {
        var university_id = items["university_id"];
        var url = "https://www.e-nformation.ro";

        if (university_id) {
            if (url.hostname in ENFORMATION_SOURCE_IDS) {
                url = (
                    BASE_URL
                    .replace("$@", university_id)
                    .replace("$@", ENFORMATION_SOURCE_ID[url.hostname]));
            }
        }
        callback(url);
    });
}

browser.action.onClicked.addListener((tab) => {
    transformUrl(tab.url, (newUrl) => {
        browser.tabs.update(tab.id, {"url": newUrl});
    });
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    transformUrl(info.linkUrl, (newUrl) => {
        browser.tabs.create({"url": newUrl});
    });
});

browser.runtime.onInstalled.addListener((details) => {
    browser.storage.sync.get({"university_id": null}, (items) => {
        browser.contextMenus.create({
            "title": "Open link through e-nformation",
            "contexts": ["link"],
            "id": "redirect"
        });
    });
});

