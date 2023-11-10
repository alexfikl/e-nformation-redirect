const DEFAULT_UNIVERSITY = 'UnivdeVestTM'

const ENFORMATION_URL = 'https://z.e-nformation.ro/$@?action=source&sourceID=$@'
const ENFORMATION_SOURCE_IDS = {
    // 'oce.ovid.com': 'APAPsychArticles',
    'pubs.acs.org': 'ACS_AnelisPlus',
    'pubs.aip.org': 'AIP_AnelisPlus',
    'journals.aps.org': 'APS_Vest',
    'www.cabidigitallibrary.org': 'CabiDL_AnelisPlus',
    'www.ceeol.com': 'CEEOL_journals',
    // 'www.sciencedirect.com': 'ScienceDirectEbooks_AnelisPlus',
    'www.sciencedirect.com': 'ScienceDirect_AnelisPlus',
    // 'www.emerald.com': 'EmeraldJournals_AnelisPlus',
    // 'www.emerald.com': 'EmeraldEbooks_AnelisPlus',
    // 'ieeexplore.ieee.org': 'IEEEeBooksNOW_AnelisPlus',
    'ieeexplore.ieee.org': 'IEEE_IEL_AnelisPlus',
    'digital-library.theiet.org': 'IETDL_AnelisPlus',
    'access.clarivate.com': 'InCites_UVT',
    'iopscience.iop.org': 'IOPJournals_AnelisPlus',
    'mathscinet.ams.org': 'MathSciNet_AnelisPlus',
    // 'www.nature.com': 'Nature_AnelisPlus'
}

function transformUrl (url, callback) {
    let a = new URL(url)
    if (a.hostname in ENFORMATION_SOURCE_IDS) {
        browser.storage.sync.get({ university_id: DEFAULT_UNIVERSITY }, (items) => {
            const university_id = items.university_id

            if (university_id) {
                const eurl = (
                ENFORMATION_URL
                    .replace('$@', university_id)
                    .replace('$@', ENFORMATION_SOURCE_IDS[a.hostname]))
                console.log(eurl)
                callback(eurl)
            }
        })
        browser.storage.sync.set({original_url: url})
    } else {
        browser.storage.sync.get({ original_url: null }, (items) => {
            const original_url = items.original_url

            if (original_url) {
                a = new URL(original_url)
                eurl = `${url}${a.pathname}`
                if (a.search) {
                    eurl = `${eurl}${a.search}`;
                }
                console.log(eurl)
                callback(eurl)
            }
        })
        browser.storage.sync.set({original_url: null})
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
