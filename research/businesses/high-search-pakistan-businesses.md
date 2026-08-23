# High-Search Pakistan Business and Directory Research

**Research date:** 23 August 2026  
**Scope:** Business and directory entities only.  
**Database status:** No business records were created or modified.  
**Application status:** No application code, routes, or existing business listings were modified.

## Purpose

This file contains a defensible set of high-value Pakistani business and organization candidates for manual entry into ListPak. Candidates were selected from current search-result signals, official business pages, official branch/location pages, and competitive directory patterns. The file deliberately avoids invented search volumes. “SEO opportunity” is a qualitative prioritization based on brand demand, city/category intent, service intent, public-source completeness, and likely directory usefulness.

The candidates cover banking, insurance, telecom, internet, airlines, travel agencies, hotels, restaurants, hospitals, universities, schools, real estate, software, courier/logistics, e-commerce, apparel, automobile dealerships, transportation, recruitment, and utilities. They should be manually checked against the live Firestore `businesses` collection by normalized name, official website, phone, city, and slug before entry.

## Important manual-entry rules

Every candidate must enter through the existing business listing structure and remain `pending` or unapproved until reviewed. Do not hardcode names into application code, create a second business table, bypass validation, overwrite an existing user listing, or publish a duplicate. A public company website is not proof that the business has claimed or verified a ListPak profile.

Where the table says **verify official locator**, do not guess the address, phone, email, hours, or branch. Use the company’s official contact/branch page at the time of entry. Business hours are marked “verify” for nearly all national entities because hours vary by branch and can change.

Do not create ratings or reviews from search snippets. Start new records at `rating: 0`, `reviewCount: 0`, and `reviews: []`. Do not mark a record verified, claimed, or featured until the normal ListPak process supports that state. For hospitals, banks, insurers, schools, and airlines, add an official disclaimer or source note where required and avoid presenting ListPak as the official service provider.

## Summary selection table

| # | Entity | ListPak category | Subcategory | Primary city/location | SEO opportunity | Search-intent focus |
|---:|---|---|---|---|---:|---|
| 1 | HBL | Finance & Banking | Commercial bank | Karachi / nationwide | 9.6/10 | branch, helpline, account, contact |
| 2 | Meezan Bank | Finance & Banking | Islamic bank | Karachi / nationwide | 9.6/10 | branch, ATM, Islamic banking |
| 3 | United Bank Limited (UBL) | Finance & Banking | Commercial bank | Karachi / nationwide | 9.3/10 | branch, UBL digital, contact |
| 4 | National Bank of Pakistan | Finance & Banking | Public-sector bank | Karachi / nationwide | 9.1/10 | branch, helpline, government banking |
| 5 | EFU Insurance | Finance & Banking | Insurance | Karachi / nationwide | 8.6/10 | insurance, policy, claims, contact |
| 6 | Jazz | Technology & IT | Mobile network operator | Islamabad / nationwide | 9.7/10 | packages, SIM, 5G, helpline |
| 7 | PTCL | Technology & IT | Telecom and broadband | Islamabad / nationwide | 9.7/10 | internet, package, helpline, complaint |
| 8 | Nayatel | Technology & IT | Fiber ISP | Islamabad / nationwide | 9.1/10 | fiber internet, coverage, contact |
| 9 | Pakistan International Airlines (PIA) | Travel & Tourism | Airline | Karachi / nationwide | 9.8/10 | booking, flight status, contact |
| 10 | Airblue | Travel & Tourism | Airline | Islamabad / nationwide | 9.3/10 | booking, schedule, baggage |
| 11 | SereneAir | Travel & Tourism | Airline | Islamabad / nationwide | 9.0/10 | ticket, schedule, baggage |
| 12 | Rehman Travels | Travel & Tourism | Travel agency | Islamabad / Pakistan | 8.5/10 | visa, ticket, Umrah, tours |
| 13 | Sastaticket.pk | Travel & Tourism | Online travel agency | Karachi / Pakistan | 8.9/10 | cheap flights, bus, hotel booking |
| 14 | Pearl-Continental Hotels | Travel & Tourism | Hotel and resort group | Multiple cities | 9.2/10 | hotel, booking, city property |
| 15 | Islamabad Serena Hotel | Travel & Tourism | Hotel | Islamabad | 8.9/10 | hotel, room, restaurant, booking |
| 16 | Monal Lahore | Restaurants & Food | Pakistani/continental restaurant | Lahore | 8.8/10 | menu, reviews, location, hours |
| 17 | Kolachi Restaurant | Restaurants & Food | Pakistani restaurant | Karachi | 8.9/10 | menu, location, reviews, hours |
| 18 | Salt'n Pepper Restaurants | Restaurants & Food | Restaurant group | Lahore / Pakistan | 8.7/10 | menu, branch, delivery, reviews |
| 19 | Aga Khan University Hospital | Healthcare & Medical | Hospital and medical centers | Karachi / Pakistan | 9.8/10 | doctors, appointment, hospital contact |
| 20 | Shaukat Khanum Memorial Cancer Hospital | Healthcare & Medical | Cancer hospital | Lahore / Pakistan | 9.7/10 | cancer hospital, appointment, donation |
| 21 | Indus Hospital & Health Network | Healthcare & Medical | Hospital and health network | Karachi / Pakistan | 9.2/10 | hospital, free treatment, donation |
| 22 | NUST | Education & Training | University | Islamabad | 9.8/10 | admissions, programs, fee, contact |
| 23 | LUMS | Education & Training | University | Lahore | 9.6/10 | admissions, programs, fee, contact |
| 24 | FAST-NUCES | Education & Training | University | Islamabad / multiple campuses | 9.5/10 | admissions, CS, programs, fee |
| 25 | Beaconhouse School System | Education & Training | School system | Lahore / nationwide | 9.2/10 | school near me, admissions, fees |
| 26 | Zameen.com | Real Estate & Property | Property portal | Lahore / Pakistan | 9.8/10 | property, houses, plots, rent |
| 27 | Graana.com | Real Estate & Property | Property portal | Islamabad / Pakistan | 8.9/10 | property, rent, projects, agents |
| 28 | Bahria Town | Real Estate & Property | Developer and housing society | Multiple cities | 9.6/10 | plots, houses, projects, contact |
| 29 | Systems Limited | Technology & IT | Enterprise software and IT services | Lahore / Pakistan | 9.1/10 | software house, IT services, careers |
| 30 | NetSol Technologies | Technology & IT | Enterprise software | Lahore / Pakistan | 8.9/10 | software company, careers, IT services |
| 31 | 10Pearls | Technology & IT | Software and digital services | Islamabad / Pakistan | 8.8/10 | software company, development, careers |
| 32 | Arbisoft | Technology & IT | Software and AI services | Lahore / Pakistan | 8.6/10 | software house, AI, careers |
| 33 | TCS Courier | Logistics & Courier | Courier and logistics | Karachi / nationwide | 9.7/10 | tracking, courier, branch, contact |
| 34 | Leopards Courier | Logistics & Courier | Courier, COD, logistics | Karachi / nationwide | 9.7/10 | tracking, branch, COD, contact |
| 35 | M&P Express Logistics | Logistics & Courier | Courier and logistics | Karachi / nationwide | 8.9/10 | tracking, courier, branch |
| 36 | Daraz | Retail & Shopping | E-commerce marketplace | Karachi / Pakistan | 9.8/10 | shopping, seller, delivery, returns |
| 37 | PriceOye | Retail & Shopping | Electronics e-commerce | Karachi / Pakistan | 9.2/10 | mobile price, electronics, delivery |
| 38 | Telemart | Retail & Shopping | Electronics e-commerce and stores | Pakistan / confirm HQ | 9.0/10 | mobile, electronics, store, delivery |
| 39 | Khaadi | Retail & Shopping | Apparel and lifestyle retail | Karachi / nationwide | 9.2/10 | clothing, store, sale, online shopping |
| 40 | Toyota Indus Motor | Automotive & Vehicles | Automobile manufacturer/dealer network | Karachi / Pakistan | 9.5/10 | dealership, price, booking, service |
| 41 | Honda Atlas Cars | Automotive & Vehicles | Automobile manufacturer/dealer network | Lahore / Pakistan | 9.3/10 | dealership, price, booking, service |
| 42 | Pak Suzuki Motor | Automotive & Vehicles | Automobile manufacturer/dealer network | Karachi / Pakistan | 9.4/10 | dealership, price, parts, service |
| 43 | Faisal Movers | Transport & Logistics | Intercity bus and transport | Lahore / Pakistan | 9.1/10 | ticket, schedule, terminal, contact |
| 44 | ROZEE.PK | Hiring Company / HR | Recruitment and jobs platform | Lahore / Pakistan | 9.6/10 | jobs, employers, careers, recruitment |
| 45 | Mustakbil.com | Hiring Company / HR | Recruitment and jobs platform | Lahore / Pakistan | 8.9/10 | jobs, CV, employers, recruitment |
| 46 | Sui Northern Gas Pipelines Limited (SNGPL) | Energy & Utilities | Gas utility | Lahore / northern Pakistan | 9.4/10 | bill, complaint, helpline, new connection |

