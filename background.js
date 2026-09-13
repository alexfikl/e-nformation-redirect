// {{{ resources

// NOTE: the order matters here: the first match is chosen even if subsequent
// matches could be found. Should put more specific regexes first!
//
// NOTE: every resource is redirected through the e-nformation gateway using
// its `sourceID`. The original URL is passed verbatim in the `qurl` query param.
const ENFORMATION_GATEWAY =
    "https://z.e-nformation.ro/UnivdeVestTM?action=source&sourceID=";

const ENFORMATION_RESOURCES = [
    {
        name: "ACS_AnelisPlus",
        matchPattern: /^https:\/\/pubs\.acs\.org\//,
    },
    {
        name: "AIP_AnelisPlus",
        matchPattern: /^https:\/\/pubs\.aip\.org\//,
    },
    {
        name: "APS_AnelisPlus",
        matchPattern: /^https:\/\/journals\.aps\.org\//,
    },
    {
        name: "AppliedScienceCO_trial",
        matchPattern: /^https:\/\/appliedsciencecommons\.net\//,
    },
    {
        name: "POCO_trial",
        matchPattern: /^https:\/\/policycommons\.net\//,
    },
    {
        name: "CabiDL_AnelisPlus",
        matchPattern: /^https:\/\/www\.cabidigitallibrary\.org\//,
    },
    {
        name: "CEEOL_AnelisPlus",
        matchPattern: /^https:\/\/www\.ceeol\.com\//,
    },
    {
        name: "ScienceDirectEbooks_AnelisPlus",
        matchPattern: /^https:\/\/www\.sciencedirect\.com\//,
    },
    {
        name: "EmeraldeBooks_AnelisPlus",
        matchPattern: /^https:\/\/www\.emerald\.com\//,
    },
    {
        name: "IEEEeBooksNOW_AnelisPlus",
        matchPattern: /^https:\/\/ieeexplore\.ieee\.org\/book\//,
        extraQuery: "&_rwpForceNonNavigationManagerRequest=true",
    },
    {
        name: "IEEE_IEL_AnelisPlus",
        matchPattern: /^https:\/\/ieeexplore\.ieee\.org\//,
        extraQuery: "&_rwpForceNonNavigationManagerRequest=true",
    },
    {
        name: "IETDL_AnelisPlus",
        matchPattern: /^https:\/\/digital-library\.theiet\.org\//,
    },
    {
        name: "InCites_AnelisPlus",
        matchPattern: /^https:\/\/access\.clarivate\.com\/.*app=incites/,
    },
    {
        name: "IOPeBooks_AnelisPlus",
        matchPattern: /^https:\/\/iopscience\.iop\.org\/book\//,
    },
    {
        name: "IOPJournals_AnelisPlus",
        matchPattern: /^https:\/\/iopscience\.iop\.org\//,
    },
    {
        name: "MathSciNet_AnelisPlus",
        matchPattern: /^https:\/\/mathscinet\.ams\.org\//,
        urlTransform: (url) => url.replace("/relay-station", "/article"),
    },
    {
        name: "Nature_AnelisPlus",
        matchPattern: /^https:\/\/www\.nature\.com\//,
    },
    {
        name: "SageJournals_AnelisPlus",
        matchPattern: /^https:\/\/journals\.sagepub\.com\//,
    },
    {
        name: "SAGEKnowledgeEbooks_AnelisPlus",
        matchPattern: /^https:\/\/sk\.sagepub\.com\//,
    },
    {
        name: "Scopus_AnelisPlus",
        matchPattern: /^https:\/\/www\.scopus\.com\//,
    },
    {
        name: "SpringerEbooks_AnelisPlus",
        matchPattern: /^https:\/\/link\.springer\.com\/book\//,
    },
    {
        name: "SpringerLink_AnelisPlus",
        matchPattern: /^https:\/\/link\.springer\.com\//,
    },
    {
        name: "Statista_UVT",
        matchPattern: /^https:\/\/www\.statista\.com\//,
    },
    {
        name: "TandFeBooks_AnelisPlus",
        matchPattern: /^https:\/\/www\.taylorfrancis\.com\/books\//,
    },
    {
        name: "TandFJournals_AnelisPlus",
        matchPattern: /^https:\/\/www\.tandfonline\.com\//,
    },
    {
        name: "ClarivateWoS_AnelisPlus",
        matchPattern: /^https:\/\/access\.clarivate\.com\/.*app=wos/,
    },
    {
        name: "WileyBooks_AnelisPlus",
        matchPattern: /^https:\/\/onlinelibrary\.wiley\.com\/doi\/book\//,
    },
    {
        name: "WileyJournals_AnelisPlus",
        matchPattern: /^https:\/\/.*onlinelibrary\.wiley\.com\//,
    },
    {
        name: "DeGruytereBooks_AnelisPlus",
        matchPattern: /^https:\/\/www\.degruyterbrill\.com\//,
    },
    {
        name: "iGLibraryALA_AnelisPlus",
        matchPattern: /^https:\/\/.*\.igpublish\.com\//,
    },
];

