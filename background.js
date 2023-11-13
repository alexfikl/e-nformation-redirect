const DEFAULT_UNIVERSITY = "UnivdeVestTM";
const ENFORMATION_URL = "https://z.e-nformation.ro/$@?action=source&sourceID=$@";

function patchGenericURL(url, resource) {
    var result = new URL(url);
    result.pathname = resource.pathname;
    result.search = resource.search;
    return result.href;
}

function patchDiscardURL(url, resource) {
    return url;
}

function patchAIPURL(url, resource) {
    var result = new URL(url);
    result.pathname = `${result.pathname}${resource.pathname}`;
    return result.href;
}

const ENFORMATION_RESOURCE_URL = {
    APAPsychArticles: "https://06101bc56-y-https-ovidsp-dc1-ovid-com.z.e-nformation.ro",
    ACS_AnelisPlus: "https://0610wbc33-y-https-pubs-acs-org.z.e-nformation.ro",
    AIP_AnelisPlus:
        "https://z.e-nformation.ro/MuseSessionID=06107bc36/MuseProtocol=https/MuseHost=pubs.aip.org/MusePath",
    APS_Vest: "https://06108bc37-y-https-journals-aps-org.z.e-nformation.ro",
    CabiDL_AnelisPlus:
        "https://0610hbc38-y-https-www-cabidigitallibrary-org.z.e-nformation.ro",
    CEEOL_journals: "https://0610abc3a-y-https-www-ceeol-com.z.e-nformation.ro",
    ScienceDirectEbooks_AnelisPlus:
        "https://0610dbc3e-y-https-www-sciencedirect-com.z.e-nformation.ro",
    ScienceDirect_AnelisPlus:
        "https://0610dbc3e-y-https-www-sciencedirect-com.z.e-nformation.ro",
    EmeraldJournals_AnelisPlus:
        "https://0610qbc3t-y-https-www-emerald-com.z.e-nformation.ro",
    EmeraldEbooks_AnelisPlus:
        "https://06104bc3u-y-https-www-emerald-com.z.e-nformation.ro",
    IEEEeBooksNOW_AnelisPlus:
        "https://06105bc3v-y-https-ieeexplore-ieee-org.z.e-nformation.ro",
    IEEE_IEL_AnelisPlus:
        "https://06106bc3w-y-https-ieeexplore-ieee-org.z.e-nformation.ro",
    IETDL_AnelisPlus:
        "https://0610ibc3x-y-https-digital--library-theiet-org.z.e-nformation.ro",
    InCites_UVT: "https://0610tbc45-y-https-access-clarivate-com.z.e-nformation.ro",
    IOPJournals_AnelisPlus:
        "https://06109bc46-y-https-iopscience-iop-org.z.e-nformation.ro",
    MathSciNet_AnelisPlus:
        "https://0610jbc48-y-https-mathscinet-ams-org.z.e-nformation.ro",
    Nature_AnelisPlus: "https://0610ubc49-y-https-www-nature-com.z.e-nformation.ro",
    PQCentral_AnelisPlus:
        "https://www.proquest.com/?parentSessionId=gpCTgcrjsklEh5zqyRDVLf%2BbrIONyUu%2F6hb1mii9WBk%3D&accountid=196263",
    PQDT_UVT: "https://0610vbc4c-y-https-www-proquest-com.z.e-nformation.ro",
    SageJournals_AnelisPlus:
        "https://0610pbc4f-y-https-journals-sagepub-com.z.e-nformation.ro",
    SAGEKnowledgeEbooks_AnelisPlus:
        "https://06102bc4h-y-https-sk-sagepub-com.z.e-nformation.ro",
    Scopus_AnelisPlus: "https://0610ebc4l-y-https-www-scopus-com.z.e-nformation.ro",
    SpringerLink_AnelisPlus:
        "https://0610lbc4m-y-https-link-springer-com.z.e-nformation.ro",
    TandFJournals_UVT:
        "https://0610obc4n-y-https-www-tandfonline-com.z.e-nformation.ro",
    ClarivateWoS_AnelisPlus:
        "https://0610mbc4o-y-https-www-webofscience-com.z.e-nformation.ro",
    WileyBooks_AnelisPlus:
        "https://0610gbc4r-y-https-onlinelibrary-wiley-com.z.e-nformation.ro",
    WileyJournals_AnelisPlus:
        "https://0610fbc4s-y-https-onlinelibrary-wiley-com.z.e-nformation.ro",
    DeGruytereBooks_AnelisPlus:
        "https://06103bc4t-y-https-www-degruyter-com.z.e-nformation.ro",
    iGLibraryALA_AnelisPlus:
        "https://0610nbc4u-y-https-portal-igpublish-com.z.e-nformation.ro/iglibrary",
};