## Complete manual-entry records

### 1. HBL

| Field | Manual-entry value |
|---|---|
| Business name | HBL — Habib Bank Limited |
| Category / subcategory | Finance & Banking / Commercial bank |
| City / province / country | Karachi / Sindh / Pakistan; national branch network |
| Address | Verify the official head-office or branch locator before entry |
| Public phone / email | Verify official Contact Us page before entry |
| Website | https://www.hbl.com/ |
| Social profiles | Use only the official HBL profiles linked from the official website |
| Description | HBL is a major Pakistani bank offering personal, business, Islamic, digital banking, accounts, cards, loans, remittance, wealth, and Roshan Digital Account services. |
| Services | Personal banking; business banking; Islamic banking; accounts; cards; loans; digital banking; remittance; wealth; branch and ATM services |
| Hours | Verify per branch; do not use national hours for a branch listing |
| Search intent | HBL branch near me; HBL helpline; HBL account; HBL contact; HBL digital banking; HBL branch hours |
| Relevant keywords | HBL Pakistan; Habib Bank Limited; HBL branch Karachi; HBL branch Lahore; HBL customer care; HBL digital account |
| SEO opportunity | 9.6/10 — national brand plus high-volume branch and product intent |
| Research justification | Current search results place HBL’s official site prominently for Pakistan banking queries, and the official site exposes multiple product, service, and contact paths. |
| Source URLs | https://www.hbl.com/ ; https://www.hbl.com/contact-us ; https://www.hbl.com/personal/digital-banking |

### 2. Meezan Bank

| Field | Manual-entry value |
|---|---|
| Business name | Meezan Bank Limited |
| Category / subcategory | Finance & Banking / Islamic bank |
| City / province / country | Karachi / Sindh / Pakistan; more than 300 cities according to its official branch page |
| Address | Meezan House, C-25 Estate Avenue, SITE, Karachi — verify current official page before entry |
| Public phone / email | +92 21 111 331 331; +92 21 111 331 332; info@meezanbank.com — verify before entry |
| Website | https://www.meezanbank.com/ |
| Social profiles | Use official profiles linked from meezanbank.com |
| Description | Meezan Bank is a Pakistan-focused Islamic bank with a large branch and ATM network, digital accounts, remittance, business banking, and Islamic financial products. |
| Services | Islamic banking; accounts; branch and ATM services; digital accounts; remittance; business banking; cards; financing |
| Hours | Verify per branch and Saturday service status using the official branch locator |
| Search intent | Meezan Bank branch; Meezan Bank ATM; Islamic bank Pakistan; Meezan contact; Meezan account |
| Relevant keywords | Meezan Bank Pakistan; Meezan Bank Karachi; Meezan branch Lahore; Meezan ATM near me; Meezan Bank helpline |
| SEO opportunity | 9.6/10 — strong Islamic-banking and branch-location intent |
| Research justification | The current official branch locator states that the bank has more than 1,000 branches in more than 300 cities across Pakistan and provides city/branch selection. |
| Source URLs | https://www.meezanbank.com/branch-locator/ ; https://www.meezanbank.com/ |

### 3. United Bank Limited (UBL)

| Field | Manual-entry value |
|---|---|
| Business name | United Bank Limited (UBL) |
| Category / subcategory | Finance & Banking / Commercial bank |
| City / province / country | Karachi / Sindh / Pakistan; nationwide branches |
| Address | Verify official branch list before entry |
| Public phone / email | Verify official Contact Us page before entry |
| Website | https://www.ubldigital.com/ |
| Social profiles | Use official UBL profiles linked from the official website |
| Description | UBL is a Pakistani commercial bank with personal and business banking, digital banking, cards, loans, remittance, and branch/ATM services. |
| Services | Digital banking; accounts; cards; loans; remittance; branch and ATM services; business banking |
| Hours | Verify per branch |
| Search intent | UBL branch near me; UBL helpline; UBL digital account; UBL ATM; UBL branch hours |
| Relevant keywords | UBL Pakistan; UBL branch Karachi; UBL branch Lahore; UBL contact; UBL digital |
| SEO opportunity | 9.3/10 |
| Research justification | Current search results surfaced the official UBL branch page and official branch-list PDF, indicating strong branch and contact intent. |
| Source URLs | https://www.ubldigital.com/Branches ; https://www.ubldigital.com/ ; https://www.ubldigital.com/portals/0/more/branchlist/UBL%20Branch%20List.pdf |

### 4. National Bank of Pakistan

| Field | Manual-entry value |
|---|---|
| Business name | National Bank of Pakistan (NBP) |
| Category / subcategory | Finance & Banking / Public-sector bank |
| City / province / country | Karachi / Sindh / Pakistan; nationwide |
| Address | Verify official head office or branch locator |
| Public phone / email | 111-627-627 or 021-111-627-627; customer@nbp.com.pk — verify current official contact page |
| Website | https://www.nbp.com.pk/ |
| Social profiles | Use only official NBP profiles |
| Description | National Bank of Pakistan is a nationwide Pakistani bank offering consumer, business, government, remittance, and branch services. |
| Services | Accounts; branch banking; remittance; public-sector banking; cards; financing; digital services |
| Hours | Verify per branch |
| Search intent | NBP branch; NBP helpline; NBP contact; NBP ATM; National Bank Pakistan |
| Relevant keywords | National Bank of Pakistan; NBP branch Karachi; NBP branch Lahore; NBP customer care |
| SEO opportunity | 9.1/10 |
| Research justification | Current search results surfaced the official NBP website for branch and contact queries, including a public customer-service number and email. |
| Source URLs | https://www.nbp.com.pk/ ; https://www.nbp.com.pk/contact/ |

### 5. EFU Insurance

| Field | Manual-entry value |
|---|---|
| Business name | EFU Insurance Group |
| Category / subcategory | Finance & Banking / Insurance |
| City / province / country | Karachi / Sindh / Pakistan; nationwide branch/service network |
| Address | Verify official company contact page |
| Public phone / email | Verify official contact page |
| Website | https://www.efulife.com/ and https://www.efuinsurance.com/ |
| Social profiles | Use the official EFU profiles linked from the relevant company website |
| Description | EFU is a major Pakistan insurance group serving life, health, general, corporate, and financial-protection needs through its operating companies. |
| Services | Life insurance; health protection; general insurance; corporate insurance; claims; financial planning |
| Hours | Verify per branch or service center |
| Search intent | EFU insurance Pakistan; EFU life policy; EFU claims; EFU contact; insurance company Karachi |
| Relevant keywords | EFU Insurance; EFU Life Pakistan; EFU health insurance; EFU branch Karachi; EFU claims |
| SEO opportunity | 8.6/10 |
| Research justification | Insurance-related searches are commercially valuable and regulated; EFU is an established entity with official corporate pages and public policy/claims intent. |
| Source URLs | https://www.efulife.com/ ; https://www.efuinsurance.com/ ; https://www.secp.gov.pk/document/list-of-active-insurers/ |

### 6. Jazz

| Field | Manual-entry value |
|---|---|
| Business name | Jazz — Pakistan Mobile Communications Limited |
| Category / subcategory | Technology & IT / Mobile network operator |
| City / province / country | Islamabad / Federal Capital / Pakistan; nationwide |
| Address | Verify official contact page |
| Public phone / email | Official WhatsApp self-service: 0300 300 8000; verify before entry |
| Website | https://jazz.com.pk/ |
| Social profiles | Use official Jazz profiles linked from jazz.com.pk |
| Description | Jazz is a Pakistan mobile and digital-services operator offering prepaid, postpaid, data, apps, SIM ordering, recharge, 5G, and customer self-service. |
| Services | Mobile SIMs; prepaid; postpaid; data; 5G; recharge; mobile apps; WhatsApp self-service; digital products |
| Hours | Digital support is available through official channels; physical outlets require location-specific hours |
| Search intent | Jazz packages; Jazz SIM; Jazz helpline; Jazz 5G; Jazz franchise near me; Jazz balance/recharge |
| Relevant keywords | Jazz Pakistan; Jazz 5G; Jazz packages; Jazz franchise Karachi; Jazz customer care |
| SEO opportunity | 9.7/10 |
| Research justification | The current official homepage prominently exposes 5G, prepaid/postpaid offers, SIM ordering, recharge, and official WhatsApp self-service, creating strong product and support intent. |
| Source URLs | https://jazz.com.pk/ ; https://jazz.com.pk/help/contact-us ; https://jazz.com.pk/order-a-sim |

### 7. PTCL

