import { Injectable } from '@angular/core';

declare var window;

export interface IMatomoTracker {
  /**
   * Log a page view.
   */
  trackPageView(customTitle?: string): void;

  /**
   * Log an event with an event category (Videos, Music, Games...), an event action (Play, Pause, Duration, Add Playlist, Downloaded, Clicked...), and an optional event name and optional numeric value.
   */
  trackEvent(category: string, action: string, name?: string, value?: number): void;

  /**
   * Log an internal site search for a specific keyword, in an optional category, specifying the optional count of search results in the page.
   */
  trackSiteSearch(keyword: string, category?: string, resultsCount?: number): void;

  /**
   * Log a conversion for the numeric goal ID, with an optional numeric custom revenue customRevenue.
   */
  trackGoal(idGoal: number, customRevenue?: number): void;

  /**
   * Log a click from your own code. url is the full URL which is to be tracked as a click. linkType can either be 'link' for an outlink or 'download' for a download.
   */
  trackLink(url: string, linkType: string): void;

  /**
   * Scan the entire DOM for all content blocks and tracks all impressions once the DOM ready event has been triggered.
   */
  trackAllContentImpressions(): void;

  /**
   * Scan the entire DOM for all content blocks as soon as the page is loaded. It tracks an impression only if a content block is actually visible.
   */
  trackVisibleContentImpressions(checkOnScroll: boolean, timeIntervalInMs: number): void;

  /**
   * Scan the given DOM node and its children for content blocks and tracks an impression for them if no impression was already tracked for it.
   */
  trackContentImpressionsWithinNode(domNode: Node): void;

  /**
   * Track an interaction with the given DOM node / content block.
   */
  trackContentInteractionNode(domNode: Node, contentInteraction: string): void;

  /**
   * Track a content impression using the specified values.
   */
  trackContentImpression(contentName: string, contentPiece: string, contentTarget: string): void;

  /**
   * Track a content interaction using the specified values.
   */
  trackContentInteraction(
    contentInteraction: string,
    contentName: string,
    contentPiece: string,
    contentTarget: string
  ): void;

  /**
   * Log all found content blocks within a page to the console. This is useful to debug / test content tracking.
   */
  logAllContentBlocksOnPage(): void;

  /**
   * Send a ping request. Ping requests do not track new actions. If they are sent within the standard visit length, they will extend the existing visit and the current last action for the visit. If sent after the standard visit length, ping requests will create a new visit using the last action in the last known visit. See also enableHeartBeatTimer.
   */
  ping(): void;

  /**
   * Install a Heart beat timer that will regularly send requests to Matomo in order to better measure the time spent on the page. These requests will be sent only when the user is actively viewing the page (when the tab is active and in focus). These requests will not track additional actions or pageviews. By default, delayInSeconds is set to 15 seconds. See also ping and the developer guide. https://developer.matomo.org/guides/tracking-javascript-guide#accurately-measure-the-time-spent-on-each-page
   */
  enableHeartBeatTimer(delayInSeconds: number): void;

  /**
   * Install link tracking on all applicable link elements. Set the enable parameter to true to use pseudo click-handler (treat middle click and open contextmenu as left click). A right click (or any click that opens the context menu) on a link will be tracked as clicked even if "Open in new tab" is not selected. If "false" (default), nothing will be tracked on open context menu or middle click.
   */
  enableLinkTracking(enable: boolean): void;

  /**
   * Enable cross domain linking. By default, the visitor ID that identifies a unique visitor is stored in the browser's first party cookies. This means the cookie can only be accessed by pages on the same domain. If you own multiple domains and would like to track all the actions and pageviews of a specific visitor into the same visit, you may enable cross domain linking (learn more) https://piwik.org/faq/how-to/faq_23654/. Whenever a user clicks on a link it will append a URL parameter pk_vid to the clicked URL which forwards the current visitor ID value to the page of the different domain.
   */
  enableCrossDomainLinking(): void;

  /**
   * Set the cross domain linking timeout (in seconds). By default, the two visits across domains will be linked together when the link is clicked and the page is loaded within a 180 seconds timeout window.`
   */
  setCrossDomainLinkingTimeout(timeout: number): void;

  /**
   * Get the query parameter to append to links to handle cross domain linking. Use this to add cross domain support for links that are added to the DOM dynamically. Learn more about cross domain linking. https://piwik.org/faq/how-to/faq_23654/ (requires Matomo 3.3.1)
   */
  getCrossDomainLinkingUrlParameter(): void;

