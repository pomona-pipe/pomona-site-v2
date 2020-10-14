import ResolvedApi from 'prismic-javascript/src/ResolvedApi'
import Predicates from 'prismic-javascript/src/Predicates'
import { LinkResolver } from 'prismic-javascript/src/PreviewResolver'
import { Link, RichText, HTMLSerializer, } from 'prismic-dom'

interface DOM {
  Date: (date: string) => Date
  Link: typeof Link
  RichText: typeof RichText
}

export default interface Prismic {
  api: ResolvedApi
  apiEndpoint: string
  asDate(date: string): Date
  asHtml(
    richText: any,
    linkResolver?: (doc: any) => string,
    htmlSerializer?: typeof HTMLSerializer
  ): string
  asLink(link: any, linkResolver?: LinkResolver): string
  asText(richText: any, joinString?: string): string
  dom: DOM
  htmlSerializer: typeof HTMLSerializer
  linkResolver: LinkResolver
  predicates: typeof Predicates
  preview: () => void
}