| Field | Manual-entry value |
|---|---|
| Business name | Pakistan Telecommunication Company Limited (PTCL) |
| Category / subcategory | Technology & IT / Telecom and broadband |
| City / province / country | Islamabad / Federal Capital / Pakistan; nationwide |
| Address | Verify official contact/location page |
| Public phone / email | Verify official customer-care page |
| Website | https://ptcl.com.pk/ |
| Social profiles | Use official PTCL profiles linked from ptcl.com.pk |
| Description | PTCL provides fixed-line, broadband, fiber, enterprise connectivity, digital services, and customer support across Pakistan. |
| Services | Broadband; fiber where available; telephone; enterprise connectivity; digital services; billing and support |
| Hours | Verify per exchange, franchise, or service center |
| Search intent | PTCL internet; PTCL packages; PTCL helpline; PTCL complaint; PTCL branch near me |
| Relevant keywords | PTCL Pakistan; PTCL internet; PTCL fiber; PTCL contact; PTCL complaint number |
| SEO opportunity | 9.7/10 |
| Research justification | PTCL is a recurring national brand in current Pakistan internet-provider searches and has strong city, complaint, package, and support intent. |
| Source URLs | https://ptcl.com.pk/ ; https://ptcl.com.pk/Home/PageDetail?ItemId=8 |

### 8. Nayatel

| Field | Manual-entry value |
|---|---|
| Business name | Nayatel |
| Category / subcategory | Technology & IT / Fiber internet service provider |
| City / province / country | Islamabad / Federal Capital / Pakistan; service-area dependent |
| Address | Verify official service-area/contact page |
| Public phone / email | Verify official contact page |
| Website | https://nayatel.com/ |
| Social profiles | Use official Nayatel profiles linked from nayatel.com |
| Description | Nayatel is a Pakistan fiber internet and IT service provider offering high-speed connectivity, cloud, security, and business services. |
| Services | Fiber internet; broadband; cloud services; enterprise connectivity; managed services; digital support |
| Hours | Verify per service center and area |
| Search intent | Nayatel internet; Nayatel packages; Nayatel coverage; Nayatel helpline; Nayatel complaint |
| Relevant keywords | Nayatel Pakistan; Nayatel Islamabad; Nayatel fiber; Nayatel internet packages |
| SEO opportunity | 9.1/10 |
| Research justification | Current search results surfaced the official Nayatel website for high-speed fiber and IT services, while ISP comparison queries repeatedly include Nayatel. |
| Source URLs | https://nayatel.com/ ; https://nayatel.com/contact-us/ |

### 9. Pakistan International Airlines (PIA)

| Field | Manual-entry value |
|---|---|
| Business name | Pakistan International Airlines (PIA) |
| Category / subcategory | Travel & Tourism / Airline |
| City / province / country | Karachi / Sindh / Pakistan; national airline |
| Address | Verify official contact page or airport office |
| Public phone / email | Verify official contact page |
| Website | https://www.piac.com.pk/ |
| Social profiles | Use official PIA profiles linked from piac.com.pk |
| Description | PIA is Pakistan’s national airline offering domestic and international flights, online booking, web check-in, flight status, baggage, special assistance, and travel services. |
| Services | Ticket booking; flight status; web check-in; baggage; seat selection; pre-book meals; special assistance; charter flights |
| Hours | Airport and ticket-office hours vary; verify per office |
| Search intent | PIA booking; PIA flight status; PIA contact; PIA baggage; PIA ticket price |
| Relevant keywords | Pakistan International Airlines; PIA Pakistan; PIA booking; PIA flight status; PIA Karachi |
| SEO opportunity | 9.8/10 |
| Research justification | The current official site exposes booking, web check-in, flight status, schedules, baggage, and special-assistance paths, indicating broad transactional search coverage. |
| Source URLs | https://www.piac.com.pk/ ; https://www.piac.com.pk/flight-status ; https://www.piac.com.pk/contact-us |

### 10. Airblue

| Field | Manual-entry value |
|---|---|
| Business name | Airblue Limited |
| Category / subcategory | Travel & Tourism / Airline |
| City / province / country | Islamabad / Federal Capital / Pakistan; domestic and international |
| Address | Verify official contact page |
| Public phone / email | Verify official contact page |
| Website | https://www.airblue.com/ |
| Social profiles | Use official Airblue profiles linked from airblue.com |
| Description | Airblue is a Pakistani private airline offering domestic and international passenger flights, online booking, schedules, baggage, and customer support. |
| Services | Flight booking; schedules; check-in; baggage; flight status; customer support |
| Hours | Verify airport/ticket-office hours |
| Search intent | Airblue booking; Airblue flight schedule; Airblue baggage; Airblue contact; Airblue ticket |
| Relevant keywords | Airblue Pakistan; Airblue Islamabad; Airblue flight; Airblue booking |
| SEO opportunity | 9.3/10 |
| Research justification | Airline-brand searches carry direct booking and flight-status intent and are well suited to city/airport landing pages after official data validation. |
| Source URLs | https://www.airblue.com/ ; https://www.airblue.com/contact |

### 11. SereneAir

| Field | Manual-entry value |
|---|---|
| Business name | SereneAir |
| Category / subcategory | Travel & Tourism / Airline |
| City / province / country | Islamabad / Federal Capital / Pakistan |
| Address | Verify official contact page |
| Public phone / email | Verify official contact page |
| Website | https://sereneair.com/ |
| Social profiles | Use official SereneAir profiles linked from sereneair.com |
| Description | SereneAir is a Pakistan airline serving domestic and selected international routes with online booking, schedules, baggage, and passenger support. |
| Services | Flight booking; schedules; web check-in; baggage; flight status; passenger support |
| Hours | Verify airport/ticket-office hours |
| Search intent | SereneAir booking; SereneAir schedule; SereneAir ticket; SereneAir baggage; SereneAir contact |
| Relevant keywords | Serene Air Pakistan; SereneAir Islamabad; SereneAir booking; SereneAir flight schedule |
| SEO opportunity | 9.0/10 |
| Research justification | Current Pakistan travel searches surface SereneAir in ticket and route comparisons; airline pages can target city-pair, booking, baggage, and support queries. |
| Source URLs | https://sereneair.com/ ; https://sereneair.com/contact-us |

### 12. Rehman Travels

| Field | Manual-entry value |
|---|---|
| Business name | Rehman Travels (Pvt.) Ltd. |
| Category / subcategory | Travel & Tourism / Travel agency |
| City / province / country | Islamabad / Pakistan; verify branch city before entry |
| Address | Verify official travel-agency contact page |
| Public phone / email | Verify official contact page; do not rely on third-party snippets |
| Website | https://www.rehmantravel.com/ |
| Social profiles | Use official Rehman Travels profiles linked from the official site |
| Description | Rehman Travels is a Pakistan travel agency offering air-ticketing, visa consultancy, tours, Hajj/Umrah, and travel arrangements. |
| Services | Airline tickets; visa consultancy; tours; Hajj and Umrah; hotel booking; travel support |
| Hours | Verify each office |
| Search intent | best travel agent Pakistan; Rehman Travels Islamabad; visa consultant; Hajj Umrah travel agency; air ticket |
| Relevant keywords | Rehman Travels Pakistan; travel agency Islamabad; visa consultant Pakistan; Umrah packages |
| SEO opportunity | 8.5/10 |
| Research justification | Current searches for Pakistan travel agencies and visa/air-ticket services surfaced Rehman Travels pages and travel-service comparisons. |
| Source URLs | https://www.rehmantravel.com/ ; https://www.rehmantravel.com/travel-agency/best-travel-agent-in-pakistan |

### 13. Sastaticket.pk

| Field | Manual-entry value |
|---|---|
| Business name | Sastaticket.pk |
| Category / subcategory | Travel & Tourism / Online travel agency |
| City / province / country | Pakistan; confirm operating city before entry |
| Address | Verify official company contact page |
| Public phone / email | Verify official contact page |
| Website | https://www.sastaticket.pk/ |
| Social profiles | Use official Sastaticket profiles linked from the website |
| Description | Sastaticket.pk is an online travel platform for domestic and international flights, buses, and hotel booking. |
| Services | Flight booking; bus tickets; hotel booking; airline comparisons; travel support |
| Hours | Online platform; support hours must be verified |
| Search intent | cheap flights Pakistan; Sastaticket booking; bus tickets Pakistan; hotel booking Pakistan |
| Relevant keywords | Sastaticket Pakistan; cheap flights Pakistan; Airblue ticket; PIA ticket; bus booking Pakistan |
| SEO opportunity | 8.9/10 |
| Research justification | Current travel SERPs and app/store results connect Sastaticket to domestic airline, bus, and hotel booking intent. |
| Source URLs | https://www.sastaticket.pk/ ; https://www.sastaticket.pk/en-us/flights-booking ; https://apps.apple.com/id/app/sastaticket-pk-flights-bus/id1564441908 |

### 14. Pearl-Continental Hotels