const ENFORMATION_SOURCE_IDS = {
    // 'oce.ovid.com': { name: 'APAPsychArticles', patch: patchGenericURL },
    "pubs.acs.org": { name: "ACS_AnelisPlus", patch: patchGenericURL },
    "pubs.aip.org": { name: "AIP_AnelisPlus", patch: patchAIPURL },
    "journals.aps.org": { name: "APS_Vest", patch: patchGenericURL },
    "www.cabidigitallibrary.org": {
        name: "CabiDL_AnelisPlus",
        patch: patchGenericURL,
    },
    "www.ceeol.com": { name: "CEEOL_journals", patch: patchGenericURL },
    // 'www.sciencedirect.com': { name: 'ScienceDirectEbooks_AnelisPlus', patch: patchGenericURL },
    "www.sciencedirect.com": {
        name: "ScienceDirect_AnelisPlus",
        patch: patchGenericURL,
    },
    "www.emerald.com": {
        name: "EmeraldJournals_AnelisPlus",
        patch: patchGenericURL,
    },
    // 'www.emerald.com': { name: 'EmeraldEbooks_AnelisPlus', patch: patchGenericURL },
    // 'ieeexplore.ieee.org': { name: 'IEEEeBooksNOW_AnelisPlus', patch: patchGenericURL },
    "ieeexplore.ieee.org": {
        name: "IEEE_IEL_AnelisPlus",
        patch: patchGenericURL,
    },
    "digital-library.theiet.org": {
        name: "IETDL_AnelisPlus",
        patch: patchGenericURL,
    },
    "incites.clarivate.com": { name: "InCites_UVT", patch: patchGenericURL },
    "iopscience.iop.org": {
        name: "IOPJournals_AnelisPlus",
        patch: patchGenericURL,
    },
    "mathscinet.ams.org": {
        name: "MathSciNet_AnelisPlus",
        patch: patchGenericURL,
    },
    "www.nature.com": { name: "Nature_AnelisPlus", patch: patchGenericURL },
    // "www.proquest.com": { name: "PQCentral_AnelisPlus", patch: patchGenericURL },
    "www.proquest.com": { name: "PQDT_UVT", patch: patchGenericURL },
    "journals.sagepub.com": {
        name: "SageJournals_AnelisPlus",
        patch: patchGenericURL,
    },
    "sk.sagepub.com": {
        name: "SAGEKnowledgeEbooks_AnelisPlus",
        patch: patchGenericURL,
    },
    "www.scopus.com": { name: "Scopus_AnelisPlus", patch: patchDiscardURL },
    "link.springer.com": {
        name: "SpringerLink_AnelisPlus",
        patch: patchGenericURL,
    },
    "www.tandfonline.com": {
        name: "TandFJournals_UVT",
        patch: patchGenericURL,
    },
    "access.clarivate.com": {
        name: "ClarivateWoS_AnelisPlus",
        patch: patchGenericURL,
    },
    // 'onlinelibrary.wiley.com': { name: 'WileyBooks_AnelisPlus', patch: patchGenericURL },
    "onlinelibrary.wiley.com": {
        name: "WileyJournals_AnelisPlus",
        patch: patchGenericURL,
    },
    "www.degruyter.com": {
        name: "DeGruytereBooks_AnelisPlus",
        patch: patchGenericURL,
    },
    "www.igpublish.com": {
        name: "iGLibraryALA_AnelisPlus",
        patch: patchGenericURL,
    },
    "portal.igpublish.com": {
        name: "iGLibraryALA_AnelisPlus",
        patch: patchGenericURL,
    },
};

function transformUrl(url, callback) {
    const link_url = new URL(url);
    if (link_url.hostname in ENFORMATION_SOURCE_IDS) {
        var resource = ENFORMATION_SOURCE_IDS[link_url.hostname];
        if (
            link_url.hostname === "access.clarivate.com" &&
            link_url.searchParams.get("app") === "incites"
        ) {
            resource = ENFORMATION_SOURCE_IDS["incites.clarivate.com"];
        }

        console.log(resource);
        const eurl = resource.patch(ENFORMATION_RESOURCE_URL[resource.name], link_url);
        console.log(eurl);
        callback(eurl);
    }
}

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
