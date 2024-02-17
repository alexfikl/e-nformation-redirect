// {{{ resources

const ENFORMATION_RESOURCES = [
    {
        name: "APAPsychArticles",
        matchPattern: /^https:\/\/oce\.ovid\.com\/(.*?)$/,
        redirectPattern:
            "https://z.e-nformation.ro/UnivdeVestTM?action=source&sourceID=APAPsychArticles",
    },
    {
        name: "ACS_AnelisPlus",
        matchPattern: /^https:\/\/pubs\.acs\.org\/(.*?)$/,
        redirectPattern: "https://0610wbc33-y-https-pubs-acs-org.z.e-nformation.ro/$1",
    },
    {
        name: "AIP_AnelisPlus",
        matchPattern: /^https:\/\/pubs\.aip\.org\/(.*?)$/,
        redirectPattern:
            "https://z.e-nformation.ro/MuseSessionID=06107bc36/MuseProtocol=https/MuseHost=pubs.aip.org/MusePath/$1",
    },
    {
        name: "APS_Vest",
        matchPattern: /^https:\/\/journals\.aps\.org\/(.*?)$/,
        redirectPattern:
            "https://06108bc37-y-https-journals-aps-org.z.e-nformation.ro/$1",
    },
    {
        name: "CabiDL_AnelisPlus",
        matchPattern: /^https:\/\/www\.cabidigitallibrary\.org\/(.*?)$/,
        redirectPattern:
            "https://0610hbc38-y-https-www-cabidigitallibrary-org.z.e-nformation.ro/$1",
    },
    {
        name: "CEEOL_journals",
        matchPattern: /^https:\/\/www\.ceeol\.com\/(.*?)$/,
        redirectPattern: "https://0610abc3a-y-https-www-ceeol-com.z.e-nformation.ro/$1",
    },
    {
        name: "ScienceDirectEbooks_AnelisPlus",
        matchPattern: /^https:\/\/www\.sciencedirect\.com\/bookseries\/(.*?)$/,
        redirectPattern:
            "https://0610dg2yd-y-https-www-sciencedirect-com.z.e-nformation.ro/bookseries/$1",
    },
    {
        name: "ScienceDirect_AnelisPlus",
        matchPattern: /^https:\/\/www\.sciencedirect\.com\/(.*?)$/,
        redirectPattern:
            "https://0610dbc3e-y-https-www-sciencedirect-com.z.e-nformation.ro/$1",
    },
    {
        name: "EmeraldEbooks_AnelisPlus",
        matchPattern: /^https:\/\/www\.emerald\.com\/insight\/publication\/(.*?)$/,
        redirectPattern:
            "https://06104g2zq-y-https-www-emerald-com.z.e-nformation.ro/insight/publication/$1",
    },
    {
        name: "EmeraldJournals_AnelisPlus",
        matchPattern: /^https:\/\/www\.emerald\.com\/(.*?)$/,
        redirectPattern:
            "https://0610qbc3t-y-https-www-emerald-com.z.e-nformation.ro/$1",
    },
    {
        name: "IEEEeBooksNOW_AnelisPlus",
        matchPattern: /^https:\/\/ieeexplore\.ieee\.org\/book\/(.*?)$/,
        redirectPattern:
            "https://06105g30f-y-https-ieeexplore-ieee-org.z.e-nformation.ro/book/$1",
    },
    {
        name: "IEEE_IEL_AnelisPlus",
        matchPattern: /^https:\/\/ieeexplore\.ieee\.org\/(.*?)$/,
        redirectPattern:
            "https://06106g30j-y-https-ieeexplore-ieee-org.z.e-nformation.ro/$1",
    },
    {
        name: "IETDL_AnelisPlus",
        matchPattern: /^https:\/\/digital-library\.theiet\.org\/(.*?)$/,
        redirectPattern:
            "https://0610ibc3x-y-https-digital--library-theiet-org.z.e-nformation.ro/$1",
    },
    {
        name: "InCites_UVT",
        matchPattern: /^https:\/\/access\.clarivate\.com\/(.*app=incites.*?)$/,
        redirectPattern:
            "https://0610yg30q-y-https-access-clarivate-com.z.e-nformation.ro/$1",
    },
    {
        name: "IOPJournals_AnelisPlus",
        matchPattern: /^https:\/\/iopscience\.iop\.org\/(.*?)$/,
        redirectPattern:
            "https://06109bc46-y-https-iopscience-iop-org.z.e-nformation.ro/$1",
    },
    {
        name: "MathSciNet_AnelisPlus",
        matchPattern: /^https:\/\/mathscinet\.ams\.org\/(.*?)$/,
        redirectPattern:
            "https://0610jbc48-y-https-mathscinet-ams-org.z.e-nformation.ro/$1",
    },
    {
        name: "Nature_AnelisPlus",
        matchPattern: /^https:\/\/www\.nature\.com\/(.*?)$/,
        redirectPattern:
            "https://0610ubc49-y-https-www-nature-com.z.e-nformation.ro/$1",
    },
    {
        name: "PQDT_UVT",
        matchPattern: /^https:\/\/www\.proquest\.com\/(.*sourcetype=Dissertations.*?)$/,
        redirectPattern:
            "https://z.e-nformation.ro/UnivdeVestTM?action=source&sourceID=PQDT_UVT",
    },
    {
        name: "PQCentral_AnelisPlus",
        matchPattern: /^https:\/\/www\.proquest\.com\/(.*?)$/,
        redirectPattern:
            "https://z.e-nformation.ro/UnivdeVestTM?action=source&sourceID=PQCentral_AnelisPlus",
    },
    {
        name: "SageJournals_AnelisPlus",
        matchPattern: /^https:\/\/journals\.sagepub\.com\/(.*?)$/,
        redirectPattern:
            "https://0610pbc4f-y-https-journals-sagepub-com.z.e-nformation.ro/$1",
    },
    {
        name: "SAGEKnowledgeEbooks_AnelisPlus",
        matchPattern: /^https:\/\/sk\.sagepub\.com\/(.*?)$/,
        redirectPattern:
            "https://06102bc4h-y-https-sk-sagepub-com.z.e-nformation.ro/$1",
    },
    {
        name: "Scopus_AnelisPlus",
        matchPattern: /^https:\/\/www\.scopus\.com\/(.*?)$/,
        redirectPattern:
            "https://0610ebc4l-y-https-www-scopus-com.z.e-nformation.ro/$1",
    },
    {
        name: "SpringerLink_AnelisPlus",
        matchPattern: /^https:\/\/link\.springer\.com\/(.*?)$/,
        redirectPattern:
            "https://0610lbc4m-y-https-link-springer-com.z.e-nformation.ro/$1",
    },
    {
        name: "TandFJournals_UVT",
        matchPattern: /^https:\/\/www\.tandfonline\.com\/(.*?)$/,
        redirectPattern:
            "https://0610obc4n-y-https-www-tandfonline-com.z.e-nformation.ro/$1",
    },
    {
        name: "ClarivateWoS_AnelisPlus",
        matchPattern: /^https:\/\/access\.clarivate\.com\/(.*app=wos.*?)$/,
        redirectPattern:
            "https://0610mbc4o-y-https-www-webofscience-com.z.e-nformation.ro/$1",
    },
    {
        name: "WileyBooks_AnelisPlus",
        matchPattern: /^https:\/\/onlinelibrary\.wiley\.com\/doi\/book\/(.*?)$/,
        redirectPattern:
            "https://0610gg33b-y-https-onlinelibrary-wiley-com.z.e-nformation.ro/doi/book/$1",
    },
    {
        name: "WileyJournals_AnelisPlus",
        matchPattern: /^https:\/\/.*onlinelibrary\.wiley\.com\/(.*?)$/,
        redirectPattern:
            "https://0610fbc4s-y-https-onlinelibrary-wiley-com.z.e-nformation.ro/$1",
    },
    {
        name: "DeGruytereBooks_AnelisPlus",
        matchPattern: /^https:\/\/www\.degruyter\.com\/(.*?)$/,
        redirectPattern:
            "https://06103bc4t-y-https-www-degruyter-com.z.e-nformation.ro/$1",
    },
    {
        name: "iGLibraryALA_AnelisPlus",
        matchPattern: /^https:\/\/.*\.igpublish\.com\/(.*?)$/,
        redirectPattern:
            "https://0610nbc4u-y-https-portal-igpublish-com.z.e-nformation.ro/$1",
    },
];