| Field | Manual-entry value |
|---|---|
| Business name | Pearl-Continental Hotels & Resorts |
| Category / subcategory | Travel & Tourism / Hotel and resort group |
| City / province / country | Multiple Pakistan cities; create branch records only from official property pages |
| Address | Verify each property page; do not use a group address for all branches |
| Public phone / email | Verify each property page |
| Website | https://www.pchotels.com/ |
| Social profiles | Use official PC Hotels profiles linked from pchotels.com |
| Description | Pearl-Continental Hotels & Resorts is a Pakistan hotel group with city properties offering rooms, dining, meetings, events, and hospitality services. |
| Services | Accommodation; restaurants; banquets; conferences; events; wellness and guest services |
| Hours | Hotel operations are continuous, but restaurant and facility hours vary by property |
| Search intent | Pearl Continental Karachi; Pearl Continental Lahore; PC Hotel Islamabad; booking; restaurant; reviews |
| Relevant keywords | Pearl Continental Pakistan; PC Hotel Lahore; PC Hotel Karachi; Pearl Continental booking |
| SEO opportunity | 9.2/10 |
| Research justification | Current hotel SERPs repeatedly surface Pearl-Continental properties for city and luxury-hotel searches; branch-specific pages are more useful than one generic group record. |
| Source URLs | https://www.pchotels.com/ ; https://www.pchotels.com/hotel-and-resort/pearl-continental-hotel-karachi |

### 15. Islamabad Serena Hotel

| Field | Manual-entry value |
|---|---|
| Business name | Islamabad Serena Hotel |
| Category / subcategory | Travel & Tourism / Hotel |
| City / province / country | Islamabad / Federal Capital / Pakistan |
| Address | Verify official hotel contact page |
| Public phone / email | Verify official hotel contact page |
| Website | https://www.serenahotels.com/ |
| Social profiles | Use official Serena Hotels profiles linked from the hotel site |
| Description | Islamabad Serena Hotel is a luxury hotel in Islamabad offering accommodation, dining, meetings, events, and hospitality services. |
| Services | Rooms and suites; restaurants; events; meetings; spa/wellness; reservations |
| Hours | Hotel operates continuously; restaurant and facility hours require official verification |
| Search intent | Islamabad Serena Hotel; hotel Islamabad; Serena restaurant; booking; rooms; reviews |
| Relevant keywords | Serena Hotel Islamabad; luxury hotel Islamabad; hotel near me Islamabad |
| SEO opportunity | 8.9/10 |
| Research justification | Current hotel searches and travel-result pages repeatedly surface Islamabad Serena as a major Pakistan luxury-hotel entity. |
| Source URLs | https://www.serenahotels.com/ ; https://www.serenahotels.com/serena-hotels-islamabad |

### 16. Monal Lahore

| Field | Manual-entry value |
|---|---|
| Business name | Monal Lahore |
| Category / subcategory | Restaurants & Food / Pakistani and continental restaurant |
| City / province / country | Lahore / Punjab / Pakistan |
| Address | Verify official location page before entry |
| Public phone / email | Verify official restaurant contact page |
| Website | https://themonal.com/ |
| Social profiles | Use official Monal profiles linked from the official website |
| Description | Monal Lahore is a high-search restaurant entity associated with Pakistani, continental, and event dining in Lahore. |
| Services | Dine-in; Pakistani cuisine; continental cuisine; family dining; events; reservations |
| Hours | Verify official Lahore location hours |
| Search intent | Monal Lahore menu; Monal Lahore location; Monal Lahore reviews; Monal Lahore timings |
| Relevant keywords | Monal Lahore; restaurant Lahore; Pakistani restaurant Lahore; Monal menu |
| SEO opportunity | 8.8/10 |
| Research justification | Current restaurant searches strongly favor brand-plus-city and menu/review/timing queries; Monal appears in Pakistan dining and city-intent results. |
| Source URLs | https://themonal.com/ ; verify current Lahore property page and official social profiles |

### 17. Kolachi Restaurant

| Field | Manual-entry value |
|---|---|
| Business name | Kolachi Restaurant |
| Category / subcategory | Restaurants & Food / Pakistani restaurant |
| City / province / country | Karachi / Sindh / Pakistan |
| Address | Verify official restaurant location page |
| Public phone / email | Verify official contact page |
| Website | https://kolachi.com.pk/ |
| Social profiles | Use official Kolachi profiles linked from the official site |
| Description | Kolachi is a Karachi restaurant brand associated with Pakistani cuisine, waterfront dining, family dining, and event experiences. |
| Services | Dine-in; Pakistani food; family dining; outdoor/waterfront dining; events; reservations |
| Hours | Verify current branch hours |
| Search intent | Kolachi Karachi menu; Kolachi restaurant location; Kolachi timings; Kolachi reviews |
| Relevant keywords | Kolachi Restaurant Karachi; restaurant Karachi; Karachi dinner; Kolachi menu |
| SEO opportunity | 8.9/10 |
| Research justification | Current Pakistan food-result pages and brand/city searches repeatedly surface Kolachi as a Karachi restaurant entity. |
| Source URLs | https://kolachi.com.pk/ ; verify official location/contact page |

### 18. Salt'n Pepper Restaurants

| Field | Manual-entry value |
|---|---|
| Business name | Salt'n Pepper Restaurants |
| Category / subcategory | Restaurants & Food / Restaurant group |
| City / province / country | Lahore / Punjab / Pakistan; multiple branches to verify |
| Address | Verify per branch |
| Public phone / email | Verify official branch/contact page |
| Website | https://saltnpepper.com.pk/ |
| Social profiles | Use official Salt'n Pepper profiles |
| Description | Salt'n Pepper is a Pakistan restaurant group offering Pakistani and continental dining, delivery, branch service, and event-oriented dining. |
| Services | Dine-in; takeaway; delivery; Pakistani cuisine; continental cuisine; branch reservations |
| Hours | Verify per branch |
| Search intent | Salt'n Pepper Lahore; menu; delivery; branch; timings; reviews |
| Relevant keywords | Salt n Pepper Pakistan; Salt'n Pepper Lahore; restaurant Lahore; food delivery |
| SEO opportunity | 8.7/10 |
| Research justification | Current Pakistan restaurant comparisons repeatedly include Salt'n Pepper among recognizable dining brands; branch-plus-city pages are the primary opportunity. |
| Source URLs | https://saltnpepper.com.pk/ ; verify official branch and social pages |

### 19. Aga Khan University Hospital

| Field | Manual-entry value |
|---|---|
| Business name | Aga Khan University Hospital Pakistan |
| Category / subcategory | Healthcare & Medical / Hospital and medical centers |
| City / province / country | Karachi / Sindh / Pakistan; medical centers and laboratories across Pakistan |
| Address | Verify official Locations page and branch before entry |
| Public phone / email | Verify official Numbers/Contact page |
| Website | https://hospitals.aku.edu/pakistan/Pages/default.aspx |
| Social profiles | Use official Aga Khan University Hospital profiles |
| Description | Aga Khan University Hospital Pakistan provides hospital care, medical centers, clinical laboratories, doctor search, appointments, patient services, and health solutions. |
| Services | Hospital care; specialist doctors; diagnostics; laboratories; appointments; patient welfare; health packages |
| Hours | Emergency and facility hours vary; verify per location |
| Search intent | Aga Khan hospital Karachi; doctor appointment; lab; emergency; contact; hospital near me |
| Relevant keywords | Aga Khan University Hospital Pakistan; AKUH Karachi; Aga Khan doctors; hospital Karachi |
| SEO opportunity | 9.8/10 |
| Research justification | The official site exposes doctor search, appointments, locations, numbers, clinical specialties, and patient services, matching high-intent healthcare searches. |
| Source URLs | https://hospitals.aku.edu/pakistan/Pages/default.aspx ; https://hospitals.aku.edu/pakistan/Pages/Find-a-Location.aspx ; https://hospitals.aku.edu/pakistan/patientservices/pages/findadoctor.aspx |

### 20. Shaukat Khanum Memorial Cancer Hospital

| Field | Manual-entry value |
|---|---|
| Business name | Shaukat Khanum Memorial Cancer Hospital and Research Centre |
| Category / subcategory | Healthcare & Medical / Cancer hospital |
| City / province / country | Lahore / Punjab / Pakistan; additional Pakistan facilities require separate branch records |
| Address | Verify official Locations page |
| Public phone / email | Verify official contact page |
| Website | https://shaukatkhanum.org.pk/ |
| Social profiles | Use official Shaukat Khanum profiles |
| Description | Shaukat Khanum Memorial Cancer Hospital and Research Centre is a Pakistan cancer-care, research, fundraising, and patient-support organization. |
| Services | Cancer diagnosis; treatment; patient support; research; fundraising; welfare programs |
| Hours | Verify per facility and appointment department |
| Search intent | Shaukat Khanum hospital Lahore; cancer hospital Pakistan; appointment; donation; contact |
| Relevant keywords | Shaukat Khanum Lahore; cancer hospital Pakistan; oncology hospital; Shaukat Khanum appointment |
| SEO opportunity | 9.7/10 |
| Research justification | Official and government/medical-tourism sources repeatedly surface Shaukat Khanum for Pakistan hospital and cancer-care searches. |
| Source URLs | https://shaukatkhanum.org.pk/ ; https://shaukatkhanum.org.pk/contact-us/ ; https://mofa.gov.pk/medical-tourism-list-of-governments-recognized-hospitals-2 |

