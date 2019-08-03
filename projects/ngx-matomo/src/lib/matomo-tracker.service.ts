import { Injectable } from '@angular/core';

declare var window;

interface IMatomoTracker {
  trackEvent(category: string, action: string, name?: string, value?: number): void;
  trackPageView(customTitle?: string): void;
  trackSiteSearch(keyword: string, category?: string, resultsCount?: number): void;
  trackGoal(idGoal: number, customRevenue?: number): void;
  trackLink(url: string, linkType: string): void;
  trackAllContentImpressions(): void;
  trackVisibleContentImpressions(checkOnScroll: boolean, timeIntervalInMs: number): void;
  trackContentImpressionsWithinNode(domNode: Node): void;
  trackContentInteractionNode(domNode: Node, contentInteraction: string): void;
  trackContentImpression(contentName: string, contentPiece: string, contentTarget: string): void;
  logAllContentBlocksOnPage(): void;
  enableLinkTracking(enable: boolean): void;
  enableHeartBeatTimer(delayInSeconds: number): void;
  enableCrossDomainLinking(): void;
  setCrossDomainLinkingTimeout(timeout: number): void;
  setDocumentTitle(title: string): void;
  setDomains(domains: string[]): void;
  setCustomUrl(url: string): void;
  setReferrerUrl(url: string): void;
  setSiteId(siteId: number): void;
  setApiUrl(url: string): void;
  setTrackerUrl(url: string): void;
  setDownloadClasses(classes: string | string[]): void;
  setDownloadExtensions(extensions: string | string[]): void;
  addDownloadExtensions(extensions: string | string[]): void;
  removeDownloadExtensions(extensions: string | string[]): void;
  setIgnoreClasses(classes: string | string[]): void;
  setLinkClasses(classes: string | string[]): void;
  setLinkTrackingTimer(delay: number): void;
  discardHashTag(value: boolean): void;
  setGenerationTimeMs(generationTime: number): void;
  appendToTrackingUrl(appendToUrl: string): void;
  setDoNotTrack(doNotTrack: boolean): void;
  killFrame(): void;
  redirectFile(url: string): void;
  setHeartBeatTimer(minimumVisitLength: number, heartBeatDelay: number): void;
  setUserId(userId: string): void;
  resetUserId(): void;
  setCustomVariable(index: number, name: string, value: string, scope: string): void;
  deleteCustomVariable(index: number, scope: string): void;
  storeCustomVariablesInCookie(): void;
  setCustomDimension(customDimensionId: number, customDimensionValue: string): void;
  deleteCustomDimension(customDimensionId: number): void;
  setCampaignNameKey(name: string): void;
  setCampaignKeywordKey(keyword: string): void;
  setConversionAttributionFirstReferrer(conversionToFirstReferrer: boolean): void;
  trackEcommerceCartUpdate(grandTotal: number): void;
  disableCookies(): void;
  deleteCookies(): void;
  setCookieNamePrefix(prefix: string): void;
  setCookieDomain(domain: string): void;
  setCookiePath(path: string): void;
  setSecureCookie(secure: boolean): void;
  setVisitorCookieTimeout(seconds: number): void;
  setReferralCookieTimeout(seconds: number): void;
  setSessionCookieTimeout(seconds: number): void;
  addListener(element: Element): void;
  setRequestMethod(method: string): void;
  setCustomRequestProcessing(callback: (queryParameters: string) => void): void;
  setRequestContentType(contentType: string): void;
  trackEcommerceOrder(
    orderId: string,
    grandTotal: number,
    subTotal?: number,
    tax?: number,
    shipping?: number,
    discount?: number
  ): void;
  trackContentInteraction(
    contentInteraction: string,
    contentName: string,
    contentPiece: string,
    contentTarget: string
  ): void
}

/**
 * Promises
 */
interface IMatomoTrackerFunction {
  getPiwikUrl(): Promise<string>;
  getCurrentUrl(): Promise<string>;
  getLinkTrackingTimer(): Promise<number>;
  getVisitorId(): Promise<string>;
  getVisitorInfo(): Promise<any[]>;
  getAttributionInfo(): Promise<any[]>;
  getAttributionCampaignName(): Promise<string>;
  getAttributionCampaignKeyword(): Promise<string>;
  getAttributionReferrerTimestamp(): Promise<string>;
  getAttributionReferrerUrl(): Promise<string>;
  getUserId(): Promise<string>;
  getCustomVariable(index: number, scope: string): Promise<string>;
  getCustomDimension(customDimensionId: number): Promise<string>;
  hasCookies(): Promise<boolean>;
}

