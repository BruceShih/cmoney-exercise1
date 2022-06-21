import { Dom } from './dom.js';

export function initializeAds() {
  if (window.screen.width > 768) {
    const ads = new Dom().getById('Ads');
    let adHtml = '';
    for (var i = 1; i <= 3; i++) {
      const ad = new Dom('img');
      if (i === 3) ad.addClass('sticky');
      ad.setAttribute('src', `./images/adv${i}.png`);
      ad.setAttribute('alt', `ad${i}`);
      adHtml += ad.toString();
    }
    ads.setInnerHtml(adHtml);
  }
}