### 21. Indus Hospital & Health Network

| Field | Manual-entry value |
|---|---|
| Business name | Indus Hospital & Health Network |
| Category / subcategory | Healthcare & Medical / Hospital and health network |
| City / province / country | Karachi / Sindh / Pakistan; nationwide network |
| Address | Verify official hospital/contact page |
| Public phone / email | Verify official contact page |
| Website | https://indushospital.org.pk/ |
| Social profiles | Use official Indus Hospital profiles |
| Description | Indus Hospital & Health Network provides healthcare and public-health services in Pakistan with a strong free-care, patient-support, and donor-supported mission. |
| Services | Hospital care; diagnostics; free healthcare programs; public health; patient support; donations |
| Hours | Verify per hospital and clinic |
| Search intent | Indus Hospital Karachi; free hospital Pakistan; appointment; donation; contact |
| Relevant keywords | Indus Hospital Pakistan; Indus Hospital Karachi; free treatment hospital; Indus healthcare |
| SEO opportunity | 9.2/10 |
| Research justification | Current hospital and medical-tourism result sets include Indus Hospital among major Pakistan healthcare entities and high-intent donation/care searches. |
| Source URLs | https://indushospital.org.pk/ ; verify official locations and contact page |

### 22. NUST

| Field | Manual-entry value |
|---|---|
| Business name | National University of Sciences & Technology (NUST) |
| Category / subcategory | Education & Training / University |
| City / province / country | Islamabad / Federal Capital / Pakistan; multiple campuses |
| Address | National University of Sciences & Technology, Campus, Sector H-12, Islamabad, Pakistan — verify official admissions page |
| Public phone / email | +92-51-111-11-6878 — verify official page |
| Website | https://nust.edu.pk/ |
| Social profiles | Use official NUST profiles |
| Description | NUST is a Pakistani university with engineering, computing, business, social sciences, sciences, admissions, research, and campus services. |
| Services | Undergraduate admissions; graduate admissions; programs; scholarships; research; campus services; careers |
| Hours | Verify admissions and campus-office hours |
| Search intent | NUST admissions; NUST fee structure; NUST programs; NUST Islamabad; NUST merit |
| Relevant keywords | NUST Pakistan; NUST Islamabad; NUST admissions; NUST fee; NUST university |
| SEO opportunity | 9.8/10 |
| Research justification | Current university SERPs prominently surface NUST for admissions, program, fee, and ranking queries, with official address and phone signals. |
| Source URLs | https://nust.edu.pk/ ; https://nust.edu.pk/admissions/ |

### 23. LUMS

| Field | Manual-entry value |
|---|---|
| Business name | Lahore University of Management Sciences (LUMS) |
| Category / subcategory | Education & Training / University |
| City / province / country | Lahore / Punjab / Pakistan |
| Address | Verify official contact page |
| Public phone / email | Verify official admissions/contact page |
| Website | https://lums.edu.pk/ |
| Social profiles | Use official LUMS profiles |
| Description | LUMS is a Lahore university offering undergraduate, graduate, business, economics, law, computer science, engineering, social-science, and research programs. |
| Services | Admissions; degree programs; executive education; research; scholarships; student services |
| Hours | Verify admissions-office hours |
| Search intent | LUMS admissions; LUMS fee; LUMS programs; LUMS Lahore; LUMS merit |
| Relevant keywords | LUMS Pakistan; LUMS Lahore; LUMS admissions; LUMS fee structure |
| SEO opportunity | 9.6/10 |
| Research justification | Current Pakistan university searches repeatedly compare LUMS with NUST, FAST, IBA, and other high-intent institutions. |
| Source URLs | https://lums.edu.pk/ ; https://admissions.lums.edu.pk/ |

### 24. FAST-NUCES

| Field | Manual-entry value |
|---|---|
| Business name | FAST National University of Computer & Emerging Sciences (FAST-NUCES) |
| Category / subcategory | Education & Training / University |
| City / province / country | Islamabad / Pakistan; multiple campuses |
| Address | Verify official campus page before entry |
| Public phone / email | Verify campus admissions contact |
| Website | https://www.nu.edu.pk/ |
| Social profiles | Use official FAST-NUCES profiles |
| Description | FAST-NUCES is a Pakistan university known for computer science, engineering, business, admissions, scholarships, and multiple campuses. |
| Services | Undergraduate admissions; graduate admissions; computer science; engineering; business; scholarships; campus services |
| Hours | Verify per campus |
| Search intent | FAST university Pakistan; FAST admissions; FAST fee; FAST Islamabad; FAST CS |
| Relevant keywords | FAST NUCES; FAST university Pakistan; FAST admissions; FAST Islamabad; FAST Lahore |
| SEO opportunity | 9.5/10 |
| Research justification | Current search results surface the official FAST site for admissions, eligibility, programs, fee, and campus-related queries. |
| Source URLs | https://www.nu.edu.pk/ ; https://admissions.nu.edu.pk/ |

### 25. Beaconhouse School System

| Field | Manual-entry value |
|---|---|
| Business name | Beaconhouse School System |
| Category / subcategory | Education & Training / School system |
| City / province / country | Lahore / Punjab / Pakistan; nationwide |
| Address | Verify per campus |
| Public phone / email | Verify official campus/contact page |
| Website | https://www.beaconhouse.net/ |
| Social profiles | Use official Beaconhouse profiles |
| Description | Beaconhouse School System is a Pakistan school network offering early years, primary, secondary, and other education pathways across multiple campuses. |
| Services | School admissions; early years; primary; secondary; campus services; activities |
| Hours | Verify per campus |
| Search intent | Beaconhouse school near me; admissions; fee structure; campus; contact |
| Relevant keywords | Beaconhouse Pakistan; Beaconhouse Lahore; Beaconhouse Islamabad; school admissions Pakistan |
| SEO opportunity | 9.2/10 |
| Research justification | Current school searches repeatedly compare Beaconhouse with Roots and other Pakistan school systems, creating strong city/campus intent. |
| Source URLs | https://www.beaconhouse.net/ ; verify official campus locator |

### 26. Zameen.com

| Field | Manual-entry value |
|---|---|
| Business name | Zameen.com |
| Category / subcategory | Real Estate & Property / Property portal |
| City / province / country | Lahore / Punjab / Pakistan; nationwide |
| Address | Verify official company contact page |
| Public phone / email | Verify official contact page |
| Website | https://www.zameen.com/ |
| Social profiles | Use official Zameen profiles |
| Description | Zameen.com is a Pakistan property portal for buying, selling, and renting houses, apartments, plots, commercial property, and new projects. |
| Services | Property listings; sale; rent; new projects; agents; area guides; property search |
| Hours | Online platform; office hours require verification |
| Search intent | property for sale Pakistan; houses for rent Lahore; plots Karachi; Zameen contact; property agent |
| Relevant keywords | Zameen Pakistan; Zameen Lahore; property for rent; houses for sale; plots Pakistan |
| SEO opportunity | 9.8/10 |
| Research justification | Current real-estate searches and competitor research consistently place Zameen among the dominant Pakistan property entities. |
| Source URLs | https://www.zameen.com/ ; verify official contact/about pages |

### 27. Graana.com

| Field | Manual-entry value |
|---|---|
| Business name | Graana.com |
| Category / subcategory | Real Estate & Property / Property portal |
| City / province / country | Islamabad / Federal Capital / Pakistan |
| Address | Verify official contact page |
| Public phone / email | Verify official contact page |
| Website | https://www.graana.com/ |
| Social profiles | Use official Graana profiles |
| Description | Graana.com is a Pakistan property portal for buying, renting, selling, and researching residential and commercial real estate. |
| Services | Property listings; buying; renting; selling; project research; property services |
| Hours | Online platform; verify office hours |
| Search intent | Graana Islamabad; property for rent Pakistan; houses for sale; real estate agents |
| Relevant keywords | Graana Pakistan; Graana Islamabad; property portal Pakistan; real estate Lahore |
| SEO opportunity | 8.9/10 |
| Research justification | Current Pakistan real-estate comparisons repeatedly include Graana alongside Zameen and developer pages. |
| Source URLs | https://www.graana.com/ ; verify official contact/about pages |

### 28. Bahria Town

