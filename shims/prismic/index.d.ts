// shim for $prismic on Vue prototype - injected by prismic-vue
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi'

export default interface IPrismic {
  api: ResolvedApi
  apiEndpoint: 'https://pomona.cdn.prismic.io/api/v2'
  asDate(date: string): Date
  asHtml(
    richText: any,
    linkResolver?: (doc: any) => string,
    htmlSerializer?: HTMLSerializer<string>
  ): string
  asLink(link: any, linkResolver?: (doc: any) => string): string
  asText(richText: any, joinString?: string): string
  dom: DOM
  htmlSerializer: HTMLSerializer<string>
  linkResolver: (doc: any) => string
  predicates: {
    at(
      fragment: string,
      value:
        | string
        | number
        | boolean
        | Date
        | (string | number | boolean | Date)[]
    ): string
    not(
      fragment: string,
      value:
        | string
        | number
        | boolean
        | Date
        | (string | number | boolean | Date)[]
    ): string
    missing(fragment: string): string
    has(fragment: string): string
    any(fragment: string, values: (string | number | boolean | Date)[]): string
    in(fragment: string, values: string[]): string
    fulltext(fragment: string, value: string): string
    similar(documentId: string, maxResults: number): string
    date: {
      before(fragment: string, before: string | number | boolean | Date): string
      after(fragment: string, after: string | number | boolean | Date): string
      between(
        fragment: string,
        before: string | number | boolean | Date,
        after: string | number | boolean | Date
      ): string
      dayOfMonth(fragment: string, day: number): string
      dayOfMonthAfter(fragment: string, day: number): string
      dayOfMonthBefore(fragment: string, day: number): string
      dayOfWeek(fragment: string, day: string | number): string
      dayOfWeekAfter(fragment: string, day: string | number): string
      dayOfWeekBefore(fragment: string, day: string | number): string
      month(fragment: string, month: string | number): string
      monthBefore(fragment: string, month: string | number): string
      monthAfter(fragment: string, month: string | number): string
      year(fragment: string, year: number): string
      hour(fragment: string, hour: number): string
      hourBefore(fragment: string, hour: number): string
      hourAfter(fragment: string, hour: number): string
    }
    dateBefore: (
      fragment: string,
      before: string | number | boolean | Date
    ) => string
    dateAfter: (
      fragment: string,
      after: string | number | boolean | Date
    ) => string
    dateBetween: (
      fragment: string,
      before: string | number | boolean | Date,
      after: string | number | boolean | Date
    ) => string
    dayOfMonth: (fragment: string, day: number) => string
    dayOfMonthAfter: (fragment: string, day: number) => string
    dayOfMonthBefore: (fragment: string, day: number) => string
    dayOfWeek: (fragment: string, day: string | number) => string
    dayOfWeekAfter: (fragment: string, day: string | number) => string
    dayOfWeekBefore: (fragment: string, day: string | number) => string
    month: (fragment: string, month: string | number) => string
    monthBefore: (fragment: string, month: string | number) => string
    monthAfter: (fragment: string, month: string | number) => string
    year: (fragment: string, year: number) => string
    hour: (fragment: string, hour: number) => string
    hourBefore: (fragment: string, hour: number) => string
    hourAfter: (fragment: string, hour: number) => string
    number: {
      gt(fragment: string, value: number): string
      lt(fragment: string, value: number): string
      inRange(fragment: string, before: number, after: number): string
    }
    gt: (fragment: string, value: number) => string
    lt: (fragment: string, value: number) => string
    inRange: (fragment: string, before: number, after: number) => string
    near: (
      fragment: string,
      latitude: number,
      longitude: number,
      radius: number
    ) => string
    geopoint: {
      near(
        fragment: string,
        latitude: number,
        longitude: number,
        radius: number
      ): string
    }
  }
}