  /**
   * Override document.title
   */
  setDocumentTitle(title: string): void;

  /**
   * Set array of hostnames or domains to be treated as local. For wildcard subdomains, you can use: setDomains('.example.com'); or setDomains('*.example.com');. You can also specify a path along a domain: setDomains('*.example.com/subsite1');
   */
  setDomains(domains: string[]): void;

  /**
   * Override the page's reported URL.
   */
  setCustomUrl(url: string): void;

  /**
   * Override the detected Http-Referer.
   */
  setReferrerUrl(url: string): void;

  /**
   * Specify the website ID. Redundant: can be specified in getTracker() constructor.
   */
  setSiteId(siteId: number): void;

  /**
   * Specify the Matomo HTTP API URL endpoint. Points to the root directory of piwik, e.g. http://piwik.example.org/ or https://example.org/piwik/. This function is only useful when the 'Overlay' report is not working. By default, you do not need to use this function.
   */
  setApiUrl(url: string): void;

  /**
   * Specify the Matomo server URL. Redundant: can be specified in getTracker() constructor.
   */
  setTrackerUrl(url: string): void;

  /**
   * Set classes to be treated as downloads (in addition to piwik_download).
   */
  setDownloadClasses(classes: string | string[]): void;

  /**
   * Set list of file extensions to be recognized as downloads. Example: 'doc' or ['doc', 'xls'].
   */
  setDownloadExtensions(extensions: string | string[]): void;

  /**
   * Specify additional file extensions to be recognized as downloads. Example: 'doc' or ['doc', 'xls'].
   */
  addDownloadExtensions(extensions: string | string[]): void;

  /**
   * Specify file extensions to be removed from the list of download file extensions. Example: 'doc' or ['doc', 'xls'].
   */
  removeDownloadExtensions(extensions: string | string[]): void;

  /**
   * Set classes to be ignored if present in link (in addition to piwik_ignore).
   */
  setIgnoreClasses(classes: string | string[]): void;

  /**
   * Set classes to be treated as outlinks (in addition to piwik_link).
   */
  setLinkClasses(classes: string | string[]): void;

  /**
   * Set delay for link tracking in milliseconds.
   */
  setLinkTrackingTimer(delay: number): void;

  /**
   * Set to true to not record the hash tag (anchor) portion of URLs.
   */
  discardHashTag(value: boolean): void;

  /**
   * By default Matomo uses the browser DOM Timing API to accurately determine the time it takes to generate and download the page. You may overwrite the value by specifying a milliseconds value here.
   */
  setGenerationTimeMs(generationTime: number): void;

  /**
   * Append a custom string to the end of the HTTP request to piwik.php?
   */
  appendToTrackingUrl(appendToUrl: string): void;

  /**
   * Set to true to not track users who opt out of tracking using Mozilla's (proposed) Do Not Track setting.
   */
  setDoNotTrack(doNotTrack: boolean): void;

  /**
   * Enable a frame-buster to prevent the tracked web page from being framed/iframed.
   */
  killFrame(): void;

  /**
   * Force the browser load the live URL if the tracked web page is loaded from a local file (e.g., saved to someone's desktop).
   */
  redirectFile(url: string): void;

  /**
   * Record how long the page has been viewed if the minimumVisitLength (in seconds) is attained; the heartBeatDelay determines how frequently to update the server
   */
  setHeartBeatTimer(minimumVisitLength: number, heartBeatDelay: number): void;

  /**
   * Sets a User ID https://piwik.org/docs/user-id/ to this user (such as an email address or a username).
   */
  setUserId(userId: string): void;

  /**
   * Set a custom variable.
   */
  setCustomVariable(index: number, name: string, value: string, scope: string): void;

  /**
   * Delete a custom variable.
   */
  deleteCustomVariable(index: number, scope: string): void;

  /**
   * When called then the Custom Variables of scope "visit" will be stored (persisted) in a first party cookie for the duration of the visit. This is useful if you want to call getCustomVariable later in the visit. (by default custom variables are not stored on the visitor's computer.)
   */
  storeCustomVariablesInCookie(): void;

  /**
   * Set a custom dimension. (requires Matomo 2.15.1 + Custom Dimensions plugin). https://plugins.piwik.org/CustomDimensions
   */
  setCustomDimension(customDimensionId: number, customDimensionValue: string): void;

