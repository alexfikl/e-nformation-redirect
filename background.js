const DEFAULT_UNIVERSITY = 'UnivdeVestTM'

const ENFORMATION_URL = 'https://z.e-nformation.ro/$@?action=source&sourceID=$@'
const ENFORMATION_SOURCE_IDS = {
  'www.sciencedirect.com': 'ScienceDirectEbooks_AnelisPlus'
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
        callback(eurl)
      }
    })
  } else {
    browser.storage.sync.get({ original_url: null }, (items) => {
      const original_url = items.original_url

      if (original_url) {
        a = new URL(original_url)

        eurl = new URL(a.pathname, url).href
        callback(eurl)
      }
    })
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
