const DEFAULT_UNIVERSITY = 'UnivdeVestTM'
const ENFORMATION_URL = 'https://z.e-nformation.ro/$@?action=source&sourceID=$@'

function patchGenericURL(url, resource) {
    var result = new URL(url.href)
    result.pathname = resource.pathname
    return result.href
}

const ENFORMATION_SOURCE_IDS = {
    // 'oce.ovid.com': { name: 'APAPsychArticles', patch: patchGenericURL },
    'pubs.acs.org': { name: 'ACS_AnelisPlus', patch: patchGenericURL },
    'pubs.aip.org': { name: 'AIP_AnelisPlus', patch: patchGenericURL },
    'journals.aps.org': {name: 'APS_Vest', patch: patchGenericURL },
    'www.cabidigitallibrary.org': { name: 'CabiDL_AnelisPlus', patch: patchGenericURL },
    'www.ceeol.com': { name: 'CEEOL_journals', patch: patchGenericURL },
    // 'www.sciencedirect.com': { name: 'ScienceDirectEbooks_AnelisPlus', patch: patchGenericURL },
    'www.sciencedirect.com': { name: 'ScienceDirect_AnelisPlus', patch: patchGenericURL },
    'www.emerald.com': { name: 'EmeraldJournals_AnelisPlus', patch: patchGenericURL },
    // 'www.emerald.com': { name: 'EmeraldEbooks_AnelisPlus', patch: patchGenericURL },
    // 'ieeexplore.ieee.org': { name: 'IEEEeBooksNOW_AnelisPlus', patch: patchGenericURL },
    'ieeexplore.ieee.org': { name: 'IEEE_IEL_AnelisPlus', patch: patchGenericURL },
    'digital-library.theiet.org': { name: 'IETDL_AnelisPlus', patch: patchGenericURL },
    // 'access.clarivate.com': { name: 'InCites_UVT', patch: patchGenericURL },
    'iopscience.iop.org': { name: 'IOPJournals_AnelisPlus', patch: patchGenericURL },
    'mathscinet.ams.org': { name: 'MathSciNet_AnelisPlus', patch: patchGenericURL },
    // 'www.nature.com': { name: 'Nature_AnelisPlus', patch: patchGenericURL },
    'www.proquest.com': { name: 'PQCentral_AnelisPlus', patch: patchGenericURL },
    // 'www.proquest.com': { name: 'PQDT_UVT', patch: patchGenericURL },
    'journals.sagepub.com': { name: 'SageJournals_AnelisPlus', patch: patchGenericURL },
    'sk.sagepub.com': { name: 'SAGEKnowledgeEbooks_AnelisPlus', patch: patchGenericURL },
    'www.scopus.com': { name: 'Scopus_AnelisPlus', patch: patchGenericURL },
    'link.springer.com': { name: 'SpringerLink_AnelisPlus', patch: patchGenericURL },
    'www.tandfonline.com': { name: 'TandFJournals_UVT', patch: patchGenericURL },
    'access.clarivate.com': { name: 'ClarivateWoS_AnelisPlus', patch: patchGenericURL },
    // 'onlinelibrary.wiley.com': { name: 'WileyBooks_AnelisPlus', patch: patchGenericURL },
    'onlinelibrary.wiley.com': { name: 'WileyJournals_AnelisPlus', patch: patchGenericURL },
    'www.degruyter.com': { name: 'DeGruytereBooks_AnelisPlus', patch: patchGenericURL },
    'www.igpublish.com': { name: 'iGLibraryALA_AnelisPlus', patch: patchGenericURL },
    'portal.igpublish.com': { name: 'iGLibraryALA_AnelisPlus', patch: patchGenericURL },
}

function transformUrl (url, callback) {
    const link_url = new URL(url)
    if (link_url.hostname in ENFORMATION_SOURCE_IDS) {
        browser.storage.sync.get({ university_id: DEFAULT_UNIVERSITY }, (items) => {
            const university_id = items.university_id

            if (university_id) {
                resource = ENFORMATION_SOURCE_IDS[link_url.hostname]
                const eurl = (
                    ENFORMATION_URL
                        .replace('$@', university_id)
                        .replace('$@', resource.name))
                console.log(eurl)
                callback(eurl)
            }
        })
        browser.storage.session.set({original_url: url})
    } else {
        browser.storage.session.get({ original_url: null }, (items) => {
            const original_url = items.original_url

            if (original_url) {
                const resource_url = new URL(original_url)
                resource = ENFORMATION_SOURCE_IDS[resource_url.hostname]

                eurl = resource.patch(link_url, resource_url)
                console.log(eurl)
                callback(eurl)
            }
        })
        browser.storage.session.set({original_url: null})
    }
}

browser.action.onClicked.addListener((tab) => {
    transformUrl(tab.url, (newUrl) => {
        browser.tabs.update(tab.id, { url: newUrl })
    })
})

browser.contextMenus.onClicked.addListener((info, tab) => {
    transformUrl(info.linkUrl, (newUrl) => {
        browser.tabs.create({ url: newUrl })
    })
})

browser.runtime.onInstalled.addListener((details) => {
    browser.storage.sync.get({ university_id: null }, (items) => {
        browser.contextMenus.create({
            title: 'Open link through e-nformation',
            contexts: ['link'],
            id: 'redirect'
        })
    })
})