  /**
   * Delete a custom dimension. (requires Matomo 2.15.1 + Custom Dimensions plugin). https://plugins.piwik.org/CustomDimensions
   */
  deleteCustomDimension(customDimensionId: number): void;

  /**
   * Set campaign name parameter(s). (Help: Customize Campaign name parameter names) https://piwik.org/faq/how-to/#faq_120
   */
  setCampaignNameKey(name: string): void;

  /**
   * Set campaign keyword parameter(s). (Help: Customize Campaign keyword parameter names) https://piwik.org/faq/how-to/#faq_120
   */
  setCampaignKeywordKey(keyword: string): void;

  /**
   * Set to true to attribute a conversion to the first referrer. By default, conversion is attributed to the most recent referrer.
   */
  setConversionAttributionFirstReferrer(conversionToFirstReferrer: boolean): void;

  /**
   * Set the current page view as a product or category page view. When you call setEcommerceView it must be followed by a call to trackPageView to record the product or category page view.
   */
  setEcommerceView( productSKU: unknown, productName: string, categoryName: string, price: unknown ): void;

  /**
   * Add a product into the ecommerce order. Must be called for each product in the order.
   */
  addEcommerceItem( productSKU: unknown, productName?: string, productCategory?: string, price?: unknown, quantity?: number ): void;

  /**
   * Remove the specified product from the untracked ecommerce order.
   */
  removeEcommerceItem(productSKU: unknown): void;

  /**
   * Remove all products in the untracked ecommerce order. _Note: this is done automatically after trackEcommerceOrder() is called.
   */
  clearEcommerceCart(): void;

  /**
   * Track a shopping cart. Call this javascript function every time a user is adding, updating or deleting a product from the cart.
   */
  trackEcommerceCartUpdate(grandTotal: number): void;

  /**
   * Track an Ecommerce order, including any ecommerce item previously added to the order. orderId and grandTotal (ie. revenue) are required parameters.
   */
  trackEcommerceOrder( orderId: unknown, grandTotal: number, subTotal?: number, tax?: number, shipping?: number, discount?: number );

  /**
   * By default the Matomo tracker assumes consent to tracking. To change this behavior so nothing is tracked until a user consents, you must call requireConsent.
   */
  requireConsent(): void;

  /**
   * Mark that the current user has consented. The consent is one-time only, so in a subsequent browser session, the user will have to consent again. To remember consent, see the method below: rememberConsentGiven.
   */
  setConsentGiven(): void;

  /**
   * Mark that the current user has consented, and remembers this consent through a browser cookie. The next time the user visits the site, Matomo will remember that they consented, and track them. If you call this method, you do not need to call setConsentGiven.
   */
  rememberConsentGiven(hoursToExpire: unknown): void;

  /**
   * Remove a user's consent, both if the consent was one-time only and if the consent was remembered. After calling this method, the user will have to consent again in order to be tracked.
   */
  forgetConsentGiven(): void;

  /**
   * Disable all first party cookies. Existing Matomo cookies for this websites will be deleted on the next page view.
   */
  disableCookies(): void;

  /**
   * Delete the tracking cookies currently currently set (this is useful when creating new visits) https://piwik.org/faq/how-to/#faq_187
   */
  deleteCookies(): void;

  /**
   * The default prefix is 'pk'.
   */
  setCookieNamePrefix(prefix: string): void;

  /**
   * The default is the document domain; if your website can be visited at both www.example.com and example.com, you would use: tracker.setCookieDomain('.example.com'); or tracker.setCookieDomain('*.example.com');
   */
  setCookieDomain(domain: string): void;

  /**
   * The default is '/'.
   */
  setCookiePath(path: string): void;

  /**
   * Set to true to enable the Secure cookie flag on all first party cookies. This should be used when your website is only available under HTTPS so that all tracking cookies are always sent over secure connection.
   */
  setSecureCookie(secure: boolean): void;

  /**
   * The default is 13 months.
   */
  setVisitorCookieTimeout(seconds: number): void;

  /**
   * The default is 6 months.
   */
  setReferralCookieTimeout(seconds: number): void;

  /**
   * The default is 30 minutes.
   */
  setSessionCookieTimeout(seconds: number): void;

  /**
   * Add click listener to a specific link element. When clicked, Matomo will log the click automatically.
   */
  addListener(element: Element): void;