| Field | Manual-entry value |
|---|---|
| Business name | Bahria Town |
| Category / subcategory | Real Estate & Property / Developer and housing society |
| City / province / country | Multiple Pakistan cities; branch/project-specific record required |
| Address | Verify official project/contact page per city |
| Public phone / email | Verify official contact page |
| Website | https://bahriatown.com/ |
| Social profiles | Use official Bahria Town profiles |
| Description | Bahria Town is a Pakistan property developer and housing-community brand with residential, commercial, infrastructure, and lifestyle projects. |
| Services | Residential plots; houses; apartments; commercial property; community facilities; project management |
| Hours | Verify per project office |
| Search intent | Bahria Town Lahore; Bahria Town Karachi; plots; houses; booking; contact |
| Relevant keywords | Bahria Town Pakistan; Bahria Town Lahore; Bahria Town Karachi; Bahria Town plots |
| SEO opportunity | 9.6/10 |
| Research justification | Current Pakistan real-estate searches repeatedly surface Bahria Town for project, plot, house, location, and booking queries. |
| Source URLs | https://bahriatown.com/ ; verify city/project pages |

### 29. Systems Limited

| Field | Manual-entry value |
|---|---|
| Business name | Systems Limited |
| Category / subcategory | Technology & IT / Enterprise software and IT services |
| City / province / country | Lahore / Punjab / Pakistan; global delivery |
| Address | Verify official contact page |
| Public phone / email | Verify official business contact |
| Website | https://www.systemsltd.com/ |
| Social profiles | Use official Systems Limited profiles |
| Description | Systems Limited is a Pakistan-origin technology company offering AI transformation, data and analytics, cloud, digital consulting, and industry technology services. |
| Services | AI transformation; data and analytics; cloud; digital consulting; banking technology; telecom; health; retail; automotive; hospitality |
| Hours | Verify office hours |
| Search intent | Systems Limited Pakistan; software house Lahore; IT company; careers; AI services |
| Relevant keywords | Systems Limited Pakistan; software company Lahore; IT services Pakistan; AI transformation |
| SEO opportunity | 9.1/10 |
| Research justification | The current official site exposes broad service, industry, careers, investor, newsroom, and AI-transformation paths, supporting both business and recruitment intent. |
| Source URLs | https://www.systemsltd.com/ ; https://www.systemsltd.com/services ; https://www.systemsltd.com/company-profile |

### 30. NetSol Technologies

| Field | Manual-entry value |
|---|---|
| Business name | NetSol Technologies |
| Category / subcategory | Technology & IT / Enterprise software |
| City / province / country | Lahore / Punjab / Pakistan; international operations |
| Address | Verify official Pakistan office page |
| Public phone / email | Verify official contact page |
| Website | https://netsoltech.com/ |
| Social profiles | Use official NetSol profiles |
| Description | NetSol Technologies is a Pakistan-origin enterprise software company associated with asset finance, leasing, lending, and financial-services technology. |
| Services | Enterprise software; leasing and finance platforms; lending technology; IT services; support; careers |
| Hours | Verify office hours |
| Search intent | NetSol Pakistan; software company Lahore; NetSol careers; enterprise software Pakistan |
| Relevant keywords | NetSol Technologies Pakistan; NetSol Lahore; software house Pakistan; finance software |
| SEO opportunity | 8.9/10 |
| Research justification | Current search results surface NetSol’s official management and company pages for Pakistan IT-company and leadership queries. |
| Source URLs | https://netsoltech.com/about-us/management-team ; https://www.netsoltech.com/ ; https://www.netsolpk.com/election-of-directors.php |

### 31. 10Pearls

| Field | Manual-entry value |
|---|---|
| Business name | 10Pearls |
| Category / subcategory | Technology & IT / Software and digital services |
| City / province / country | Islamabad / Pakistan; verify office location |
| Address | Verify official locations page |
| Public phone / email | Verify official contact page |
| Website | https://10pearls.com/ |
| Social profiles | Use official 10Pearls profiles |
| Description | 10Pearls is a technology and digital-services company offering software development, product design, AI, cloud, and digital transformation services. |
| Services | Software development; product design; AI; cloud; digital transformation; consulting |
| Hours | Verify office hours |
| Search intent | 10Pearls Pakistan; software company Islamabad; app development; AI services; careers |
| Relevant keywords | 10Pearls Pakistan; software house Islamabad; app developers Pakistan; AI company Pakistan |
| SEO opportunity | 8.8/10 |
| Research justification | Software-company queries are commercially valuable, and 10Pearls has a strong Pakistan technology and career-search footprint. |
| Source URLs | https://10pearls.com/ ; verify official Pakistan office/contact page |

### 32. Arbisoft

| Field | Manual-entry value |
|---|---|
| Business name | Arbisoft |
| Category / subcategory | Technology & IT / Software and AI services |
| City / province / country | Lahore / Punjab / Pakistan; verify office locations |
| Address | Verify official contact page |
| Public phone / email | Verify official contact page |
| Website | https://arbisoft.com/ |
| Social profiles | Use official Arbisoft profiles |
| Description | Arbisoft is a Pakistan software and AI services company associated with custom software, data, machine learning, and digital product engineering. |
| Services | Software development; AI and machine learning; data engineering; product engineering; cloud; consulting |
| Hours | Verify office hours |
| Search intent | Arbisoft Pakistan; software house Lahore; AI company Pakistan; software careers |
| Relevant keywords | Arbisoft Lahore; software company Pakistan; AI development Pakistan; software house Lahore |
| SEO opportunity | 8.6/10 |
| Research justification | Current technology searches include Pakistan software houses and AI-development companies; Arbisoft has a clear official business and career presence. |
| Source URLs | https://arbisoft.com/ ; verify official contact/about pages |

### 33. TCS Courier

| Field | Manual-entry value |
|---|---|
| Business name | TCS Courier |
| Category / subcategory | Logistics & Courier / Courier and logistics |
| City / province / country | Karachi / Sindh / Pakistan; nationwide |
| Address | Verify official branch locator |
| Public phone / email | Verify official contact page |
| Website | https://www.tcs.com.pk/ |
| Social profiles | Use official TCS profiles |
| Description | TCS is a Pakistan courier and logistics brand serving domestic delivery, international shipping, e-commerce, documents, and parcel tracking. |
| Services | Courier; tracking; domestic delivery; international shipping; e-commerce logistics; cash on delivery where offered |
| Hours | Verify per branch |
| Search intent | TCS tracking; TCS courier near me; TCS contact; TCS branch; parcel delivery |
| Relevant keywords | TCS Pakistan; TCS tracking; TCS courier Karachi; TCS branch Lahore; TCS helpline |
| SEO opportunity | 9.7/10 |
| Research justification | Courier tracking and branch searches are high-intent, repeat-use queries. TCS is a nationally recognizable entity and should have branch-aware records. |
| Source URLs | https://www.tcs.com.pk/ ; verify official tracking and locator pages |

### 34. Leopards Courier

| Field | Manual-entry value |
|---|---|
| Business name | Leopards Courier Services |
| Category / subcategory | Logistics & Courier / Courier, COD, and logistics |
| City / province / country | Karachi / Sindh / Pakistan; nationwide |
| Address | Leopards House, 19-F, Block 6, PECHS, Karachi; Lahore zonal office also publicly listed — verify current official locator |
| Public phone / email | UAN (021) 111-300-786; WhatsApp 0345-5367273 — verify official locator before entry |
| Website | https://www.leopardscourier.com/ |
| Social profiles | Use official Leopards profiles |
| Description | Leopards Courier is a Pakistan courier and logistics company offering domestic delivery, COD, e-commerce logistics, tracking, and international shipping. |
| Services | Courier; tracking; COD; e-commerce logistics; international shipping; branch services |
| Hours | Verify per branch |
| Search intent | Leopards tracking; Leopards courier near me; Leopards branch; COD; contact |
| Relevant keywords | Leopards Courier Pakistan; Leopards tracking; Leopards Karachi; Leopards Lahore; courier COD Pakistan |
| SEO opportunity | 9.7/10 |
| Research justification | Current search results surfaced the official site for courier/logistics services and an official locate-us page with Karachi and Lahore office signals. |
| Source URLs | https://www.leopardscourier.com/ ; https://pk.leopardscourier.com/contact/locate-us |

### 35. M&P Express Logistics

| Field | Manual-entry value |
|---|---|
| Business name | M&P Express Logistics |
| Category / subcategory | Logistics & Courier / Courier and logistics |
| City / province / country | Karachi / Sindh / Pakistan; nationwide |
| Address | Verify official contact/branch locator |
| Public phone / email | Verify official contact page |
| Website | https://mulphilog.com/ |
| Social profiles | Use official M&P profiles |
| Description | M&P Express Logistics is a Pakistan courier and logistics provider associated with parcel delivery, e-commerce fulfillment, cargo, and business logistics. |
| Services | Courier; tracking; e-commerce logistics; freight; cargo; business delivery |
| Hours | Verify per branch |
| Search intent | M&P tracking; M&P courier; M&P branch; parcel delivery Pakistan; contact |
| Relevant keywords | M&P courier Pakistan; M&P tracking; M&P Express; courier Karachi; logistics Pakistan |
| SEO opportunity | 8.9/10 |
| Research justification | Courier and parcel tracking searches repeatedly compare M&P with TCS and Leopards, creating strong brand and branch intent. |
| Source URLs | https://mulphilog.com/ ; verify official tracking/locations pages |