/**
 * Wrapper for functions available for the Matomo Javascript tracker.
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

  private runMatomo(args: any[]): void {
    window._paq.push([...args]);
  }

  private promiseHandler<T>(functionName: keyof IMatomoTrackerFunction): Promise<T> {
    return new Promise((resolve, reject) => {
      window._paq.push([ function() {
        // it seems that the `this` context, will be the one of the matomo lib. Yeah, old js is hacky.
        // noinspection JSPotentiallyInvalidUsageOfClassThis
        const result = this[functionName]();
        resolve(result);
      }]);
    });
  }

  trackEvent(...args): void {this.runMatomo(args); }
  trackPageView(...args): void {this.runMatomo(args); }
  addDownloadExtensions(...args): void { this.runMatomo(args); }
  addListener(...args): void { this.runMatomo(args); }
  appendToTrackingUrl(...args): void { this.runMatomo(args); }
  deleteCookies(...args): void { this.runMatomo(args); }
  deleteCustomDimension(...args): void { this.runMatomo(args); }
  deleteCustomVariable(...args): void { this.runMatomo(args); }
  disableCookies(...args): void { this.runMatomo(args); }
  discardHashTag(...args): void { this.runMatomo(args); }
  enableCrossDomainLinking(...args): void { this.runMatomo(args); }
  enableHeartBeatTimer(...args): void { this.runMatomo(args); }
  enableLinkTracking(...args): void { this.runMatomo(args); }
  killFrame(...args): void { this.runMatomo(args); }
  logAllContentBlocksOnPage(...args): void { this.runMatomo(args); }
  redirectFile(...args): void { this.runMatomo(args); }
  removeDownloadExtensions(...args): void { this.runMatomo(args); }
  resetUserId(...args): void { this.runMatomo(args); }
  setApiUrl(...args): void { this.runMatomo(args); }
  setCampaignKeywordKey(...args): void { this.runMatomo(args); }
  setCampaignNameKey(...args): void { this.runMatomo(args); }
  setConversionAttributionFirstReferrer(...args): void { this.runMatomo(args); }
  setCookieDomain(...args): void { this.runMatomo(args); }
  setCookieNamePrefix(...args): void { this.runMatomo(args); }
  setCookiePath(...args): void { this.runMatomo(args); }
  setCrossDomainLinkingTimeout(...args): void { this.runMatomo(args); }
  setCustomDimension(...args): void { this.runMatomo(args); }
  setCustomRequestProcessing(...args): void { this.runMatomo(args); }
  setCustomUrl(...args): void { this.runMatomo(args); }
  setCustomVariable(...args): void { this.runMatomo(args); }
  setDoNotTrack(...args): void { this.runMatomo(args); }
  setDocumentTitle(...args): void { this.runMatomo(args); }
  setDomains(...args): void { this.runMatomo(args); }
  setDownloadClasses(...args): void { this.runMatomo(args); }
  setDownloadExtensions(...args): void { this.runMatomo(args); }
  setGenerationTimeMs(...args): void { this.runMatomo(args); }
  setHeartBeatTimer(...args): void { this.runMatomo(args); }
  setIgnoreClasses(...args): void { this.runMatomo(args); }
  setLinkClasses(...args): void { this.runMatomo(args); }
  setLinkTrackingTimer(...args): void { this.runMatomo(args); }
  setReferralCookieTimeout(...args): void { this.runMatomo(args); }
  setReferrerUrl(...args): void { this.runMatomo(args); }
  setRequestContentType(...args): void { this.runMatomo(args); }
  setRequestMethod(...args): void { this.runMatomo(args); }
  setSecureCookie(...args): void { this.runMatomo(args); }
  setSessionCookieTimeout(...args): void { this.runMatomo(args); }
  setSiteId(...args): void { this.runMatomo(args); }
  setTrackerUrl(...args): void { this.runMatomo(args); }
  setUserId(...args): void { this.runMatomo(args); }
  setVisitorCookieTimeout(...args): void { this.runMatomo(args); }
  storeCustomVariablesInCookie(...args): void { this.runMatomo(args); }
  trackAllContentImpressions(...args): void { this.runMatomo(args); }
  trackContentImpression(...args): void { this.runMatomo(args); }
  trackContentImpressionsWithinNode(...args): void { this.runMatomo(args); }
  trackContentInteractionNode(...args): void { this.runMatomo(args); }
  trackEcommerceCartUpdate(...args): void { this.runMatomo(args); }
  trackGoal(...args): void { this.runMatomo(args); }
  trackLink(...args): void { this.runMatomo(args); }
  trackSiteSearch(...args): void { this.runMatomo(args); }
  trackVisibleContentImpressions(...args): void { this.runMatomo(args); }
  trackEcommerceOrder(...args): void { this.runMatomo(args); }
  trackContentInteraction(...args): void { this.runMatomo(args); }

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
  getCustomVariable(index: number, scope: string): Promise<string> { return this.promiseHandler<string>('getCustomVariable'); }
  getCustomDimension(customDimensionId: number): Promise<string> { return this.promiseHandler<string>('getCustomDimension'); }
  hasCookies(): Promise<boolean> { return this.promiseHandler<boolean>('hasCookies'); }

}