  /**
   * Set the request method to either "GET" or "POST". (The default is "GET".) To use the POST request method, either 1) the Matomo host is the same as the tracked website host (Matomo installed in the same domain as your tracked website), or 2) if Matomo is not installed on the same host as your website, you need to enable CORS (Cross domain requests) as explained in this FAQ. https://piwik.org/faq/how-to/faq_18694/
   */
  setRequestMethod(method: string): void;

  /**
   * Set a function that will process the request content. The function will be called once the request (query parameters string) has been prepared, and before the request content is sent.
   */
  setCustomRequestProcessing(callback: (queryParameters: string) => void): void;

  /**
   * Set request Content-Type header value. Applicable when "POST" request method is used via setRequestMethod.
   */
  setRequestContentType(contentType: string): void;

  /**
   * Disable the feature which groups together multiple tracking requests and send them as a bulk POST request. Disabling this feature is useful when you want to be able to replay all logs https://matomo.org/faq/log-analytics-tool/faq_19221/: one must use disableQueueRequest to disable this behaviour to later be able to replay logged Matomo logs (otherwise a subset of the requests wouldn't be able to be replayed)
   */
  disableQueueRequest(): void;

  /**
   * When the user has logged out and a User ID is not available anymore, it is recommended to notify Matomo by calling the resetUserId method before trackPageView.
   * @src https://developer.matomo.org/guides/tracking-javascript-guide
   */
  resetUserId(): void;
}

/**
 * Promises
 */
export interface IMatomoTrackerFunction {
  /**
   * Return the Matomo server URL.
   */
  getPiwikUrl(): Promise<string>;

  /**
   * Return the current url of the page that is currently being visited. If a custom URL was set before calling this method, the custom URL will be returned.
   */
  getCurrentUrl(): Promise<string>;

  /**
   * Get delay for link tracking (in milliseconds).
   */
  getLinkTrackingTimer(): Promise<number>;

  /**
   * Return the 16 characters ID for the visitor.
   */
  getVisitorId(): Promise<string>;

  /**
   * Return the visitor cookie contents in an array.
   */
  getVisitorInfo(): Promise<any[]>;

  /**
   * Return the visitor attribution array (Referer information and / or Campaign name & keyword). Attribution information is used by Matomo to credit the correct referrer https://piwik.org/faq/general/#faq_106 (first or last referrer) used when a user triggers a goal conversion.
   */
  getAttributionInfo(): Promise<any[]>;

  /**
   * @see getAttributionInfo
   */
  getAttributionCampaignName(): Promise<string>;

  /**
   * @see getAttributionInfo
   */
  getAttributionCampaignKeyword(): Promise<string>;

  /**
   * @see getAttributionInfo
   */
  getAttributionReferrerTimestamp(): Promise<string>;

  /**
   * @see getAttributionInfo
   */
  getAttributionReferrerUrl(): Promise<string>;

  /**
   * Return the User ID string if it was set.
   */
  getUserId(): Promise<string>;

  /**
   * Retrieve a custom variable.
   */
  getCustomVariable(index: number, scope: string): Promise<string>;

  /**
   * Retrieve a custom dimension. (requires Matomo 2.15.1 + Custom Dimensions plugin) https://plugins.piwik.org/CustomDimensions
   */
  getCustomDimension(customDimensionId: number): Promise<string>;

  /**
   * Return all ecommerce items currently in the untracked ecommerce order. The returned array will be a copy, so changing it won't affect the ecommerce order. To affect what gets tracked, use the addEcommerceItem()/removeEcommerceItem()/clearEcommerceCart() methods. Use this method to see what will be tracked before you track an order or cart update.
   */
  getEcommerceItems(): Promise<boolean>;

  /**
   * Return whether cookies are enabled and supported by this browser.
   */
  hasCookies(): Promise<boolean>;
}

/**
 * Wrapper for the Matomo Javascript tracker.
 * @export
 */
@Injectable({
  providedIn: 'root'
})
export class MatomoTracker implements IMatomoTracker, IMatomoTrackerFunction {

  constructor() {
    if (typeof window._paq === 'undefined') {
      console.warn('Matomo has not yet been initialized! (Did you forget to inject it?)');
    }
  }

  private runMatomo(varName: string, args: any[]): void {
    window._paq.push([varName, ...args]);
  }