### 36. Daraz

| Field | Manual-entry value |
|---|---|
| Business name | Daraz |
| Category / subcategory | Retail & Shopping / E-commerce marketplace |
| City / province / country | Karachi / Sindh / Pakistan; nationwide |
| Address | Verify official company/contact page |
| Public phone / email | Verify official support page |
| Website | https://www.daraz.pk/ |
| Social profiles | Use official Daraz profiles |
| Description | Daraz is a Pakistan e-commerce marketplace connecting shoppers and sellers across electronics, fashion, groceries, home, beauty, and other product categories. |
| Services | Online marketplace; seller center; delivery; payment; returns; promotions; customer support |
| Hours | Online platform; support hours require verification |
| Search intent | Daraz Pakistan; Daraz seller; Daraz delivery; Daraz customer care; Daraz sale |
| Relevant keywords | Daraz Pakistan; Daraz seller center; online shopping Pakistan; Daraz contact |
| SEO opportunity | 9.8/10 |
| Research justification | Daraz is a dominant Pakistan e-commerce brand with brand, seller, delivery, product, sale, and customer-support search intent. |
| Source URLs | https://www.daraz.pk/ ; https://sellercenter.daraz.pk/ ; verify official support page |

### 37. PriceOye

| Field | Manual-entry value |
|---|---|
| Business name | PriceOye |
| Category / subcategory | Retail & Shopping / Electronics e-commerce |
| City / province / country | Pakistan; confirm operating city before entry |
| Address | Verify official contact page |
| Public phone / email | Verify official support page |
| Website | https://priceoye.pk/ |
| Social profiles | Use official PriceOye profiles |
| Description | PriceOye is a Pakistan online marketplace focused on original mobile phones, electronics, accessories, prices, delivery, and online retail. |
| Services | Mobile phones; electronics; accessories; online ordering; delivery; warranty/returns where applicable |
| Hours | Online platform; support hours require verification |
| Search intent | mobile price Pakistan; PriceOye; original phones; electronics; delivery |
| Relevant keywords | PriceOye Pakistan; mobile price Pakistan; buy phone online Pakistan; PriceOye contact |
| SEO opportunity | 9.2/10 |
| Research justification | Current search results position PriceOye for mobile-price and electronics queries, with high purchase intent and strong brand recognition. |
| Source URLs | https://priceoye.pk/ ; verify official about/contact pages |

### 38. Telemart

| Field | Manual-entry value |
|---|---|
| Business name | Telemart |
| Category / subcategory | Retail & Shopping / Electronics e-commerce and stores |
| City / province / country | Pakistan; public search describes 39 stores in 26 cities; confirm HQ and branch before entry |
| Address | Verify official store locator |
| Public phone / email | Verify official contact page |
| Website | https://www.telemart.pk/ |
| Social profiles | Use official Telemart profiles |
| Description | Telemart is a Pakistan electronics retailer and e-commerce marketplace selling mobile phones, tablets, computers, accessories, and consumer technology. |
| Services | Electronics retail; online shopping; physical stores; mobile phones; accessories; delivery; support |
| Hours | Verify per store |
| Search intent | Telemart Pakistan; mobile phone; electronics store; Telemart branch; online shopping |
| Relevant keywords | Telemart Pakistan; Telemart mobile; electronics store Pakistan; Telemart Karachi/Lahore |
| SEO opportunity | 9.0/10 |
| Research justification | Current search results describe Telemart as a major Pakistan technology retailer and surface it for online mobile/electronics intent. |
| Source URLs | https://www.telemart.pk/ ; verify official store locator/about page |

### 39. Khaadi

| Field | Manual-entry value |
|---|---|
| Business name | Khaadi |
| Category / subcategory | Retail & Shopping / Apparel and lifestyle retail |
| City / province / country | Karachi / Sindh / Pakistan; nationwide and international |
| Address | Verify official store locator |
| Public phone / email | Verify official contact page |
| Website | https://www.khaadi.com/ |
| Social profiles | Use official Khaadi profiles |
| Description | Khaadi is a Pakistani apparel and lifestyle retail brand offering clothing, textiles, accessories, and online shopping through stores and digital channels. |
| Services | Apparel; textiles; accessories; online shopping; store retail; seasonal collections |
| Hours | Verify per store |
| Search intent | Khaadi Pakistan; Khaadi sale; Khaadi store near me; Khaadi online; clothing Pakistan |
| Relevant keywords | Khaadi Pakistan; Khaadi Karachi; Khaadi Lahore; Pakistani clothing brands |
| SEO opportunity | 9.2/10 |
| Research justification | Apparel brand searches have strong product, sale, store, and city intent; Khaadi is a high-recognition Pakistani retail entity. |
| Source URLs | https://www.khaadi.com/ ; verify official store locator/contact page |

### 40. Toyota Indus Motor

| Field | Manual-entry value |
|---|---|
| Business name | Indus Motor Company Limited — Toyota Pakistan |
| Category / subcategory | Automotive & Vehicles / Automobile manufacturer and dealer network |
| City / province / country | Karachi / Sindh / Pakistan; dealer network nationwide |
| Address | Verify official dealer locator and head-office page |
| Public phone / email | Verify official contact page |
| Website | https://www.toyota-indus.com/ |
| Social profiles | Use official Toyota Indus profiles |
| Description | Indus Motor Company is the Pakistan Toyota vehicle manufacturer and dealer-network entity associated with vehicle sales, booking, parts, maintenance, and after-sales service. |
| Services | New vehicles; booking; dealerships; service; spare parts; warranty; customer support |
| Hours | Verify per dealership/service center |
| Search intent | Toyota dealership Pakistan; Toyota price; Toyota booking; Toyota service; Toyota Karachi/Lahore |
| Relevant keywords | Toyota Pakistan; Toyota Indus; Toyota dealership Karachi; Toyota service Lahore |
| SEO opportunity | 9.5/10 |
| Research justification | Car-brand searches are highly commercial and location-specific; official dealer/service locator data can create strong city pages. |
| Source URLs | https://www.toyota-indus.com/ ; verify official dealer and contact pages |

### 41. Honda Atlas Cars

| Field | Manual-entry value |
|---|---|
| Business name | Honda Atlas Cars (Pakistan) Limited |
| Category / subcategory | Automotive & Vehicles / Automobile manufacturer and dealer network |
| City / province / country | Lahore / Punjab / Pakistan; dealer network nationwide |
| Address | Verify official dealer locator |
| Public phone / email | Verify official contact page |
| Website | https://www.honda.com.pk/ |
| Social profiles | Use official Honda Atlas profiles |
| Description | Honda Atlas Cars Pakistan is associated with Honda vehicle sales, dealerships, booking, after-sales service, parts, and maintenance. |
| Services | New vehicles; booking; dealerships; service; parts; warranty; customer support |
| Hours | Verify per dealership/service center |
| Search intent | Honda dealership Pakistan; Honda price; Honda booking; Honda service; Honda Lahore/Karachi |
| Relevant keywords | Honda Atlas Pakistan; Honda dealership Lahore; Honda service Karachi; Honda cars Pakistan |
| SEO opportunity | 9.3/10 |
| Research justification | Current automobile search behavior is strongly brand-plus-model, dealer, price, and service oriented; Honda Atlas is a core Pakistan entity. |
| Source URLs | https://www.honda.com.pk/ ; verify official dealer/service pages |

### 42. Pak Suzuki Motor

| Field | Manual-entry value |
|---|---|
| Business name | Pak Suzuki Motor Company Limited |
| Category / subcategory | Automotive & Vehicles / Automobile manufacturer and dealer network |
| City / province / country | Karachi / Sindh / Pakistan; dealer network nationwide |
| Address | Verify official dealer locator |
| Public phone / email | Verify official contact page |
| Website | https://www.paksuzuki.com.pk/ |
| Social profiles | Use official Pak Suzuki profiles |
| Description | Pak Suzuki is a Pakistan automobile manufacturer and dealer-network brand associated with vehicle sales, booking, parts, maintenance, and after-sales service. |
| Services | New vehicles; booking; dealer network; maintenance; parts; warranty; customer support |
| Hours | Verify per dealership/service center |
| Search intent | Suzuki dealership Pakistan; Suzuki price; Suzuki booking; Suzuki service; Suzuki parts |
| Relevant keywords | Pak Suzuki Pakistan; Suzuki dealership Karachi; Suzuki service Lahore; Suzuki cars Pakistan |
| SEO opportunity | 9.4/10 |
| Research justification | Suzuki-related Pakistan searches combine model/price intent with dealership and service intent, making a verified entity plus branch strategy valuable. |
| Source URLs | https://www.paksuzuki.com.pk/ ; verify official dealer/service pages |