// }}}

// {{{ match

function find_resource(url) {
    for (var iresource = 0; iresource < ENFORMATION_RESOURCES.length; iresource++) {
        // try and match regex
        var resource = ENFORMATION_RESOURCES[iresource];
        var matches = resource.matchPattern.exec(url);
        if (!matches) {
            continue;
        }

        // replace the redirect url
        var redirectTo = resource.redirectPattern;
        for (var i = matches.length - 1; i > 0; i--) {
            var repl = matches[i];
            redirectTo = redirectTo.replace(new RegExp("\\$" + i, "gi"), repl);
        }

        return {
            name: resource.name,
            redirectFrom: url,
            redirectTo: redirectTo,
        };
    }

    return null;
}

function transformUrl(url, callback) {
    console.log(`Trying to redirect '${url}'!`);
    const resource = find_resource(url);

    if (resource) {
        console.log(`Matched '${resource.name}'.`);
        console.log(`Redirecting to '${resource.redirectTo}'.`);

        callback(resource.redirectTo);
    } else {
        console.log(`${url} not found.`);
    }
}

// }}}

// {{{ browser

browser.action.onClicked.addListener((tab) => {
    transformUrl(tab.url, (newUrl) => {
        browser.tabs.update(tab.id, { url: newUrl });
    });
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    transformUrl(info.linkUrl, (newUrl) => {
        browser.tabs.create({ url: newUrl });
    });
});

browser.runtime.onInstalled.addListener((details) => {
    browser.storage.sync.get({ university_id: null }, (items) => {
        browser.contextMenus.create({
            title: "Open link through e-nformation",
            contexts: ["link"],
            id: "redirect",
        });
    });
});

// }}}