  private promiseHandler<T>(functionName: keyof IMatomoTrackerFunction, args: any[] = []): Promise<T> {
    return new Promise((resolve, reject) => {
      window._paq.push([ function() {
        // it seems that the `this` context, will be the one of the matomo lib. Yeah, old js is hacky.
        // noinspection JSPotentiallyInvalidUsageOfClassThis
        const result = this[functionName](...args);
        resolve(result);
      }]);
    });
  }

  trackEvent(...args): void { this.runMatomo('trackEvent', args); }
  trackPageView(...args): void { this.runMatomo('trackPageView', args); }
  addDownloadExtensions(...args): void { this.runMatomo('addDownloadExtensions', args); }
  addListener(...args): void { this.runMatomo('addListener', args); }
  appendToTrackingUrl(...args): void { this.runMatomo('appendToTrackingUrl', args); }
  deleteCookies(...args): void { this.runMatomo('deleteCookies', args); }
  deleteCustomDimension(...args): void { this.runMatomo('deleteCustomDimension', args); }
  deleteCustomVariable(...args): void { this.runMatomo('deleteCustomVariable', args); }
  disableCookies(...args): void { this.runMatomo('disableCookies', args); }
  discardHashTag(...args): void { this.runMatomo('discardHashTag', args); }
  enableCrossDomainLinking(...args): void { this.runMatomo('enableCrossDomainLinking', args); }
  getCrossDomainLinkingUrlParameter(...args): void { this.runMatomo('getCrossDomainLinkingUrlParameter', args); }
  enableHeartBeatTimer(...args): void { this.runMatomo('enableHeartBeatTimer', args); }
  enableLinkTracking(...args): void { this.runMatomo('enableLinkTracking', args); }
  killFrame(...args): void { this.runMatomo('killFrame', args); }
  logAllContentBlocksOnPage(...args): void { this.runMatomo('logAllContentBlocksOnPage', args); }
  ping(...args): void { this.runMatomo('ping', args); }
  redirectFile(...args): void { this.runMatomo('redirectFile', args); }
  removeDownloadExtensions(...args): void { this.runMatomo('removeDownloadExtensions', args); }
  resetUserId(...args): void { this.runMatomo('resetUserId', args); }
  setApiUrl(...args): void { this.runMatomo('setApiUrl', args); }
  setCampaignKeywordKey(...args): void { this.runMatomo('setCampaignKeywordKey', args); }
  setCampaignNameKey(...args): void { this.runMatomo('setCampaignNameKey', args); }
  setConversionAttributionFirstReferrer(...args): void { this.runMatomo('setConversionAttributionFirstReferrer', args); }
  setCookieDomain(...args): void { this.runMatomo('setCookieDomain', args); }
  setCookieNamePrefix(...args): void { this.runMatomo('setCookieNamePrefix', args); }
  setCookiePath(...args): void { this.runMatomo('setCookiePath', args); }
  setCrossDomainLinkingTimeout(...args): void { this.runMatomo('setCrossDomainLinkingTimeout', args); }
  setCustomDimension(...args): void { this.runMatomo('setCustomDimension', args); }
  setCustomRequestProcessing(...args): void { this.runMatomo('setCustomRequestProcessing', args); }
  setCustomUrl(...args): void { this.runMatomo('setCustomUrl', args); }
  setCustomVariable(...args): void { this.runMatomo('setCustomVariable', args); }
  setDoNotTrack(...args): void { this.runMatomo('setDoNotTrack', args); }
  setDocumentTitle(...args): void { this.runMatomo('setDocumentTitle', args); }
  setDomains(...args): void { this.runMatomo('setDomains', args); }
  setDownloadClasses(...args): void { this.runMatomo('setDownloadClasses', args); }
  setDownloadExtensions(...args): void { this.runMatomo('setDownloadExtensions', args); }
  setGenerationTimeMs(...args): void { this.runMatomo('setGenerationTimeMs', args); }
  setHeartBeatTimer(...args): void { this.runMatomo('setHeartBeatTimer', args); }
  setIgnoreClasses(...args): void { this.runMatomo('setIgnoreClasses', args); }
  setLinkClasses(...args): void { this.runMatomo('setLinkClasses', args); }
  setLinkTrackingTimer(...args): void { this.runMatomo('setLinkTrackingTimer', args); }
  setReferralCookieTimeout(...args): void { this.runMatomo('setReferralCookieTimeout', args); }
  setReferrerUrl(...args): void { this.runMatomo('setReferrerUrl', args); }
  setRequestContentType(...args): void { this.runMatomo('setRequestContentType', args); }
  setRequestMethod(...args): void { this.runMatomo('setRequestMethod', args); }
  setSecureCookie(...args): void { this.runMatomo('setSecureCookie', args); }
  setSessionCookieTimeout(...args): void { this.runMatomo('setSessionCookieTimeout', args); }
  setSiteId(...args): void { this.runMatomo('setSiteId', args); }
  setTrackerUrl(...args): void { this.runMatomo('setTrackerUrl', args); }
  setUserId(...args): void { this.runMatomo('setUserId', args); }
  setVisitorCookieTimeout(...args): void { this.runMatomo('setVisitorCookieTimeout', args); }
  storeCustomVariablesInCookie(...args): void { this.runMatomo('storeCustomVariablesInCookie', args); }
  trackAllContentImpressions(...args): void { this.runMatomo('trackAllContentImpressions', args); }
  trackContentImpression(...args): void { this.runMatomo('trackContentImpression', args); }
  trackContentImpressionsWithinNode(...args): void { this.runMatomo('trackContentImpressionsWithinNode', args); }
  trackContentInteractionNode(...args): void { this.runMatomo('trackContentInteractionNode', args); }
  trackEcommerceCartUpdate(...args): void { this.runMatomo('trackEcommerceCartUpdate', args); }
  trackGoal(...args): void { this.runMatomo('trackGoal', args); }
  trackLink(...args): void { this.runMatomo('trackLink', args); }
  trackSiteSearch(...args): void { this.runMatomo('trackSiteSearch', args); }
  trackVisibleContentImpressions(...args): void { this.runMatomo('trackVisibleContentImpressions', args); }
  trackEcommerceOrder(...args): void { this.runMatomo('trackEcommerceOrder', args); }
  trackContentInteraction(...args): void { this.runMatomo('trackContentInteraction', args); }
  addEcommerceItem(...args): void { this.runMatomo('addEcommerceItem', args); }
  clearEcommerceCart(...args): void { this.runMatomo('clearEcommerceCart', args); }
  disableQueueRequest(...args): void { this.runMatomo('disableQueueRequest', args); }
  forgetConsentGiven(...args): void { this.runMatomo('forgetConsentGiven', args); }
  rememberConsentGiven(...args): void { this.runMatomo('rememberConsentGiven', args); }
  removeEcommerceItem(...args): void { this.runMatomo('removeEcommerceItem', args); }
  requireConsent(...args): void { this.runMatomo('requireConsent', args); }
  setConsentGiven(...args): void { this.runMatomo('setConsentGiven', args); }
  setEcommerceView(...args): void { this.runMatomo('setEcommerceView', args); }