### 43. Faisal Movers

| Field | Manual-entry value |
|---|---|
| Business name | Faisal Movers |
| Category / subcategory | Transport & Logistics / Intercity bus and transport |
| City / province / country | Lahore / Punjab / Pakistan; nationwide terminals |
| Address | Verify official terminal list |
| Public phone / email | Verify official contact page |
| Website | https://www.faisalmovers.com/ |
| Social profiles | Use official Faisal Movers profiles |
| Description | Faisal Movers is a Pakistan intercity bus and transport company serving routes, ticketing, terminals, and passenger travel services. |
| Services | Bus tickets; route schedules; terminals; online booking; passenger support; cargo where offered |
| Hours | Verify per terminal |
| Search intent | Faisal Movers ticket; schedule; terminal; Lahore to Islamabad bus; contact |
| Relevant keywords | Faisal Movers Pakistan; Faisal Movers Lahore; bus ticket Pakistan; intercity bus schedule |
| SEO opportunity | 9.1/10 |
| Research justification | Intercity transport searches are highly local and transactional, with strong route, terminal, schedule, and ticket intent. |
| Source URLs | https://www.faisalmovers.com/ ; verify official booking and terminal pages |

### 44. ROZEE.PK

| Field | Manual-entry value |
|---|---|
| Business name | ROZEE.PK |
| Category / subcategory | Hiring Company / HR / Recruitment and jobs platform |
| City / province / country | Lahore / Punjab / Pakistan; national platform |
| Address | Verify official company contact page |
| Public phone / email | Verify official support/company page |
| Website | https://www.rozee.pk/ |
| Social profiles | Use official ROZEE.PK profiles |
| Description | ROZEE.PK is a Pakistan employment and recruitment platform connecting job seekers, employers, vacancies, company profiles, and career resources. |
| Services | Job search; employer listings; recruitment; company pages; CV/profile tools; career resources |
| Hours | Online platform; support hours require verification |
| Search intent | jobs in Pakistan; Rozee jobs; company jobs; CV; recruitment agency; Lahore jobs |
| Relevant keywords | ROZEE Pakistan; jobs Pakistan; jobs Lahore; jobs Karachi; recruitment Pakistan |
| SEO opportunity | 9.6/10 |
| Research justification | Current Pakistan job searches consistently surface ROZEE.PK for broad jobs, role, city, employer, and recruitment intent. |
| Source URLs | https://www.rozee.pk/ ; https://www.rozee.pk/company/dukanpk/about ; verify official support/contact page |

### 45. Mustakbil.com

| Field | Manual-entry value |
|---|---|
| Business name | Mustakbil.com |
| Category / subcategory | Hiring Company / HR / Recruitment and jobs platform |
| City / province / country | Lahore / Punjab / Pakistan; national platform; confirm operating city |
| Address | Verify official contact page |
| Public phone / email | Verify official support page |
| Website | https://www.mustakbil.com/ |
| Social profiles | Use official Mustakbil profiles |
| Description | Mustakbil.com is a Pakistan job portal connecting job seekers, employers, vacancies, CVs, and career opportunities. |
| Services | Job listings; employer profiles; CVs; recruitment; career search; city/role filtering |
| Hours | Online platform; support hours require verification |
| Search intent | Mustakbil jobs; jobs Pakistan; jobs Lahore; jobs Karachi; online jobs; employer listing |
| Relevant keywords | Mustakbil Pakistan; Mustakbil jobs; jobs Lahore; jobs Karachi; recruitment portal Pakistan |
| SEO opportunity | 8.9/10 |
| Research justification | Mustakbil is a direct Pakistan job-portal competitor with strong city, role, and employer intent and a clear public platform. |
| Source URLs | https://www.mustakbil.com/ ; verify official employer/contact pages |

### 46. Sui Northern Gas Pipelines Limited (SNGPL)

| Field | Manual-entry value |
|---|---|
| Business name | Sui Northern Gas Pipelines Limited (SNGPL) |
| Category / subcategory | Energy & Utilities / Gas utility |
| City / province / country | Lahore / Punjab / Pakistan; northern Pakistan service area |
| Address | Verify official regional office/contact page |
| Public phone / email | Verify official customer-care page |
| Website | https://www.sngpl.com.pk/ |
| Social profiles | Use official SNGPL profiles |
| Description | SNGPL is a Pakistan natural-gas utility serving domestic, commercial, industrial, billing, complaint, connection, and customer-service needs in its operating region. |
| Services | Gas connections; billing; bill inquiry; complaints; customer service; commercial/industrial supply |
| Hours | Verify per customer-service center |
| Search intent | SNGPL bill; SNGPL online bill; SNGPL complaint; SNGPL helpline; new gas connection |
| Relevant keywords | SNGPL Pakistan; SNGPL bill check; SNGPL Lahore; SNGPL complaint number; gas connection Pakistan |
| SEO opportunity | 9.4/10 |
| Research justification | Utility searches are repeat-use and task-oriented. SNGPL already aligns with bill, complaint, connection, and city/service-intent searches. |
| Source URLs | https://www.sngpl.com.pk/ ; verify official bill and contact pages |

## Branch and city expansion opportunities

National entities should not be represented by one generic listing when users search for a nearby branch or service center. After the first manual records are validated, create branch-level records only where the official locator supplies a stable address, phone, city, hours, and map URL. The highest-priority branch queries are **HBL branch Karachi**, **Meezan Bank branch Lahore**, **UBL branch Islamabad**, **NBP branch Peshawar**, **Jazz franchise near me**, **PTCL exchange Lahore**, **TCS branch Karachi**, **Leopards Courier Lahore**, **Toyota dealership Karachi**, **Honda dealership Lahore**, **Beaconhouse school Islamabad**, and **Aga Khan medical center Karachi**.

The best city/category combinations for ListPak expansion are Karachi finance and healthcare, Lahore education/software/real estate, Islamabad universities/telecom/travel, Rawalpindi/Islamabad logistics and housing, Faisalabad manufacturing/textiles, Sialkot exporters and sports goods, Peshawar transport and education, Multan healthcare and retail, and northern-city tourism/hotel searches. Each city page should only be created when there are enough complete, unique records to be genuinely useful.

## Competitor gap summary

PakBD exposes a very broad Pakistan category taxonomy and city counts, including banking and finance, tourism/travel agents, hospitals/clinics/labs, hotels, construction/real estate, transport/logistics, telecommunication, automobiles, education, and many industrial categories. BusinessList.pk exposes prominent discovery categories for Restaurants, Automotive, Doctors, Shopping, Legal, Real Estate, Contractors, Employment, and Schools, plus large city hubs. YellowPage.pk and similar directories compete on verified business databases and basic business fields. Large vertical portals dominate their own entity groups: official banks, hotel groups, hospitals, universities, Zameen/Graana, job portals, and courier brands.

The strongest ListPak opportunity is not duplicating every national brand blindly. It is to build **accurate city-and-service records** with official website links, branch data, phone/address freshness, opening hours, map links, and clear claim/correction workflows. The weakest opportunity is generic national pages with no unique location data, no official source, no useful services, and no internal links.

## Field-level manual import template

```text
name: [exact public business name]
category: [exact existing ListPak category]
subcategory: [specific service or entity type]
categoryId: [existing category id]
city: [verified operating city]
province: [verified province]
country: Pakistan
address: [official public business address or blank until verified]
phone: [official public business phone or blank until verified]
whatsapp: [official public business WhatsApp or blank until verified]
email: [official public business email or blank until verified]
website: [official website]
locations: [official branch locations only; one record per stable branch where appropriate]
description: [original factual business summary based on official sources]
services: [officially documented services]
operatingHours: [official hours per branch; otherwise verify before entry]
features: []
reviews: []
rating: 0
reviewCount: 0
verified: false
isClaimed: false
isFeatured: false
status: pending
```

## Final manual checklist

Before saving each record, search ListPak by normalized business name, official domain, city, phone, and slug. If a match exists, do not create a second record; evaluate the existing listing through the legitimate enrichment or claim path. Confirm that the selected category and city exist in ListPak’s current enumerations. Confirm that the website resolves and is the official business domain. Confirm all phone numbers, addresses, emails, hours, and branch details from the source page used at entry. Keep the record pending until review. After manual entry, verify the database record, slug, category, city, SEO fields, admin visibility, profile URL, duplicate status, sitemap eligibility, and internal links.

## Research source notes

The primary source set used for this research includes official business websites, official branch/contact pages, government or institutional sources, and current search-result discovery. Directly inspected sources included PakBD, BusinessList.pk, HBL, Meezan Bank, Aga Khan University Hospital, PIA, and Leopards Courier. Search-result discovery also surfaced official sources for UBL, NBP, Jazz, PTCL, Nayatel, Systems Limited, TCS, Telemart, FAST-NUCES, NUST, and other entities. Search results were used to identify demand and competitor presence; official pages must be rechecked at manual-entry time for current contact data.
