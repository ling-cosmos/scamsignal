import { analyzeMessage } from './analyze-message'
import type { Language, RiskAssessment } from './result-schema'

const copy = {
  en: {
    urgency: 'Uses urgent or threatening language.', credential_request: 'Mentions secret codes or account credentials.', bait: 'Uses prize, job, or parcel-fee bait.', shortened_link: 'Contains a shortened link whose destination is hidden.', lookalike_domain: 'Contains a domain resembling a known service.',
    none: 'No built-in rule matched. This does not establish that the message is safe.',
    actions: ['Verify the sender through an official app or a contact you already trust.', 'Do not share passwords, PINs, or one-time codes, or pay through an unverified link.'],
  },
  fil: {
    urgency: 'Gumagamit ng pagmamadali o pagbabanta.', credential_request: 'Binabanggit ang lihim na code o account credential.', bait: 'Gumagamit ng premyo, trabaho, o parcel fee bilang pain.', shortened_link: 'May pinaikling link na hindi ipinapakita ang destinasyon.', lookalike_domain: 'May domain na ginagaya ang kilalang serbisyo.',
    none: 'Walang tumugmang rule. Hindi nito pinatutunayang ligtas ang mensahe.',
    actions: ['Kumpirmahin ang sender sa opisyal na app o pinagkakatiwalaang contact.', 'Huwag magbigay ng password, PIN, o OTP, o magbayad sa hindi beripikadong link.'],
  },
  ceb: {
    urgency: 'Naggamit og pagdali o hulga.', credential_request: 'Naglakip og sekretong code o account credential.', bait: 'Naggamit og premyo, trabaho, o parcel fee nga paon.', shortened_link: 'Adunay gipamubong link nga gitago ang destinasyon.', lookalike_domain: 'Adunay domain nga nagsundog sa nailhang serbisyo.',
    none: 'Walay natumbok nga rule. Dili kini pamatuod nga luwas ang mensahe.',
    actions: ['Kumpirmaha ang sender pinaagi sa opisyal nga app o kasaligang contact.', 'Ayaw ipaambit ang password, PIN, o OTP, o mobayad sa wala mapamatud-ang link.'],
  },
}

/** Explicit, provider-free demo of the original project's deterministic rules. */
export function demoAssessment(message: string, language: Language): RiskAssessment {
  const hits = analyzeMessage(message)
  const localized = copy[language]
  const elevated = hits.some(hit => hit.code === 'credential_request' || hit.code === 'lookalike_domain')
  return {
    risk: elevated || hits.length >= 3 ? 'high' : hits.length ? 'medium' : 'low',
    reasons: hits.length ? hits.map(hit => localized[hit.code]) : [localized.none],
    what_to_do: [...localized.actions],
  }
}