  // Promise section
  getPiwikUrl(): Promise<string> { return this.promiseHandler<string>('getPiwikUrl'); }
  getCurrentUrl(): Promise<string> { return this.promiseHandler<string>('getCurrentUrl'); }
  getLinkTrackingTimer(): Promise<number> { return this.promiseHandler<number>('getLinkTrackingTimer'); }
  getVisitorId(): Promise<string> { return this.promiseHandler<string>('getVisitorId'); }
  getVisitorInfo(): Promise<any[]> { return this.promiseHandler<any[]>('getVisitorInfo'); }
  getAttributionInfo(): Promise<any[]> { return this.promiseHandler<any[]>('getAttributionInfo'); }
  getAttributionCampaignName(): Promise<string> { return this.promiseHandler<string>('getAttributionCampaignName'); }
  getAttributionCampaignKeyword(): Promise<string> { return this.promiseHandler<string>('getAttributionCampaignKeyword'); }
  getAttributionReferrerTimestamp(): Promise<string> { return this.promiseHandler<string>('getAttributionReferrerTimestamp'); }
  getAttributionReferrerUrl(): Promise<string> { return this.promiseHandler<string>('getAttributionReferrerUrl'); }
  getUserId(): Promise<string> { return this.promiseHandler<string>('getUserId'); }
  getCustomVariable(...args): Promise<string> { return this.promiseHandler<string>('getCustomVariable', args); }
  getCustomDimension(...args): Promise<string> { return this.promiseHandler<string>('getCustomDimension', args); }
  hasCookies(): Promise<boolean> { return this.promiseHandler<boolean>('hasCookies'); }
  getEcommerceItems(): Promise<boolean> {return this.promiseHandler<boolean>('getEcommerceItems'); }

}