// }}}

// {{{ match

function canRedirect(url) {
    return ENFORMATION_RESOURCES.some((resource) => resource.matchPattern.test(url));
}

function findRedirect(url) {
    for (const resource of ENFORMATION_RESOURCES) {
        if (!resource.matchPattern.test(url)) {
            continue;
        }

        const target = resource.urlTransform ? resource.urlTransform(url) : url;
        const sourceId = encodeURIComponent(resource.name);
        const originalUrl = encodeURIComponent(target);
        const extraQuery = resource.extraQuery ?? "";

        return {
            name: resource.name,
            redirectTo: `${ENFORMATION_GATEWAY}${sourceId}${extraQuery}&qurl=${originalUrl}`,
        };
    }

    return null;
}

function transformUrl(url, callback) {
    const resource = findRedirect(url);

    if (resource) {
        console.log(`Matched '${resource.name}': redirecting to '${resource.redirectTo}'.`);
        callback(resource.redirectTo);
    }
}

// }}}

// {{{ browser

const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function updateIcon(tabId, url) {
    const variant = darkQuery.matches ? "dark" : "light";

    if (canRedirect(url)) {
        browser.action.enable(tabId).catch(console.log);
    } else {
        browser.action.disable(tabId).catch(console.log);
    }

    browser.action
        .setIcon({
            path: { 32: `icons/icon-${variant}.svg` },
            tabId: tabId,
        })
        .catch(console.log);
}

darkQuery.addEventListener("change", () => {
    browser.tabs
        .query({})
        .then((tabs) => {
            for (const tab of tabs) {
                if (tab.url) {
                    updateIcon(tab.id, tab.url);
                }
            }
        })
        .catch(console.log);
});

browser.tabs.onUpdated.addListener(
    (tabId, changeInfo) => {
        updateIcon(tabId, changeInfo.url);
    },
    { properties: ["url"] },
);

browser.tabs.onActivated.addListener((activeInfo) => {
    browser.tabs
        .get(activeInfo.tabId)
        .then((tab) => {
            if (tab.url) {
                updateIcon(tab.id, tab.url);
            }
        })
        .catch(console.log);
});

browser.action.onClicked.addListener((tab) => {
    if (tab.url) {
        transformUrl(tab.url, (newUrl) => {
            browser.tabs.update(tab.id, { url: newUrl }).catch(console.log);
        });
    }
});

browser.contextMenus.onClicked.addListener((info, _tab) => {
    transformUrl(info.linkUrl, (newUrl) => {
        browser.tabs.create({ url: newUrl }).catch(console.log);
    });
});

browser.runtime.onInstalled.addListener((_details) => {
    browser.contextMenus.create({
        title: "Open link through e-nformation",
        contexts: ["link"],
        id: "redirect",
    });
});

// }}}
